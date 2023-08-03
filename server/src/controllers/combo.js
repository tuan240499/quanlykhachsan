import mongoose from "mongoose";
import Combo from "../models/combo.js";
import Booking from "../models/booking.js";
import Log from "../models/log.js";
import { STRING, INTEGER } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Gói dịch vụ phòng",
    time_stamp: time,
  });
  await newLog.save();
};

export const getAllCombo = async (req, res) => {
  try {
    const combo = await Combo.find().populate("hotel", ["name"]);
    setTimeout(() => {
      return res.status(200).json(combo);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createCombo = async (req, res) => {
  const combo = req.body;
  try {
    const TIME_STAMP = new Date();
    const newCombo = new Combo({
      ...combo,
      amount: Number(combo.amount),
      created_date: TIME_STAMP,
    });
    await newCombo.save();
    const returnedCombo = await Combo.findOne({ _id: newCombo._id }).populate(
      "hotel",
      ["name"]
    );
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
    return res.status(200).json(returnedCombo);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateCombo = async (req, res) => {
  const { id } = req.params;
  const combo = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No combo with that id");
  }
  try {
    const TIME_STAMP = new Date();
    const updatedCombo = await Combo.findByIdAndUpdate(
      id,
      {
        ...combo,
        amount: Number(combo.amount),
        modified_date: TIME_STAMP,
      },
      { new: true }
    ).populate("hotel", ["name"]);
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
    res.status(202).json(updatedCombo);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deleteCombo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No combo with that id");
  }
  try {
    // CHECK RELATED RECORD
    let delete_id = mongoose.Types.ObjectId(id);
    const related_booking = await Booking.findOne({ combo_list: delete_id });
    if (related_booking) {
      return res.status(409).send(STRING.DELETE_RELATED_RECORD);
    }

    // PROCESS
    const TIME_STAMP = new Date();
    await Combo.findOneAndRemove({ _id: id });
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Combo deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
