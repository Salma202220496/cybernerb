export const missionData = [
  {
    id: 1,
    title: "The Weak Password",
    category: "Password Security",
    difficulty: "Beginner",
    difficultyLevel: 1,
    xp: 100,
    credits: 30,
  },

  {
    id: 2,
    title: "Public Wi-Fi Trap",
    category: "Network Security",
    difficulty: "Beginner",
    difficultyLevel: 1,
    xp: 120,
    credits: 35,
  },

  {
    id: 3,
    title: "The Suspicious Email",
    category: "Phishing",
    difficulty: "Intermediate",
    difficultyLevel: 2,
    xp: 150,
    credits: 50,
  },

  {
    id: 4,
    title: "Fake Microsoft Login",
    category: "Phishing",
    difficulty: "Intermediate",
    difficultyLevel: 2,
    xp: 180,
    credits: 60,
  },

  {
    id: 5,
    title: "The Executive Phishing Attack",
    category: "Social Engineering",
    difficulty: "Advanced",
    difficultyLevel: 3,
    xp: 250,
    credits: 80,
  },

  {
    id: 6,
    title: "The Multi-Stage Attack",
    category: "Advanced Threats",
    difficulty: "Expert",
    difficultyLevel: 4,
    xp: 350,
    credits: 100,
  },
];

export function getNextMission(
  currentMissionId,
  performance
) {
  const currentIndex =
    missionData.findIndex(
      (mission) =>
        mission.id === currentMissionId
    );

  if (currentIndex === -1) {
    return missionData[0];
  }

  const currentMission =
    missionData[currentIndex];

  if (performance >= 85) {
    return (
      missionData[currentIndex + 1] ||
      currentMission
    );
  }

  if (performance >= 60) {
    return (
      missionData[currentIndex + 1] ||
      currentMission
    );
  }

  const sameDifficultyMission =
    missionData.find(
      (mission) =>
        mission.id !== currentMission.id &&
        mission.difficultyLevel ===
          currentMission.difficultyLevel
    );

  return sameDifficultyMission || currentMission;
}