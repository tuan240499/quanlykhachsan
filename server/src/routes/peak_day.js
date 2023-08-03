import express from "express";
import {
  createPeakDay,
  deletePeakDay,
  getAllPeakDays,
  updatePeakDay,
} from "../controllers/peak_day.js";

import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();
// CUSTOMER
router.get("/", getAllPeakDays);
// SERVICES
router.get("/admin", adminAuthMiddleware, getAllPeakDays);
router.post("/new", adminAuthMiddleware, createPeakDay);
router.put("/update/:id", adminAuthMiddleware, updatePeakDay);
router.delete("/delete/:id", adminAuthMiddleware, deletePeakDay);

export default router;
