"use client";

import { useEffect, useState } from "react";
import { getGameData, type GameData } from "@/lib/game";

export default function Dashboard() {
  const [game, setGame] = useState<GameData | null>(null);

  useEffect(() => {
    setGame(getGameData());
  }, []);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const totalMinutes = game.weeklyStats.reduce(
    (sum, day) => sum + day.focusMinutes,
    0
  );

  const totalSessions = game.weeklyStats.length;

  return (
    <main className="relative min-h-screen text-white px-6 py-16">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Weekly Analytics
          </h1>
          <p className="text-gray-400 mt-3">
            Track your focus sessions and study consistency.
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-gray-400">Total Focus Time</p>
            <p className="text-4xl font-semibold mt-3">
              {totalMinutes} <span className="text-lg text-gray-400">min</span>
            </p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-gray-400">Study Sessions</p>
            <p className="text-4xl font-semibold mt-3">
              {totalSessions}
            </p>
          </div>

          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <p className="text-sm text-gray-400">Current Level</p>
            <p className="text-4xl font-semibold mt-3">
              🌿 {game.level}
            </p>
          </div>

        </div>

        {/* WEEKLY BREAKDOWN */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-10">

          <h2 className="text-xl font-semibold mb-8">
            Daily Breakdown
          </h2>

          {game.weeklyStats.length === 0 ? (
            <p className="text-gray-400">
              No study sessions yet. Start a focus session ⏰
            </p>
          ) : (
            <div className="space-y-6">
              {game.weeklyStats.map((day, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{day.date}</span>
                    <span>{day.focusMinutes} min</span>
                  </div>

                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                      style={{
                        width: `${Math.min(
                          (day.focusMinutes / 120) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
