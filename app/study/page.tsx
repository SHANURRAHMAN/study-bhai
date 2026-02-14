"use client";

import { useState, useEffect, useRef } from "react";
import { addXP, updateStreak, logFocusSession } from "@/lib/game";

export default function StudyTimer() {
  const FOCUS_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  const [seconds, setSeconds] = useState<number>(FOCUS_DURATION);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");

  // ✅ Properly typed interval
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setIsRunning(false);

      if (mode === "focus") {
        // 🎉 Reward user
        addXP(50);
        updateStreak();
        logFocusSession(25);

        setMode("break");
        setSeconds(BREAK_DURATION);
      } else {
        setMode("focus");
        setSeconds(FOCUS_DURATION);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, seconds, mode]);

  const formatTime = (): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(mode === "focus" ? FOCUS_DURATION : BREAK_DURATION);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">

      <h1 className="text-4xl font-bold mb-6">
        ⏰ Pomodoro Study Mode
      </h1>

      {/* Mode Indicator */}
      <p className="mb-6 text-lg text-purple-300">
        {mode === "focus" ? "🔥 Focus Time" : "☕ Break Time"}
      </p>

      {/* Timer */}
      <div className="text-7xl font-mono mb-8 tracking-widest">
        {formatTime()}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={handleReset}
          className="bg-white/10 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/20 transition"
        >
          Reset
        </button>
      </div>

      {/* XP Reward Note */}
      <p className="mt-8 text-sm text-gray-400">
        Complete a focus session to earn +50 XP 🌟
      </p>

    </div>
  );
}
