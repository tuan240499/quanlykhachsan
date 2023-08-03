import Log from "../models/log.js";
import { STRING } from "../constants/constants.js";

export const getAllLog = async (req, res) => {
  try {
    const log = await Log.find()
      .populate("user", ["full_name", "role"])
      .sort({ time_stamp: -1 });
    setTimeout(() => {
      return res.status(200).json(log);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
