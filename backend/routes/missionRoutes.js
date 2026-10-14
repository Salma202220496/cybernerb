import express from "express";

import {
  getMissions,
  getMissionById,
} from "../controllers/missionController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/",
  protect,
  getMissions
);

router.get(
  "/:id",
  protect,
  getMissionById
);

export default router;