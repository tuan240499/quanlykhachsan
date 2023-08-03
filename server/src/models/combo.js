import mongoose from "mongoose";

const ComboSchema = mongoose.Schema({
  name: { type: String, required: true },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
    unique: false,
  },
  amount: { type: Number, required: true },
  detail: { type: String, required: true },
  created_date: { type: Date, default: new Date() },
  modified_date: { type: Date, default: new Date() },
});

export default mongoose.model("Combo", ComboSchema);
