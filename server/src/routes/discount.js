import express from "express";
import {
  checkDiscount,
  createDiscount,
  deleteDiscount,
  getAllDiscount,
  updateDiscount,
  getDiscountByUser,
} from "../controllers/discount.js";
import {
  adminAuthMiddleware,
  userAuthMiddleware,
} from "../middlewares/auth.js";

const router = express.Router();

// ADMIN
router.get("/", adminAuthMiddleware, getAllDiscount);
router.post("/new", adminAuthMiddleware, createDiscount);
router.put("/update/:id", adminAuthMiddleware, updateDiscount);
router.delete("/delete/:id", adminAuthMiddleware, deleteDiscount);

// CUSTOMER
router.post("/check", userAuthMiddleware, checkDiscount);
router.get("/user", userAuthMiddleware, getDiscountByUser);

export default router;
