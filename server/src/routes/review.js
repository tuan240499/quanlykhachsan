import express from "express";
import {
  acceptReview,
  createReview,
  getAllReviewByHotel,
  getAllReviewByPagination,
  getAllReviewByUser,
  getAllReviewForManagement,
  ignoreReview,
  resetReview,
} from "../controllers/review.js";
import {
  userAuthMiddleware,
  adminAuthMiddleware,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", userAuthMiddleware, createReview);
router.get("/hotel/:id", getAllReviewByHotel);
router.get("/page/:hotel&:page", getAllReviewByPagination);
router.get("/user", userAuthMiddleware, getAllReviewByUser);

// MANAGEMENT
router.get("/list", adminAuthMiddleware, getAllReviewForManagement);
router.get("/accept/:id", adminAuthMiddleware, acceptReview);
router.get("/ignore/:id", adminAuthMiddleware, ignoreReview);
router.get("/reset/:id", adminAuthMiddleware, resetReview);

export default router;
