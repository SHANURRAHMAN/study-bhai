'use client';

import { useState, useEffect } from 'react';
import { addXP, updateStreak, getGameData } from '@/lib/game';
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

/* -------------------- TYPES -------------------- */

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  topic: string;
}

interface QuizData {
  questions: QuizQuestion[];
}

/* -------------------- COMPONENT -------------------- */

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const [gameData, setGameData] = useState(getGameData());

  useEffect(() => {
    const data = localStorage.getItem('currentQuiz');
    if (data) {
      const parsed: QuizData = JSON.parse(data);
      setQuiz(parsed);
    }

    setGameData(getGameData());
  }, []);

  if (!quiz)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const question = quiz.questions[currentQ];

  const handleAnswer = async (idx: number) => {
    setSelected(idx);
    setShowExplanation(true);

    if (idx === question.correct) {
      setScore(prev => prev + 20);

      // 🔥 GAMIFICATION
      addXP(20);
      updateStreak();

      const updatedGame = getGameData();
      setGameData(updatedGame);

      // 🔥 Save XP to Firestore
      const username = localStorage.getItem("username") || "Anonymous";
      const userRef = doc(db, "leaderboard", username);

      await setDoc(
        userRef,
        {
          name: username,
          xp: updatedGame.xp,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } else {
      setWeakTopics(prev => [...prev, question.topic]);
    }
  };

  const nextQuestion = () => {
    setCurrentQ(prev => prev + 1);
    setSelected(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-wide">
            🧠 Study Bhai
          </h1>

          <div className="text-sm font-semibold bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            XP: {gameData.xp} | Level {gameData.level} 🌱
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/10 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-500"
            style={{
              width: `${((currentQ + 1) / quiz.questions.length) * 100}%`,
            }}
          />
        </div>

        {currentQ < quiz.questions.length ? (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

            <p className="text-sm text-purple-300 mb-4">
              Question {currentQ + 1} of {quiz.questions.length}
            </p>

            <h2 className="text-2xl font-bold mb-8 leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => !showExplanation && handleAnswer(idx)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border ${
                    showExplanation
                      ? idx === question.correct
                        ? 'bg-green-500/20 border-green-400'
                        : idx === selected
                        ? 'bg-red-500/20 border-red-400'
                        : 'bg-white/5 border-white/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="mt-8 bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-purple-300 font-semibold mb-2">
                  💡 Explanation
                </p>
                <p className="text-gray-300">{question.explanation}</p>

                <button
                  onClick={nextQuestion}
                  className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 text-center shadow-2xl">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>

            <p className="text-4xl font-bold text-purple-400 mb-4">
              Total XP: {gameData.xp}
            </p>

            <p className="text-lg text-gray-300 mb-6">
              🔥 Streak: {gameData.streak} days
            </p>

            {weakTopics.length > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-400/30 p-6 rounded-xl">
                <p className="font-semibold text-yellow-300 mb-2">
                  📊 Topics to Review
                </p>
                <p className="text-gray-300">
                  {[...new Set(weakTopics)].join(', ')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
