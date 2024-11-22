import Program from "../Models/programModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerProgram = async (req, res, next) => {
  try {
    const { programName, programArea } = req.body;

    if (!programName || !programArea) {
      throw new ApiError(400, "Program name and area are required");
    }

    const program = new Program({ programName, programArea });
    await program.save();

    ApiResponse.result(res, { status: "Program registered successfully", program }, 201);
  } catch (error) {
    console.error("Error registering program:", error);
    next(new ApiError(500, error.message || "Internal Server Error"));
  }
};
const viewAllPrograms = async (req, res, next) => {
    try {
      const programs = await Program.find();
  
      if (!programs.length) {
        throw new ApiError(404, "No Programs Found");
      }
  
      ApiResponse.result(res, programs, 200);
    } catch (error) {
      console.error("Error fetching programs:", error);
      next(new ApiError(500, error.message || "Internal Server Error"));
    }
  };
  const deleteProgram = async (req, res, next) => {
    try {
      const  programId  = req.params;
      console.log(programId)
  
      if (!programId) {
        throw new ApiError(400, "Program ID is required");
      }
  
      const deleted = await Program.findByIdAndDelete({_id:programId.id});
  
      if (!deleted) {
        throw new ApiError(404, "Program not found");
      }
  
      ApiResponse.result(res, { status: "Program deleted successfully" }, 200);
    } catch (error) {
      console.error("Error deleting program:", error);
      next(new ApiError(500, error.message || "Internal Server Error"));
    }
  };
  const disableProgram = async (req, res, next) => {
    try {
      const programId  = req.params;
      console.log(programId)
  
      if (!programId) {
        throw new ApiError(400, "Program ID is required");
      }
  
      const program = await Program.findById({_id:programId.id});
  
      if (!program) {
        throw new ApiError(404, "Program not found");
      }
  
      program.status = "disabled";
      await program.save();
  
      ApiResponse.result(res, { status: "Program disabled successfully", program }, 200);
    } catch (error) {
      console.error("Error disabling program:", error);
      next(new ApiError(500, error.message || "Internal Server Error"));
    }
  };
export{
    registerProgram,
    viewAllPrograms,
    deleteProgram,
    disableProgram,
}      