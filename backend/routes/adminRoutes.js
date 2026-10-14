import express from "express";

import {
  getDashboard,
  getUsers,
  getResults,
} from "../controllers/adminController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.use(protect);
router.use(adminOnly);

router.get(
  "/dashboard",
  getDashboard
);

router.get(
  "/users",
  getUsers
);

router.get(
  "/results",
  getResults
);

export default router;