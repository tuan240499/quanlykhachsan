import express from "express";
import {
  getAllAccount,
  banAccount,
  activeAccount,
} from "../controllers/account.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// SERVICES
router.get("/list", adminAuthMiddleware, getAllAccount);
router.put("/ban/:id", adminAuthMiddleware, banAccount);
router.put("/active/:id", adminAuthMiddleware, activeAccount);

export default router;
