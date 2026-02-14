"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

// ✅ Proper Type
interface LeaderboardUser {
  name: string;
  xp: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "leaderboard"),
          orderBy("xp", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);

        const data: LeaderboardUser[] = snapshot.docs.map((doc) => {
          const d = doc.data();

          return {
            name: d.name ?? "Anonymous",
            xp: d.xp ?? 0,
          };
        });

        setUsers(data);
      } catch (error) {
        console.error("Leaderboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">🌎 Global Leaderboard</h1>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.name}
            className="bg-white/10 p-4 rounded-xl flex justify-between items-center"
          >
            <span className="font-semibold">
              #{index + 1} {user.name}
            </span>
            <span className="text-purple-400 font-bold">
              {user.xp} XP
            </span>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-gray-400">
            No users yet. Be the first on the leaderboard 🚀
          </p>
        )}
      </div>
    </div>
  );
}
