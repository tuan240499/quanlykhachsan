import express from "express";
import {
  createBooking,
  getAllBookingByUser,
  getAllBookingForAdmin,
  cancelBooking,
  cancelBookingByUser,
  checkInBooking,
  checkOutBooking,
  createVnpayPaymentUrl,
  createMomoPaymentUrl,
  checkVnpayPaymentReturn,
  checkMomoPaymentReturn,
} from "../controllers/booking.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", userAuthMiddleware, createBooking);
router.get("/list", userAuthMiddleware, getAllBookingByUser);
router.get("/cancel/:id", userAuthMiddleware, cancelBookingByUser);
router.post("/create-vnpay-payment-url", createVnpayPaymentUrl);
router.post("/create-momo-payment-url", createMomoPaymentUrl);
router.post("/check-vnpay-payment-return", checkVnpayPaymentReturn);
router.post("/check-momo-payment-return", checkMomoPaymentReturn);

// management
router.get("/admin/cancel/:id", adminAuthMiddleware, cancelBooking);
router.get("/admin/list", adminAuthMiddleware, getAllBookingForAdmin);
router.get("/check-in/:id", adminAuthMiddleware, checkInBooking);
router.get("/check-out/:id", adminAuthMiddleware, checkOutBooking);

export default router;
