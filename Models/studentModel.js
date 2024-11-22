import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
    program: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    maxTime: {
      type: Number, // Maximum time in hours or any unit
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
