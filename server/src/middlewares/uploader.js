import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { STRING } from "../constants/constants.js";

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "STATIC/user");
  },
  filename: (req, file, cb) => {
    const fileName = req.body._id + path.extname(file.originalname);

    const REQUIRED_PATH = path.join("STATIC", "user");
    if (!existsSync(REQUIRED_PATH))
      mkdirSync(REQUIRED_PATH, { recursive: true });

    req.body.profile_image = `${STRING.SERVER_URL}/user/${fileName}`;
    cb(null, fileName);
  },
});

const hotelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "STATIC/hotel");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    if (!(req.body.images instanceof Array)) req.body.images = [];

    const REQUIRED_PATH = path.join("STATIC", "hotel");
    if (!existsSync(REQUIRED_PATH))
      mkdirSync(REQUIRED_PATH, { recursive: true });

    req.body.images.push(`${STRING.SERVER_URL}/hotel/${fileName}`);
    cb(null, fileName);
  },
});

const roomTypeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "STATIC/room");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    if (!(req.body.images instanceof Array)) req.body.images = [];

    const REQUIRED_PATH = path.join("STATIC", "room");
    if (!existsSync(REQUIRED_PATH))
      mkdirSync(REQUIRED_PATH, { recursive: true });

    req.body.images.push(`${STRING.SERVER_URL}/room/${fileName}`);
    cb(null, fileName);
  },
});

export const userUploader = multer({ storage: userStorage });
export const hotelUploader = multer({ storage: hotelStorage });
export const roomTypeUploader = multer({ storage: roomTypeStorage });
