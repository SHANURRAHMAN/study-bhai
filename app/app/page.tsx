"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getGameData, getDailyGoal } from "@/lib/game";
import type { GameData } from "@/lib/game";
import Link from "next/link";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [game, setGame] = useState<GameData | null>(null);

  const router = useRouter();

  useEffect(() => {
    setGame(getGameData());
  }, []);

  return (
   <main className="relative min-h-screen px-8 py-16 text-white">
  
  {/* 🔥 Premium Background Glow */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[180px] rounded-full" />
  </div>


      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30">

  <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

   
   <Link
  href="/"
  className="text-xl font-semibold tracking-wide hover:opacity-80 transition"
>
  🧠 Study Bhai
</Link>








    <div className="flex items-center gap-4 text-sm">
      {game && (
        <>
          <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
            Level {game.level}
          </div>

          <div className="px-4 py-1.5 bg-orange-500/10 border border-orange-400/30 rounded-full">
            🔥 {game.streak}
          </div>
        </>
      )}
    </div>
  </div>
</nav>


      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-10 py-16">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Study Smarter.  
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Level Up Faster.
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            AI-powered quizzes, flashcards, gamification, and analytics —
            everything you need to dominate your exams.
          </p>
        </div>

        {/* MAIN CARD */}
       <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-12 shadow-[0_0_80px_rgba(168,85,247,0.08)]">


          {/* XP Bar */}
          {game && (
            <div className="mb-8">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${game.xp % 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {100 - (game.xp % 100)} XP to next level
              </p>
            </div>
          )}

          {/* TEXTAREA */}
          <textarea
            className="w-full p-6 bg-black/40 border border-white/10 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            rows={6}
            placeholder="Paste your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">

            <select
              className="bg-black/40 border border-white/10 p-3 rounded-xl"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={() => router.push("/quiz")}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"


            >
              Generate Quiz
            </button>

            <button
              onClick={() => router.push("/flashcards")}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"


            >
              Flashcards
            </button>

            <button
              onClick={() => router.push("/study")}
             className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"


            >
              Study Timer
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"


            >
              Analytics
            </button>

            <button
              onClick={() => router.push("/leaderboard")}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"


            >
              Leaderboard
            </button>

            <button
  onClick={() => router.push("/resources")}
  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
>
  Resources
</button>


          </div>
        </div>

        {/* FEATURE GRID
<section className="max-w-6xl mx-auto mt-24 grid md:grid-cols-3 gap-8">

  <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.06] transition">
    <h3 className="text-lg font-semibold mb-3">🧠 AI Quiz Engine</h3>
    <p className="text-gray-400 text-sm">
      Turn raw notes into structured, exam-ready quizzes instantly.
    </p>
  </div>

  <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.06] transition">
    <h3 className="text-lg font-semibold mb-3">🔥 Smart XP System</h3>
    <p className="text-gray-400 text-sm">
      Earn XP, level up, and stay consistent with streak rewards.
    </p>
  </div>

  <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl hover:bg-white/[0.06] transition">
    <h3 className="text-lg font-semibold mb-3">📊 Deep Analytics</h3>
    <p className="text-gray-400 text-sm">
      Track weekly focus time, performance trends, and growth.
    </p>
  </div>

          


</section> */}
<footer className="mt-32 py-12 text-center border-t border-white/10 text-gray-500 text-sm">
  © 2026 Study Bhai. Built By SSS.
</footer>


      </section>
    </main>
  );
}
