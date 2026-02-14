"use client";

import { useEffect, useState } from "react";

// ✅ Proper Type
interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardResponse {
  flashcards: Flashcard[];
}

export default function Flashcards() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    const data = localStorage.getItem("currentFlashcards");

    if (data) {
      const parsed: FlashcardResponse = JSON.parse(data);
      setCards(parsed.flashcards ?? []);
    }
  }, []);

  if (!cards.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading flashcards...
      </div>
    );
  }

  const nextCard = () => {
    setFlipped(false);
    setCurrent((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8 flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-8">🧠 Smart Flashcards</h1>

      {/* Card */}
      <div
        onClick={() => setFlipped((prev) => !prev)}
        className="w-full max-w-2xl h-64 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl p-8 flex items-center justify-center text-center cursor-pointer transition-all duration-500 hover:scale-105"
      >
        {!flipped ? (
          <h2 className="text-xl font-semibold">
            {cards[current].front}
          </h2>
        ) : (
          <p className="text-lg text-purple-300">
            {cards[current].back}
          </p>
        )}
      </div>

      <p className="text-gray-400 mt-4">
        Click card to flip
      </p>

      <button
        onClick={nextCard}
        className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
      >
        Next →
      </button>
    </div>
  );
}
