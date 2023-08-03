import mongoose from "mongoose";

const UserUseDiscountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount",
    required: true,
    unique: false,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
});

UserUseDiscountSchema.index({ user: 1, discount: 1 }, { unique: true });

export default mongoose.model("UserUseDiscount", UserUseDiscountSchema);
