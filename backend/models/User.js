import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
        minlength: 8,
      },

      role: {
        type: String,

        enum: [
          "learner",
          "admin",
        ],

        default: "learner",
      },

      xp: {
        type: Number,
        default: 0,
      },

      credits: {
        type: Number,
        default: 450,
      },

      level: {
        type: Number,
        default: 1,
      },

      completedMissions: {
        type: Number,
        default: 0,
      },

      correctDecisions: {
        type: Number,
        default: 0,
      },

      totalDecisions: {
        type: Number,
        default: 0,
      },

      hintsUsed: {
        type: Number,
        default: 0,
      },

      streak: {
        type: Number,
        default: 0,
      },

      achievements: [
        {
          type: String,
        },
      ],
    },

    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);