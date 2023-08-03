import mongoose from "mongoose";
import PeakDay from "../models/peak_day.js";
import Log from "../models/log.js";
import { STRING, INTEGER } from "../constants/constants.js";

const logAction = async (user, type, time) => {
  const newLog = new Log({
    user: user,
    type: type,
    target: "Ngày cao điểm",
    time_stamp: time,
  });
  await newLog.save();
};

export const getAllPeakDays = async (req, res) => {
  try {
    const peakDay = await PeakDay.find();
    setTimeout(() => {
      return res.status(200).json(peakDay);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const createPeakDay = async (req, res) => {
  const peakDay = req.body;
  const start_date = new Date(peakDay.start_date).setHours(0, 0, 0, 0);
  const end_date = new Date(peakDay.end_date).setHours(0, 0, 0, 0);
  try {
    // VALIDATE OVERLAPPING DAY
    const overlappingDay = await PeakDay.findOne({
      start_date: { $lte: end_date },
      end_date: { $gte: start_date },
    });
    if (overlappingDay) {
      return res.status(409).send("Ngày cao điểm bị trùng lặp");
    }
    // PROCESS
    const TIME_STAMP = new Date();
    const newPeakDay = new PeakDay({
      ...peakDay,
      start_date: start_date,
      end_date: end_date,
      created_date: TIME_STAMP,
    });
    await newPeakDay.save();
    await logAction(req._id, INTEGER.LOG_ADD, TIME_STAMP);
    return res.status(200).json(newPeakDay);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updatePeakDay = async (req, res) => {
  const { id } = req.params;
  const peakDay = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No peak_day with that id");
  }
  const start_date = new Date(peakDay.start_date).setHours(0, 0, 0, 0);
  const end_date = new Date(peakDay.end_date).setHours(0, 0, 0, 0);
  try {
    // VALIDATE OVERLAPPING DAY
    const overlappingDay = await PeakDay.findOne({
      _id: { $ne: id },
      start_date: { $lte: end_date },
      end_date: { $gte: start_date },
    });
    if (overlappingDay) {
      return res.status(409).send("Ngày cao điểm bị trùng lặp");
    }
    // PROCESS
    const TIME_STAMP = new Date();
    const updatedPeakDay = await PeakDay.findByIdAndUpdate(
      id,
      {
        ...peakDay,
        start_date: start_date,
        end_date: end_date,
        modified_date: TIME_STAMP,
      },
      { new: true }
    );
    await logAction(req._id, INTEGER.LOG_UPDATE, TIME_STAMP);
    res.status(202).json(updatedPeakDay);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const deletePeakDay = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No peak_day with that id");
  }
  try {
    const TIME_STAMP = new Date();
    await PeakDay.findOneAndRemove({ _id: id });
    await logAction(req._id, INTEGER.LOG_DELETE, TIME_STAMP);
    res.status(202).send("Peak Day deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
