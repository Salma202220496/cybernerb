import Mission from "../models/Mission.js";

import MissionResult
  from "../models/MissionResult.js";

import User from "../models/User.js";

export async function submitMission(
  req,
  res
) {
  try {
    const {
      missionId,
      decision,
      cluesFound = 0,
      hintsUsed = 0,
      creditsSpent = 0,
      performance = 0,
      timeRemaining = 0,
    } = req.body;

    const mission =
      await Mission.findById(
        missionId
      );

    if (!mission) {
      return res.status(404).json({
        message:
          "Mission not found.",
      });
    }

    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {
      return res.status(404).json({
        message:
          "User not found.",
      });
    }

    const correct =
      decision ===
      mission.correctDecision;

    const baseXP = correct
      ? mission.xpReward
      : Math.round(
          mission.xpReward * 0.2
        );

    const hintPenalty =
      hintsUsed * 10;

    const xpEarned =
      Math.max(
        10,
        baseXP - hintPenalty
      );

    const creditsEarned =
      correct
        ? mission.creditReward
        : Math.round(
            mission.creditReward *
              0.2
          );

    const safeCreditsSpent =
      Math.min(
        creditsSpent,
        user.credits
      );

    user.xp += xpEarned;

    user.credits =
      user.credits -
      safeCreditsSpent +
      creditsEarned;

    user.completedMissions += 1;

    user.totalDecisions += 1;

    if (correct) {
      user.correctDecisions += 1;
    }

    user.hintsUsed +=
      hintsUsed;

    user.level =
      calculateLevel(user.xp);

    await user.save();

    const result =
      await MissionResult.create({
        user: user._id,

        mission: mission._id,

        decision,

        correct,

        cluesFound,

        hintsUsed,

        creditsSpent:
          safeCreditsSpent,

        xpEarned,

        creditsEarned,

        performance,

        timeRemaining,
      });

    res.status(201).json({
      result,

      progress: {
        xp: user.xp,
        credits: user.credits,
        level: user.level,
        completedMissions:
          user.completedMissions,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Unable to submit mission.",
    });
  }
}

function calculateLevel(xp) {
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