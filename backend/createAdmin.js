import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import dotenv from "dotenv";

import User from "./models/User.js";

dotenv.config();

await mongoose.connect(
  process.env.MONGO_URI
);

const password =
  await bcrypt.hash(
    "cybernerb123",
    12
  );

const existing =
  await User.findOne({
    email:
      "admin@cybernerb.com",
  });

if (existing) {
  existing.role = "admin";

  existing.password =
    password;

  await existing.save();

  console.log(
    "Existing user updated to admin."
  );
} else {
  await User.create({
    name: "CYBERNERB Admin",

    email:
      "admin@cybernerb.com",

    password,

    role: "admin",
  });

  console.log(
    "Admin account created."
  );
}

await mongoose.disconnect();