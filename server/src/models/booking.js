import mongoose from "mongoose";
import { INTEGER } from "../constants/constants.js";

const BookingSchema = mongoose.Schema({
  number: {
    type: Number,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
    unique: false,
  },
  room_list: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    required: true,
  },
  combo_list: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Combo" }],
    required: true,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
    default: null,
    unique: false,
  },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  status: { type: Number, default: INTEGER.BOOKING_IN_PROGRESS },
  adult: { type: Number, required: true },
  kid: { type: Number, required: true },
  baby: { type: Number, required: true },
  effective_from: { type: Date, required: true },
  effective_to: { type: Date, required: true },
  payment_date: { type: Date, required: true },
  reviewed: { type: Boolean, default: false },
  created_date: { type: Date, default: new Date() },
  modified_date: { type: Date, default: new Date() },
});

export default mongoose.model("Booking", BookingSchema);
