// lib
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { existsSync, mkdirSync } from "fs";
// custom
import userRoutes from "./src/routes/user.js";
import adminRoutes from "./src/routes/admin.js";
import hotelRoutes from "./src/routes/hotel.js";
import roomRoutes from "./src/routes/room.js";
import roomTypeRoutes from "./src/routes/room_type.js";
import roomServiceRoutes from "./src/routes/room_service.js";
import bookingRoutes from "./src/routes/booking.js";
import expenseRoutes from "./src/routes/expense.js";
import backupRoutes from "./src/routes/backup.js";
import testRoutes from "./src/routes/test.js";
import accountRoutes from "./src/routes/account.js";
import dashboardRoutes from "./src/routes/dashboard.js";
import logRoutes from "./src/routes/log.js";
import reviewRoutes from "./src/routes/review.js";
import discountRoutes from "./src/routes/discount.js";
import comboRoutes from "./src/routes/combo.js";
import peakDayRoutes from "./src/routes/peak_day.js";

// pre-config
dotenv.config();
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true, //access-control-allow-credentials:true
};
// express
const app = express();
// middleware
app.use(express.json({ limit: "100mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static("STATIC"));
// routes
app.use("/dashboard", dashboardRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/hotel", hotelRoutes);
app.use("/room", roomRoutes);
app.use("/room_type", roomTypeRoutes);
app.use("/room_service", roomServiceRoutes);
app.use("/booking", bookingRoutes);
app.use("/expense", expenseRoutes);
app.use("/test", testRoutes);
app.use("/backup", backupRoutes);
app.use("/account", accountRoutes);
app.use("/log", logRoutes);
app.use("/review", reviewRoutes);
app.use("/discount", discountRoutes);
app.use("/combo", comboRoutes);
app.use("/peak_day", peakDayRoutes);

// Pre-create required folder
if (!existsSync("BACKUP")) mkdirSync("BACKUP");

//Connect to DB
const PORT = process.env.PORT;
const CONNECTION_URL = "mongodb://127.0.0.1:27017/qq";
// const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
