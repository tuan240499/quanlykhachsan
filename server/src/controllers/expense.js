import mongoose from "mongoose";
import Expense from "../models/expense.js";
import Log from "../models/log.js";
import { STRING, INTEGER } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Hóa đơn chi",
    time_stamp: time,
  });
  await newLog.save();
};

export const getAllExpense = async (req, res) => {
  try {
    const expense = await Expense.find().populate("hotel", ["name"]);
    setTimeout(() => {
      return res.status(200).json(expense);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createExpense = async (req, res) => {
  const expense = req.body;
  try {
    const TIME_STAMP = new Date();
    const maxExpenseNumber = await Expense.find()
      .sort({ number: -1 })
      .limit(1)
      .then((data) => (data[0] ? data[0].number : 0));
    const newExpense = new Expense({
      number: maxExpenseNumber + 1,
      hotel: expense.hotel,
      amount: Number(expense.amount),
      description: expense.description,
      created_date: TIME_STAMP,
    });
    await newExpense.save();

    const returnedExpense = await Expense.findOne({
      _id: newExpense._id,
    }).populate("hotel", ["name"]);

    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
    return res.status(200).json(returnedExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No expense with that id");
  }
  try {
    const TIME_STAMP = new Date();
    await Expense.findOneAndRemove({ _id: id });
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Expense deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateExpense = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No expense with that id");
  }
  const expense = req.body;
  try {
    const TIME_STAMP = new Date();
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        hotel: expense.hotel,
        amount: Number(expense.amount),
        description: expense.description,
        modified_date: TIME_STAMP,
      },
      { new: true }
    ).populate("hotel", ["name"]);
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
    res.status(202).json(updatedExpense);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
