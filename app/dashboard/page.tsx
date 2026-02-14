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
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        📅 Weekly Analytics
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-400">Total Focus Minutes</p>
          <p className="text-3xl font-bold mt-2">
            {totalMinutes} min
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-400">Study Sessions</p>
          <p className="text-3xl font-bold mt-2">
            {totalSessions}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <p className="text-gray-400">Current Level</p>
          <p className="text-3xl font-bold mt-2">
            🌿 {game.level}
          </p>
        </div>

      </div>

      {/* WEEKLY BREAKDOWN */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">

        <h2 className="text-xl font-semibold mb-6">
          Daily Breakdown
        </h2>

        {game.weeklyStats.length === 0 ? (
          <p className="text-gray-400">
            No study sessions yet. Start a focus session ⏰
          </p>
        ) : (
          <div className="space-y-4">
            {game.weeklyStats.map((day, idx) => (
              <div key={idx}>
                <p className="text-sm text-gray-400">
                  {day.date}
                </p>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (day.focusMinutes / 120) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {day.focusMinutes} minutes
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
