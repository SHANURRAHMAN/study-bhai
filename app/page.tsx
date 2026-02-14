"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getGameData, getDailyGoal } from "@/lib/game";
import type { GameData } from "@/lib/game";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<GameData | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  // 🔥 Load game data + auth state
  useEffect(() => {
    setGame(getGameData());

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Google Login
const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      localStorage.setItem(
        "username",
        result.user.displayName || "User"
      );
    }

    window.location.reload();
  } catch (error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "auth/popup-closed-by-user"
  ) {
    console.log("User closed login popup");
    return;
  }

  console.error("Login error:", error);
}

};


  // 🔐 Logout
  const logout = async () => {
    await signOut(auth);
  };

  // 🧠 Generate Quiz
  const generateQuiz = async () => {
    if (!notes) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteContent: notes, difficulty }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Quiz generation failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("currentQuiz", JSON.stringify(data));
      router.push("/quiz");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  // 📚 Generate Flashcards
  const generateFlashcards = async () => {
    if (!notes) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteContent: notes }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Flashcard generation failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("currentFlashcards", JSON.stringify(data));
      router.push("/flashcards");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-wide">
          🧠 Study Twin
        </h1>

        <div className="flex items-center gap-6 text-sm">

          {game && (
            <>
              <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                🌿 Level {game.level} • {game.xp} XP
              </div>

              <div className="bg-orange-500/20 px-4 py-2 rounded-xl border border-orange-400/30">
                🔥 {game.streak} Day Streak
              </div>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">
                👋 {user.displayName}
              </span>
              <button
                onClick={logout}
                className="bg-red-500/20 px-4 py-2 rounded-xl border border-red-400/30 hover:scale-105 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="bg-white text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </div>

      {/* LEVEL XP BAR */}
      {game && (
        <div className="mb-6">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{
                width: `${game.xp % 100}%`,
              }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {100 - (game.xp % 100)} XP to next level
          </p>
        </div>
      )}

      {/* 🎯 DAILY GOAL */}
      {game && (
        <div className="mb-12">
          <div className="flex justify-between text-sm mb-2">
            <span>🎯 Daily Goal</span>
            <span>{game.dailyXP}/{getDailyGoal()} XP</span>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  (game.dailyXP / getDailyGoal()) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          {game.dailyXP >= getDailyGoal() && (
            <p className="text-green-400 text-sm mt-2 animate-pulse">
              🎉 Daily Goal Completed!
            </p>
          )}
        </div>
      )}

      {/* 🌳 STUDY GARDEN */}
      {game && (
        <div className="mb-12 flex flex-col items-center">
          <div className="text-7xl transition-all duration-500 hover:scale-110">
            {game.level < 2 && "🌱"}
            {game.level >= 2 && game.level < 4 && "🌿"}
            {game.level >= 4 && game.level < 6 && "🌳"}
            {game.level >= 6 && game.level < 10 && "🌲"}
            {game.level >= 10 && "🌸"}
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Your Study Garden grows as you level up 🌿
          </p>
        </div>
      )}

      {/* NOTES */}
      <textarea
        className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl mb-6 backdrop-blur-md focus:outline-none focus:border-purple-500 transition"
        rows={6}
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <select
          className="border border-white/10 bg-white/5 p-3 rounded-xl backdrop-blur-md"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={generateQuiz}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>

        <button
          onClick={generateFlashcards}
          className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>

        <button
          onClick={() => router.push("/study")}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          Start Study Timer
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          View Analytics
        </button>

        <button
          onClick={() => router.push("/leaderboard")}
          className="bg-yellow-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          🌎 View Leaderboard
        </button>
      </div>

    </main>
  );
}
