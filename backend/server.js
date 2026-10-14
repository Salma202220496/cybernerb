import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

import helmet from "helmet";

import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";



dotenv.config();

const app =
  express();

app.use(
  helmet()
);

app.use(
  cors({
    origin:
      process.env.CLIENT_URL,
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

const apiLimiter =
  rateLimit({
    windowMs:
      15 * 60 * 1000,

    max: 200,

    message: {
      message:
        "Too many requests. Please try again later.",
    },
  });

app.use(
  "/api",
  apiLimiter
);

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      status: "OK",
      message:
        "CYBERNERB backend is running.",
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

const PORT =
  process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected"
    );

    app.listen(
      PORT,
      () => {
        console.log(
          `CYBERNERB backend running on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);
  }
}

startServer();
import missionRoutes
  from "./routes/missionRoutes.js";
  app.use(
  "/api/missions",
  missionRoutes
);
import resultRoutes
  from "./routes/resultRoutes.js";
  app.use(
  "/api/results",
  resultRoutes
);
import userRoutes
  from "./routes/userRoutes.js";
  app.use(
  "/api/users",
  userRoutes
);
import adminRoutes
  from "./routes/adminRoutes.js";
  app.use(
  "/api/admin",
  adminRoutes
);