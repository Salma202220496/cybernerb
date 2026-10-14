export const defaultProgress = {
  totalXP: 0,

  credits: 450,

  level: 1,

  completedMissions: 0,

  correctDecisions: 0,

  totalDecisions: 0,

  cluesFound: 0,

  hintsUsed: 0,

  currentStreak: 0,

  longestStreak: 0,

  achievements: [],

  missionHistory: [],
};

export function calculateLevel(xp) {
  if (xp >= 5000) return 10;
  if (xp >= 4000) return 9;
  if (xp >= 3200) return 8;
  if (xp >= 2500) return 7;
  if (xp >= 1900) return 6;
  if (xp >= 1400) return 5;
  if (xp >= 1000) return 4;
  if (xp >= 700) return 3;
  if (xp >= 400) return 2;

  return 1;
}