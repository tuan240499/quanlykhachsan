import express from "express";
import {
  getAllBackup,
  createBackup,
  restore,
  deleteBackup,
  updateBackup,
} from "../controllers/backup.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, getAllBackup);
router.post("/new", adminAuthMiddleware, createBackup);
router.post("/update/:id", adminAuthMiddleware, updateBackup);
router.get("/restore/:id", adminAuthMiddleware, restore);
router.get("/delete/:id", adminAuthMiddleware, deleteBackup);

export default router;
