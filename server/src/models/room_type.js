import mongoose from "mongoose";

const RoomTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
    unique: false,
  },
  rent_bill: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    required: true,
  },
  bed_number: {
    type: Number,
    default: 0,
  },
  big_bed_number: {
    type: Number,
    default: 0,
  },
  adult: {
    type: Number,
    default: 1,
  },
  kid: {
    type: Number,
    default: 0,
  },
  services: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoomService" }],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  created_date: {
    type: Date,
    default: new Date(),
  },
  modified_date: {
    type: Date,
    default: new Date(),
  },
});

RoomTypeSchema.index({ name: 1, hotel: 1 }, { unique: true });

export default mongoose.model("RoomType", RoomTypeSchema);
