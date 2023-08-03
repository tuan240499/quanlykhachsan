import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { STRING, INTEGER } from "../constants/constants.js";
import dotenv from "dotenv";

dotenv.config();

const COOKIES_EXPIRATION_TIME = 3600000; //ms
const ACCESS_TOKEN_EXPIRATION_TIME = "1d";

const generateToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).send("You're authenticated");
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const changePassword = async (req, res) => {
  const user = req.body;
  const id = req._id;
  try {
    const existedUser = await User.findOne({
      _id: id,
    });
    const isPasswordCorrect = await bcrypt.compare(
      user.current_password,
      existedUser.password
    );

    if (!isPasswordCorrect)
      return res.status(403).send(STRING.OLD_PASSWORD_WRONG);

    const hashedPassword = await bcrypt.hash(user.new_password, 12);
    await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).send("Đổi mật khẩu thành công");
  } catch (error) {
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const updateInfo = async (req, res) => {
  const user = req.body;
  try {
    await User.findByIdAndUpdate(req._id, { ...user }, { new: true });
    return res.status(200).send("Update completed");
  } catch (error) {
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const getInfo = async (req, res) => {
  const _id = req._id;
  try {
    const existedUser = await User.findOne({
      _id: _id,
    });
    if (!existedUser) return res.status(401).send(STRING.AUTHENTICATION_FAILED);

    return res.status(200).json(existedUser);
  } catch (error) {
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const login = async (req, res) => {
  const user = req.body;
  try {
    const existedUser = await User.findOne({
      username: user.username,
    });
    if (!existedUser)
      return res.status(401).send(STRING.WRONG_USERNAME_PASSWORD_ERROR_MESSAGE);

    if (existedUser.banned) return res.status(403).send(STRING.USER_BANNED);

    if (existedUser.role === 1998)
      return res.status(401).send(STRING.PERMISSION_DENIED);

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      existedUser.password
    );
    if (!isPasswordCorrect)
      return res.status(401).send(STRING.WRONG_USERNAME_PASSWORD_ERROR_MESSAGE);

    const token = generateToken(existedUser._id);

    return res
      .status(200)
      .cookie("admin", token, {
        expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME),
        httpOnly: true,
        secure: false,
      })
      .json({
        full_name: existedUser.full_name,
        profile_image: existedUser.profile_image,
        role: existedUser.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const signup = async (req, res) => {
  const user = req.body;
  try {
    const existedUsername = await User.findOne({ username: user.username });
    if (existedUsername) {
      return res.status(409).send(STRING.USERNAME_EXIST_ERROR_MESSAGE);
    }
    const existedPhone = await User.findOne({ phone: user.phone });
    if (existedPhone) {
      return res.status(409).send(STRING.PHONE_EXIST_ERROR_MESSAGE);
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({
      ...user,
      role: INTEGER.EMPLOYEE_ROLE,
      password: hashedPassword,
    });
    await newUser.save();

    // JWT
    const token = generateToken(newUser._id);
    return res
      .status(200)
      .cookie("admin", token, {
        expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME),
        httpOnly: true,
        secure: false,
      })
      .json({
        full_name: newUser.full_name,
        profile_image: newUser.profile_image,
        role: newUser.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};

export const logout = async (req, res) => {
  res.status(200).clearCookie("admin").send("Logout completely");
};

export const getAllUserForForm = async (req, res) => {
  try {
    const user = await User.find();
    setTimeout(() => {
      res.status(200).json(user);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send(STRING.UNEXPECTED_ERROR_MESSAGE);
  }
};
