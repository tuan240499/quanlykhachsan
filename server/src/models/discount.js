import mongoose from "mongoose";
import { INTEGER } from "../constants/constants.js";

const DiscountSchema = mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: Number, default: INTEGER.AMOUNT_DISCOUNT },
  value: { type: Number, required: true },
  quantity: { type: Number, required: true },
  pricing_condition: { type: Number, default: 0 },
  effective_from: { type: Date, required: true },
  effective_to: { type: Date, required: true },
  created_date: {
    type: Date,
    default: new Date(),
  },
  modified_date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Discount", DiscountSchema);
