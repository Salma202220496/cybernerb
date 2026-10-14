import express from "express";

import {
  submitMission,
} from "../controllers/resultController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  submitMission
);

export default router;