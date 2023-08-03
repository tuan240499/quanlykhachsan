import mongoose from "mongoose";
import User from "../models/user.js";
import Log from "../models/log.js";
import { INTEGER, STRING } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Tài khoản",
    time_stamp: time,
  });
  await newLog.save();
};

export const getAllAccount = async (req, res) => {
  try {
    const account = await User.find();
    setTimeout(() => {
      return res.status(200).json(account);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const banAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No account with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      {
        banned: true,
        modified_date: TIME_STAMP,
      },
      { new: true }
    );
    await logAction(req._id, INTEGER.LOG_BAN_ACCOUNT, TIME_STAMP);
    res.status(202).json(updatedAccount);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
export const activeAccount = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No account with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      {
        banned: false,
        modified_date: TIME_STAMP,
      },
      { new: true }
    );
    await logAction(req._id, INTEGER.LOG_ACTIVE_ACCOUNT, TIME_STAMP);
    res.status(202).json(updatedAccount);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
