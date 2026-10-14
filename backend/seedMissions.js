import mongoose from "mongoose";

import dotenv from "dotenv";

import Mission from "./models/Mission.js";

dotenv.config();

await mongoose.connect(
  process.env.MONGO_URI
);

await Mission.deleteMany({});

await Mission.insertMany([
  {
    title:
      "The Weak Password",

    description:
      "Evaluate whether a password is strong enough to protect an account.",

    category:
      "Password Security",

    difficulty:
      "Beginner",

    difficultyLevel: 1,

    xpReward: 100,

    creditReward: 30,

    scenarioType:
      "password",

    clues: [],

    hints: [
      {
        id: "password-length",

        title:
          "Check password length",

        description:
          "Longer passwords are generally harder to guess.",

        cost: 50,
      },
    ],

    correctDecision:
      "unsafe",
  },

  {
    title:
      "Public Wi-Fi Trap",

    description:
      "You are about to connect to an unknown public Wi-Fi network.",

    category:
      "Network Security",

    difficulty:
      "Beginner",

    difficultyLevel: 1,

    xpReward: 120,

    creditReward: 35,

    scenarioType:
      "wifi",

    clues: [
      {
        id: "network-name",

        title:
          "Suspicious network name",

        description:
          "The network name closely resembles the official venue network.",

        type:
          "danger",
      },
    ],

    hints: [
      {
        id: "wifi-check",

        title:
          "Verify the network",

        description:
          "Confirm the network name with venue staff before connecting.",

        cost: 50,
      },
    ],

    correctDecision:
      "unsafe",
  },

  {
    title:
      "The Suspicious Email",

    description:
      "Investigate a suspicious Microsoft security email.",

    category:
      "Phishing",

    difficulty:
      "Intermediate",

    difficultyLevel: 2,

    xpReward: 150,

    creditReward: 50,

    scenarioType:
      "phishing",

    clues: [
      {
        id: "sender",

        title:
          "Sender Address",

        description:
          "The domain uses micros0ft-support.com instead of Microsoft's legitimate domain.",

        type:
          "danger",
      },

      {
        id: "link",

        title:
          "Suspicious Link",

        description:
          "The link points to an unrelated verification domain.",

        type:
          "danger",
      },

      {
        id: "urgency",

        title:
          "Urgent Language",

        description:
          "The message pressures the user to act immediately.",

        type:
          "danger",
      },
    ],

    hints: [
      {
        id: "sender",

        title:
          "Check the sender",

        description:
          "Inspect the actual sender address carefully.",

        cost: 50,
      },

      {
        id: "link",

        title:
          "Inspect the link",

        description:
          "Look at the actual destination of the link.",

        cost: 75,
      },

      {
        id: "urgency",

        title:
          "Look for pressure",

        description:
          "Urgent threats are commonly used in phishing.",

        cost: 50,
      },
    ],

    correctDecision:
      "phishing",

    explanation:
      "The email uses a look-alike domain, urgency, and a suspicious destination.",
  },
]);

console.log(
  "CYBERNERB missions seeded."
);

await mongoose.disconnect();