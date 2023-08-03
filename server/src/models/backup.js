import mongoose from "mongoose";

const BackupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: { type: String, required: true },
  detail: { type: String, required: true },
  last_using: { type: Date, default: new Date() },
  created_date: { type: Date, default: new Date() },
});

export default mongoose.model("Backup", BackupSchema);
