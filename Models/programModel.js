import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    programName: {
      type: String,
      required: true,
    },
    programArea: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.model("Program", programSchema);

export default Program;
