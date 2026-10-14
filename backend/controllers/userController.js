import User from "../models/User.js";

import MissionResult
  from "../models/MissionResult.js";

export async function getProfile(
  req,
  res
) {
  try {
    const user =
      await User.findById(
        req.user._id
      ).select("-password");

    const results =
      await MissionResult.find({
        user: req.user._id,
      })
        .populate(
          "mission",
          "title category difficulty"
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      user,
      missionHistory:
        results,
    });
  } catch {
    res.status(500).json({
      message:
        "Unable to load profile.",
    });
  }
}