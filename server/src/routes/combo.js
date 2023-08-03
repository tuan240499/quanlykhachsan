import express from "express";
import {
  createCombo,
  deleteCombo,
  getAllCombo,
  updateCombo,
} from "../controllers/combo.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// SERVICES
router.get("/", adminAuthMiddleware, getAllCombo);
router.post("/new", adminAuthMiddleware, createCombo);
router.put("/update/:id", adminAuthMiddleware, updateCombo);
router.delete("/delete/:id", adminAuthMiddleware, deleteCombo);

export default router;
