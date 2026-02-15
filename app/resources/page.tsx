"use client";

import { useState } from "react";

type ResourceItem = {
  title: string;
  description: string;
  url?: string;
};

type ResourceData = {
  free: ResourceItem[];
  paid: ResourceItem[];
  youtube: ResourceItem[];
  books: ResourceItem[];
  practice: ResourceItem[];
};

export default function Resources() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState<ResourceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch resources");
    }

    setLoading(false);
  };

  // Normal URL builder (for non-YouTube)
  const buildUrl = (item: ResourceItem) => {
    if (!item.url) {
      return `https://www.google.com/search?q=${encodeURIComponent(
        item.title
      )}`;
    }

    if (item.url.startsWith("http")) {
      return item.url;
    }

    return `https://${item.url}`;
  };

  const Section = ({
    title,
    items,
    isYoutube = false,
  }: {
    title: string;
    items: ResourceItem[];
    isYoutube?: boolean;
  }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-purple-300">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => {
            const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
              item.title
            )}`;

            return (
              <a
                key={i}
                href={isYoutube ? youtubeSearchUrl : buildUrl(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white/[0.04] backdrop-blur-xl 
                           border border-white/10 p-6 rounded-2xl 
                           hover:border-purple-500/40 
                           hover:bg-white/[0.06] 
                           transition-all duration-300"
              >
                <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

                <p className="mt-4 text-purple-400 text-sm opacity-70 group-hover:opacity-100 transition">
                  🔗 Open Resource →
                </p>
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="relative min-h-screen px-8 py-20 text-white">

      {/* Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          🧠 AI Smart Resource Finder
        </h1>

        <div className="flex gap-4 mb-14">
          <input
            type="text"
            placeholder="Enter topic (e.g. C++, React, Machine Learning...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <button
            onClick={search}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:scale-105 transition-all"
          >
            {loading ? "Analyzing..." : "Find Resources"}
          </button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-gray-400 mb-8 animate-pulse">
            Searching best resources using AI...
          </p>
        )}

        {data && (
          <>
            <Section title="📚 Free Resources" items={data.free} />
            <Section title="💰 Paid Resources" items={data.paid} />
            <Section
              title="📺 YouTube Playlists"
              items={data.youtube}
              isYoutube
            />
            <Section title="📘 Books" items={data.books} />
            <Section title="🧪 Practice Platforms" items={data.practice} />
          </>
        )}
      </div>
    </main>
  );
}
