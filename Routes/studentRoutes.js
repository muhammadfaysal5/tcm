import {Router} from "express";
import {
  registerStudent,
  viewAllStudents,
  deleteStudent,
  disableStudent,
} from "../controllers/studentController.js";
import userAuth from "../Middleware/tokenAuth.js";

const StudentRouter = Router();
import asyncHandler from "../utils/AsyncHandler.js";

// Register a new student
StudentRouter.post("/register_students",userAuth, asyncHandler(registerStudent));

// View all students
StudentRouter.get("/view_all_students",userAuth, asyncHandler(viewAllStudents));

// Delete a student
StudentRouter.delete("/delete_students/:id",userAuth, asyncHandler(deleteStudent));

// Disable a student
StudentRouter.put("/disable_students/:id",userAuth, disableStudent);

export default StudentRouter;
