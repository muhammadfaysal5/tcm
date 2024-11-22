import Student from "../Models/studentModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerStudent = async (req, res, next) => {
  try {
    const { fullName, userName, program, studentId, maxTime, startDate } = req.body;

    if (!fullName || !userName || !program || !studentId || !maxTime || !startDate) {
      throw new ApiError(400, "All fields are required");
    }

    const student = new Student({
      fullName,
      userName,
      program,
      studentId,
      maxTime,
      startDate,
    });
    await student.save();

    ApiResponse.result(res, { status: "Student registered successfully", student }, 201);
  } catch (error) {
    console.error("Error registering student:", error);
    next(new ApiError(500, error.message || "Internal Server Error"));
  }
};
const viewAllStudents = async (req, res, next) => {
    try {
      const students = await Student.find();
  
      if (!students.length) {
        throw new ApiError(404, "No Students Found");
      }
  
      ApiResponse.result(res, students, 200);
    } catch (error) {
      console.error("Error fetching students:", error);
      next(new ApiError(500, error.message || "Internal Server Error"));
    }
  };
  const deleteStudent = async (req, res, next) => {
    try {
      const studentId  = req.params;
  
      if (!studentId) {
        throw new ApiError(400, "Student ID is required");
      }
  
      const deleted = await Student.findOneAndDelete({_id: studentId.id });
  
      if (!deleted) {
        throw new ApiError(404, "Student not found");
      }
  
      ApiResponse.result(res, { status: "Student deleted successfully" }, 200);
    } catch (error) {
      console.error("Error deleting student:", error);
      next(new ApiError(500, error.message || "Internal Server Error"));
    }
  };
  const disableStudent = async (req, res, next) => {
    try {
      const  studentId  = req.params;
      console.log(studentId)
  
      if (!studentId) {
        throw new ApiError(400, "Student ID is required");
      }
  
      const student = await Student.findOne({_id: studentId.id });
  
      if (!student) {
        throw new ApiError(404, "Student not found");
      }
  
      student.status = "disabled";
      await student.save();
  
      ApiResponse.result(res, { status: "Student disabled successfully", student }, 200);
    } catch (error) {
      console.error("Error disabling student:", error);
      next(new ApiError(500, error.message || "Internal Server Error"));
    }
  };
export {
    registerStudent,
    viewAllStudents,
    deleteStudent,
    disableStudent
}      