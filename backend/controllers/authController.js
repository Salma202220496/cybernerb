import bcrypt from "bcryptjs";

import User from "../models/User.js";

import {
  generateToken,
} from "../utils/generateToken.js";

export async function register(
  req,
  res
) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Name, email and password are required.",
      });
    }

    const existingUser =
      await User.findOne({
        email:
          email.toLowerCase(),
      });

    if (existingUser) {
      return res.status(409).json({
        message:
          "An account with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    const user =
      await User.create({
        name,
        email:
          email.toLowerCase(),
        password:
          hashedPassword,
      });

    const token =
      generateToken(user);

    res.status(201).json({
      message:
        "Account created successfully.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        credits: user.credits,
        level: user.level,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Server error.",
    });
  }
}

export async function login(
  req,
  res
) {
  try {
    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email:
          email.toLowerCase(),
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(401).json({
        message:
          "Invalid email or password.",
      });
    }

    const token =
      generateToken(user);

    res.json({
      message:
        "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        credits: user.credits,
        level: user.level,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message:
        "Server error.",
    });
  }
}