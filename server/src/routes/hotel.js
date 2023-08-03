import express from "express";
import {
  createHotel,
  getAllHotel,
  deleteHotel,
  updateHotel,
  getHotelByFilter,
  getHotelById,
  getAllHotelForForm,
} from "../controllers/hotel.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";
import { hotelUploader } from "../middlewares/uploader.js";
const router = express.Router();

// MANAGEMENT
router.post(
  "/new",
  [adminAuthMiddleware, hotelUploader.array("images")],
  createHotel
);
router.get("/list", adminAuthMiddleware, getAllHotel);
router.get("/form", adminAuthMiddleware, getAllHotelForForm);
router.delete("/delete/:id", adminAuthMiddleware, deleteHotel);
router.put(
  "/update/:id",
  [adminAuthMiddleware, hotelUploader.array("images")],
  updateHotel
);

// CUSTOMER
router.get("/one/:id", getHotelById);
router.post("/search", getHotelByFilter);

export default router;
