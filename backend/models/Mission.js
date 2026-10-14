import mongoose from "mongoose";

const clueSchema =
  new mongoose.Schema(
    {
      id: String,

      title: String,

      description: String,

      type: {
        type: String,

        enum: [
          "danger",
          "safe",
          "warning",
        ],

        default: "warning",
      },
    },
    {
      _id: false,
    }
  );

const hintSchema =
  new mongoose.Schema(
    {
      id: String,

      title: String,

      description: String,

      cost: Number,
    },
    {
      _id: false,
    }
  );

const missionSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: String,

      category: String,

      difficulty: {
        type: String,

        enum: [
          "Beginner",
          "Intermediate",
          "Advanced",
          "Expert",
        ],
      },

      difficultyLevel: {
        type: Number,
        default: 1,
      },

      xpReward: {
        type: Number,
        default: 100,
      },

      creditReward: {
        type: Number,
        default: 30,
      },

      scenarioType: {
        type: String,

        enum: [
          "phishing",
          "password",
          "wifi",
          "social-engineering",
          "malware",
        ],
      },

      clues: [
        clueSchema,
      ],

      hints: [
        hintSchema,
      ],

      correctDecision: {
        type: String,
        required: true,
      },

      explanation: String,

      active: {
        type: Boolean,
        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Mission",
  missionSchema
);