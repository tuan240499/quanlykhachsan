import express from "express";
import { getDashboard } from "../controllers/dashboard.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, getDashboard);

export default router;
