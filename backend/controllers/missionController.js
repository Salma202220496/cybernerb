import Mission from "../models/Mission.js";

export async function getMissions(
  req,
  res
) {
  try {
    const missions =
      await Mission.find({
        active: true,
      }).select(
        "-correctDecision -explanation"
      );

    res.json({
      missions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Unable to load missions.",
    });
  }
}

export async function getMissionById(
  req,
  res
) {
  try {
    const mission =
      await Mission.findOne({
        _id: req.params.id,
        active: true,
      }).select(
        "-correctDecision -explanation"
      );

    if (!mission) {
      return res.status(404).json({
        message:
          "Mission not found.",
      });
    }

    res.json({
      mission,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Unable to load mission.",
    });
  }
}