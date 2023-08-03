import express from "express";
import {
  createRoomService,
  deleteRoomService,
  getAllRoomServices,
  updateRoomService,
} from "../controllers/room_service.js";

import { adminAuthMiddleware } from "../middlewares/auth.js";

const router = express.Router();

// SERVICES
router.get("/", adminAuthMiddleware, getAllRoomServices);
router.post("/new", adminAuthMiddleware, createRoomService);
router.put("/update/:id", adminAuthMiddleware, updateRoomService);
router.delete("/delete/:id", adminAuthMiddleware, deleteRoomService);

export default router;
