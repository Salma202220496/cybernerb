import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  defaultProgress,
  calculateLevel,
} from "../models/progressModel";

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "cybernerb_progress"
      );

      if (saved) {
        return {
          ...defaultProgress,
          ...JSON.parse(saved),
        };
      }
    } catch (error) {
      console.error(
        "Failed to load CYBERNERB progress:",
        error
      );
    }

    return defaultProgress;
  });

  // Save progress automatically
  useEffect(() => {
    localStorage.setItem(
      "cybernerb_progress",
      JSON.stringify(progress)
    );
  }, [progress]);

  // =========================
  // COMPLETE MISSION
  // =========================

  const completeMission = (result = {}) => {
    setProgress((current) => {
      const xpEarned = Number(
        result.xpEarned ?? 0
      );

      const creditsEarned = Number(
        result.creditsEarned ?? 0
      );

      const currentCredits = Number(
        current.credits ?? 450
      );

      /*
       * If the mission sends creditsRemaining,
       * use that value.
       *
       * Otherwise keep the current credits.
       */
      const missionCredits =
        result.creditsRemaining !== undefined
          ? Number(result.creditsRemaining)
          : currentCredits;

      const finalCredits = Math.max(
        0,
        missionCredits + creditsEarned
      );

      const newXP =
        Number(current.totalXP ?? 0) +
        xpEarned;

      const newCompleted =
        Number(current.completedMissions ?? 0) +
        1;

      const newCorrect =
        Number(current.correctDecisions ?? 0) +
        (result.correct ? 1 : 0);

      const newTotal =
        Number(current.totalDecisions ?? 0) +
        1;

      const newClues =
        Number(current.cluesFound ?? 0) +
        Number(
          result.cluesFound ??
            result.inspectedClues?.length ??
            0
        );

      const newHints =
        Number(current.hintsUsed ?? 0) +
        Number(result.hintsUsed ?? 0);

      const history = [
        ...(current.missionHistory ?? []),
        {
          ...result,
          xpEarned,
          creditsEarned,
          creditsRemaining: finalCredits,
          completedAt: new Date().toISOString(),
        },
      ];

      return {
        ...current,

        totalXP: newXP,

        credits: finalCredits,

        level: calculateLevel(newXP),

        completedMissions: newCompleted,

        correctDecisions: newCorrect,

        totalDecisions: newTotal,

        cluesFound: newClues,

        hintsUsed: newHints,

        missionHistory: history,
      };
    });
  };

  // =========================
  // SPEND CREDITS
  // =========================

  const spendCredits = (amount) => {
    const cost = Number(amount ?? 0);

    if (cost <= 0) {
      return false;
    }

    let success = false;

    setProgress((current) => {
      const currentCredits = Number(
        current.credits ?? 450
      );

      if (currentCredits < cost) {
        return current;
      }

      success = true;

      return {
        ...current,
        credits: Math.max(
          0,
          currentCredits - cost
        ),
      };
    });

    return success;
  };

  // =========================
  // ADD CREDITS
  // =========================

  const addCredits = (amount) => {
    const reward = Number(amount ?? 0);

    if (reward <= 0) return;

    setProgress((current) => ({
      ...current,

      credits:
        Number(current.credits ?? 450) +
        reward,
    }));
  };

  // =========================
  // ADD XP
  // =========================

  const addXP = (amount) => {
    const earnedXP = Number(amount ?? 0);

    if (earnedXP <= 0) return;

    setProgress((current) => {
      const newXP =
        Number(current.totalXP ?? 0) +
        earnedXP;

      return {
        ...current,

        totalXP: newXP,

        level: calculateLevel(newXP),
      };
    });
  };

  // =========================
  // RESET PROGRESS
  // =========================

  const resetProgress = () => {
    setProgress(defaultProgress);

    localStorage.removeItem(
      "cybernerb_progress"
    );
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,

        completeMission,

        spendCredits,

        addCredits,

        addXP,

        resetProgress,

        setProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error(
      "useProgress must be used inside ProgressProvider"
    );
  }

  return context;
}