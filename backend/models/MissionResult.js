import mongoose from "mongoose";

const missionResultSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mission",
        required: true,
      },

      decision: {
        type: String,
        required: true,
      },

      correct: {
        type: Boolean,
        required: true,
      },

      cluesFound: {
        type: Number,
        default: 0,
      },

      hintsUsed: {
        type: Number,
        default: 0,
      },

      creditsSpent: {
        type: Number,
        default: 0,
      },

      xpEarned: {
        type: Number,
        default: 0,
      },

      creditsEarned: {
        type: Number,
        default: 0,
      },

      performance: {
        type: Number,
        default: 0,
      },

      timeRemaining: {
        type: Number,
        default: 0,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "MissionResult",
  missionResultSchema
);