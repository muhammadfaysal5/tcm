import {Router} from "express";
import {
  registerProgram,
  viewAllPrograms,
  deleteProgram,
  disableProgram,
} from "../controllers/programController.js";
import userAuth from "../Middleware/tokenAuth.js";

const programrouter = Router();
import asyncHandler from "../utils/AsyncHandler.js";
// Register a new program
programrouter.post("/register_program",userAuth, asyncHandler(registerProgram));

// View all programs
programrouter.get("/view_all_programs",userAuth, asyncHandler(viewAllPrograms));

// Delete a program
programrouter.delete("/delete_program/:id",userAuth, asyncHandler(deleteProgram));

// Disable a program
programrouter.put("/disable_program/:id",userAuth, disableProgram);

export default programrouter;
