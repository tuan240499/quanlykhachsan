import mongoose from "mongoose";

const RoomServiceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "charm:circle-tick",
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

export default mongoose.model("RoomService", RoomServiceSchema);
