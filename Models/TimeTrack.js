import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "KUMON", require: true },
    checkin: { type: Date, default: Date.now() },
    checkout: { type: Date },
    status: {
      type: String,
      enum: ["CHECKIN", "READY_TO_CHECKOUT"],
      default: "CHECKIN",
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("TimeTrackr", userSchema);
