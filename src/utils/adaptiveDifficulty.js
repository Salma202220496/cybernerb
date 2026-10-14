export function calculateMissionPerformance({
  decision,
  inspectedClues,
  hintsUsed,
  timeRemaining = 0,
  totalTime = 300,
}) {
  const decisionScore =
    decision === "phishing" ? 60 : 20;

  const clueScore =
    (inspectedClues.length / 3) * 20;

  const hintPenalty =
    hintsUsed * 5;

  const timeScore =
    Math.min(
      20,
      (timeRemaining / totalTime) * 20
    );

  const performance = Math.round(
    decisionScore +
    clueScore +
    timeScore -
    hintPenalty
  );

  return Math.max(
    0,
    Math.min(100, performance)
  );
}

export function getPerformanceLevel(
  performance
) {
  if (performance >= 85) {
    return "Excellent";
  }

  if (performance >= 70) {
    return "Good";
  }

  if (performance >= 50) {
    return "Needs Practice";
  }

  return "Review Required";
}

export function getRecommendedDifficulty(
  performance,
  currentDifficulty
) {
  if (performance >= 85) {
    return Math.min(
      currentDifficulty + 1,
      4
    );
  }

  if (performance < 50) {
    return Math.max(
      currentDifficulty,
      1
    );
  }

  return currentDifficulty;
}