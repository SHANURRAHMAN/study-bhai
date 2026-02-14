"use client";

import Link from "next/link";

export default function Landing() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[180px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
          <h1 className="text-xl font-semibold tracking-wide">
            Study Bhai
          </h1>

          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              Login
            </Link>

            <Link
              href="/app"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          Study Smarter.
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {" "}Level Up Faster.
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          AI-powered quizzes, flashcards, focus tracking, XP rewards, and leaderboards —
          everything you need to dominate your exams.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/app"
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all font-medium shadow-lg shadow-purple-600/20"
          >
            Start Studying
          </Link>

          <Link
            href="/app"
            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            View Demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-8 pb-32 grid md:grid-cols-3 gap-10">

        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.05)]">
          <h3 className="text-xl font-semibold mb-4">🧠 AI Quiz Generator</h3>
          <p className="text-gray-400">
            Turn your notes into smart quizzes instantly with AI.
          </p>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.05)]">
          <h3 className="text-xl font-semibold mb-4">🔥 XP & Streaks</h3>
          <p className="text-gray-400">
            Earn XP, maintain streaks, and gamify your learning.
          </p>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.05)]">
          <h3 className="text-xl font-semibold mb-4">📊 Analytics</h3>
          <p className="text-gray-400">
            Track your focus sessions and weekly performance.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t border-white/5">
        © {new Date().getFullYear()} Study Bhai. Built with AI.
      </footer>

    </main>
  );
}
