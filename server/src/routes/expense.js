import express from "express";
import {
  getAllExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.js";
import { adminAuthMiddleware } from "../middlewares/auth.js";
const router = express.Router();

router.get("/list", adminAuthMiddleware, getAllExpense);
router.post("/new", adminAuthMiddleware, createExpense);
router.put("/update/:id", adminAuthMiddleware, updateExpense);
router.delete("/delete/:id", adminAuthMiddleware, deleteExpense);

export default router;
