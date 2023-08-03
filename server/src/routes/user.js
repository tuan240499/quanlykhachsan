import express from "express";
import {
  login,
  signup,
  ping,
  logout,
  getInfo,
  updateInfo,
  changePassword,
  checkAuth,
} from "../controllers/user.js";
import { userAuthMiddleware } from "../middlewares/auth.js";
import { userUploader } from "../middlewares/uploader.js";

const router = express.Router();

// router.get("/:id", isLoggedIn, getUserInfo);
router.get("/check", userAuthMiddleware, checkAuth);
router.post("/change-password", userAuthMiddleware, changePassword);
router.post("/login", login);
router.post("/signup", signup);
router.get("/", userAuthMiddleware, getInfo);
router.post(
  "/update",
  [userAuthMiddleware, userUploader.single("profile_image")],
  updateInfo
);
router.post("/logout", logout);
router.post("/ping", ping);
router.post("/upload", userUploader.array("images", 12), (req, res) => {
  // change to uploader.single("field_name") if you want to upload an image only
  res.status(200).send("UPLOAD COMPLETED");
});
export default router;
