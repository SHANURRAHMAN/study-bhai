// ==============================
// 🧠 Study Bhai Game Engine
// ==============================

export interface WeeklyStat {
  date: string;
  focusMinutes: number;
}

export interface GameData {
  xp: number;
  level: number;
  streak: number;
  lastStudyDate: string | null;

  dailyXP: number;
  lastDailyReset: string | null;

  weeklyStats: WeeklyStat[];
}

const DAILY_GOAL = 100;
const STORAGE_KEY = "studyGame";

// ==============================
// 🌱 Default State
// ==============================

const defaultData: GameData = {
  xp: 0,
  level: 1,
  streak: 0,
  lastStudyDate: null,
  dailyXP: 0,
  lastDailyReset: null,
  weeklyStats: [],
};

// ==============================
// 🗓 Helpers
// ==============================

function todayString(): string {
  return new Date().toDateString();
}

// ==============================
// 📦 Load Game Data (Safe Merge)
// ==============================

export function getGameData(): GameData {
  if (typeof window === "undefined") return defaultData;

  const stored = localStorage.getItem(STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : {};

  // Merge with defaults to prevent undefined errors
  const data: GameData = {
    ...defaultData,
    ...parsed,
    weeklyStats: parsed.weeklyStats || [],
  };

  // 🔄 Auto reset daily XP
  if (data.lastDailyReset !== todayString()) {
    data.dailyXP = 0;
    data.lastDailyReset = todayString();
    saveGameData(data);
  }

  return data;
}

// ==============================
// 💾 Save Game Data
// ==============================

export function saveGameData(data: GameData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ==============================
// ⭐ Add XP
// ==============================

export function addXP(amount: number): void {
  const data = getGameData();

  data.xp += amount;
  data.dailyXP += amount;

  // Simple linear level system
  data.level = Math.floor(data.xp / 100) + 1;

  saveGameData(data);
}

// ==============================
// 🔥 Update Streak
// ==============================

export function updateStreak(): void {
  const data = getGameData();
  const today = todayString();

  if (data.lastStudyDate === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (data.lastStudyDate === yesterday.toDateString()) {
    data.streak += 1;
  } else {
    data.streak = 1;
  }

  data.lastStudyDate = today;
  saveGameData(data);
}

// ==============================
// ⏱ Log Focus Session
// ==============================

export function logFocusSession(minutes: number): void {
  const data = getGameData();
  const today = todayString();

  const existing = data.weeklyStats.find(
    (d) => d.date === today
  );

  if (existing) {
    existing.focusMinutes += minutes;
  } else {
    data.weeklyStats.push({
      date: today,
      focusMinutes: minutes,
    });
  }

  // Keep only last 7 days
  data.weeklyStats = data.weeklyStats.slice(-7);

  saveGameData(data);
}

// ==============================
// 🎯 Daily Goal
// ==============================

export function getDailyGoal(): number {
  return DAILY_GOAL;
}
