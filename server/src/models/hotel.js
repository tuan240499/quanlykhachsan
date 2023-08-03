import mongoose from "mongoose";

const HotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  size: { type: Number, required: true },
  numberOfRooms: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  services: { type: [Number], required: true },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  modifiedDate: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Hotel", HotelSchema);
