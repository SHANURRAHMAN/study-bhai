export default function LandingPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[200px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <h1 className="text-xl font-semibold tracking-wide">
          🧠 Study Bhai
        </h1>

        <div className="hidden md:flex gap-8 text-sm text-white/60">
  <a href="#features" className="hover:text-white transition">Features</a>
  <a href="#pricing" className="hover:text-white transition">Pricing</a>
  <a href="#about" className="hover:text-white transition">About</a>
</div>

        <div className="flex gap-4">
          <a
            href="/app"
            className="px-5 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-32 max-w-5xl mx-auto">
        <h2 className="text-6xl font-bold leading-tight mb-6">
          Study Smarter.
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Level Up Faster.
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          AI-powered quizzes, flashcards, XP rewards, streaks,
          analytics and leaderboards — everything you need
          to dominate your exams.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="/app"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold shadow-xl hover:scale-105 transition"
          >
            Start Studying
          </a>

          <a
            href="#features"
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
          >
            View Features
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
className="max-w-6xl mx-auto px-8 pb-16 pt-10 grid md:grid-cols-3 gap-10"

      >
        <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4">🧠 AI Quiz Engine</h3>
          <p className="text-gray-400 text-sm">
            Instantly generate smart quizzes from your notes.
          </p>
        </div>

        <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4">🔥 XP & Streaks</h3>
          <p className="text-gray-400 text-sm">
            Earn XP, maintain streaks, and gamify your study routine.
          </p>
        </div>

        <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4">📊 Deep Analytics</h3>
          <p className="text-gray-400 text-sm">
            Track performance, focus time, and improvement trends.
          </p>
        </div>
      </section>

    

      {/* ABOUT SECTION */}
<section
  id="about"
  className="scroll-mt-32 max-w-6xl mx-auto px-10 pt-16 pb-24"
>
  <div className="grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT TEXT */}
    <div>
      <p className="text-purple-400 uppercase tracking-widest text-sm mb-4">
        About Study Bhai
      </p>

      <h2 className="text-4xl font-bold mb-6 leading-tight">
        Built for students who want
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          {" "}real growth.
        </span>
      </h2>

      <p className="text-gray-400 mb-6 leading-relaxed">
        Study Bhai is a gamified AI-powered learning platform designed to
        help students stay consistent, focused, and motivated.
        We combine artificial intelligence, habit tracking, XP rewards,
        streak systems, and performance analytics — all in one powerful
        dashboard.
      </p>

      <p className="text-gray-400 leading-relaxed">
        Instead of studying randomly, you study with structure.
        Instead of losing motivation, you level up.
      </p>
    </div>

    {/* RIGHT VISUAL CARD */}
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-[0_0_60px_rgba(168,85,247,0.15)]">
      <div className="space-y-6">

        <div>
          <p className="text-sm text-gray-400">Mission</p>
          <p className="text-lg font-semibold">
            Make studying addictive — in a good way.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Vision</p>
          <p className="text-lg font-semibold">
            Become the AI study companion for every student.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Core Idea</p>
          <p className="text-lg font-semibold">
            Study. Earn XP. Stay consistent. Win.
          </p>
        </div>

      </div>
    </div>

  </div>
</section>

  {/* FOOTER */}
      <footer className="text-center py-10 border-t border-white/10 text-gray-500 text-sm">
        © 2026 Study Bhai. Built By SSS.
      </footer>


    </main>
  );
}
