import dotenv from "dotenv";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.js";
import { INTEGER, STRING } from "../constants/constants.js";

dotenv.config();

export const userAuthMiddleware = async (req, res, next) => {
  try {
    if (req.cookies.customer === undefined)
      return res.status(401).send(STRING.AUTHENTICATION_FAILED);
    const token = req.cookies.customer;
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req._id = decodedData.id;
    const user = await User.findOne({ _id: decodedData.id });
    if (user) next();
    else return res.status(401).send(STRING.AUTHENTICATION_FAILED);
  } catch (error) {
    console.log("middleware: ", error.message);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    if (req.cookies.admin === undefined)
      return res.status(401).send(STRING.AUTHENTICATION_FAILED);
    const token = req.cookies.admin;
    const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req._id = decodedData.id;
    const user = await User.findOne({ _id: decodedData.id });
    req.full_name = user?.full_name;
    if (
      user &&
      (user.role === INTEGER.ADMIN_ROLE || user.role === INTEGER.EMPLOYEE_ROLE)
    )
      next();
    else return res.status(401).send(STRING.AUTHENTICATION_FAILED);
  } catch (error) {
    console.log("middleware: ", error.message);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
