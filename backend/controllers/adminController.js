import User from "../models/User.js";

import Mission
  from "../models/Mission.js";

import MissionResult
  from "../models/MissionResult.js";

export async function getDashboard(
  req,
  res
) {
  try {
    const [
      users,
      missions,
      results,
    ] = await Promise.all([
      User.countDocuments(),

      Mission.countDocuments({
        active: true,
      }),

      MissionResult.countDocuments(),
    ]);

    const correct =
      await MissionResult.countDocuments(
        {
          correct: true,
        }
      );

    const accuracy =
      results === 0
        ? 0
        : Math.round(
            (correct / results) *
              100
          );

    res.json({
      statistics: {
        users,
        missions,
        completedMissions:
          results,
        accuracy,
      },
    });
  } catch {
    res.status(500).json({
      message:
        "Unable to load admin dashboard.",
    });
  }
}

export async function getUsers(
  req,
  res
) {
  try {
    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        });

    res.json({
      users,
    });
  } catch {
    res.status(500).json({
      message:
        "Unable to load users.",
    });
  }
}

export async function getResults(
  req,
  res
) {
  try {
    const results =
      await MissionResult.find()
        .populate(
          "user",
          "name email"
        )
        .populate(
          "mission",
          "title difficulty category"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      results,
    });
  } catch {
    res.status(500).json({
      message:
        "Unable to load results.",
    });
  }
}