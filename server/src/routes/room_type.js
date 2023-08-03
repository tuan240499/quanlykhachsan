import express from "express";
import {
  createRoomType,
  deleteRoomType,
  getAllRoomType,
  getAvailableRoomType,
  getRoomTypeByHotel,
  updateRoomType,
} from "../controllers/room_type.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";
import { roomTypeUploader } from "../middlewares/uploader.js";

const router = express.Router();

// ADMIN
router.get("/", adminAuthMiddleware, getAllRoomType);
router.get("/by_hotel/:id", adminAuthMiddleware, getRoomTypeByHotel);
router.post(
  "/new",
  [adminAuthMiddleware, roomTypeUploader.array("images")],
  createRoomType
);
router.put(
  "/update/:id",
  [adminAuthMiddleware, roomTypeUploader.array("images")],
  updateRoomType
);
router.delete("/delete/:id", adminAuthMiddleware, deleteRoomType);

// CUSTOMER
router.post("/search/:hotel_id", getAvailableRoomType);

export default router;
