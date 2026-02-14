export interface WeeklyStat {
  date: string;
  focusMinutes: number;
  xpEarned: number;
}

export interface GameData {
  xp: number;
  level: number;
  streak: number;
  dailyXP: number;
  lastDailyReset: string;
  weeklyStats: WeeklyStat[];
}
