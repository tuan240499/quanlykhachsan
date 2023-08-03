import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
    unique: false,
  },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  created_date: { type: Date, default: new Date() },
  modified_date: { type: Date, default: new Date() },
});

export default mongoose.model("Expense", ExpenseSchema);
