import mongoose from "mongoose";
import { INTEGER } from "../constants/constants.js";

const ReviewSchema = mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: Number, default: INTEGER.REVIEW_WAITING },
  overallScore: { type: Number, required: true },
  cleanScore: { type: Number, required: true },
  locationScore: { type: Number, required: true },
  valueScore: { type: Number, required: true },
  serviceScore: { type: Number, required: true },
  facilityScore: { type: Number, required: true },
  up_vote: { type: Number, default: 0 },
  down_vote: { type: Number, default: 0 },
  created_date: {
    type: Date,
    default: new Date(),
  },
});

ReviewSchema.index({ booking: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
