import express from "express";
import { getAllLog } from "../controllers/log.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", adminAuthMiddleware, getAllLog);

export default router;
