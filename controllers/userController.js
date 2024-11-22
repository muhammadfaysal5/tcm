import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import User from "../Models/userModel.js";
import httpStatusCodes from "http-status-codes";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {
  sendEmail,
  generateRandomCode,
  generateRandomToken,
} from "../utils/methods.js";

const registration = async (req, res, next) => {
  const {
    FullName,
    UserName,
    email,
    role,
    password,
  } = req.body;
  console.log(req.body);
  if (
    !FullName ||
    !UserName ||
    !email ||
    !role ||
    !password 
  ) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "All fields are required",
      httpStatusCodes.BAD_REQUEST
    );
  }
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "This User Already Exist",
      httpStatusCodes.BAD_REQUEST
    );
  }

  const user = await User.create({
    FullName,
    UserName,
    email,
    role,
    password,
   
  });
  
  ApiResponse.result(
    res,
    { status: "User Regsitered successfully" },
    httpStatusCodes.OK
  );
};



//login api
const login = async (req, res, next) => {
  const { UserName, password } = req.body;

  if (!UserName || !password) {
    throw new ApiError(
      httpStatusCodes.UNPROCESSABLE_ENTITY,
      "All Fields are Required",
      httpStatusCodes.UNPROCESSABLE_ENTITY
    );
  }
  const isExist = await User.findOne({ UserName });
  if (!isExist) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "Invalid UserName or Password",
      httpStatusCodes.BAD_REQUEST
    );
  }

  const isMatch = await isExist.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "Invalid Email or Password",
      httpStatusCodes.BAD_REQUEST
    );
  }
  const token = isExist.createToken();
  ApiResponse.result(
    res,
    { status: "Login Successfully" },
    httpStatusCodes.OK,
    token,
    isExist,
  );
};
//All admins
const getalladmins = async (req, res, next) => {
  const  admin = await User.find({
      role: "Admin",
    });
  if (!admin?.length) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "No Admin Exist",
      httpStatusCodes.BAD_REQUEST
    );
  }
  ApiResponse.result(res, admin, httpStatusCodes.OK);
};
const currentUser = async (req, res, next) => {
  console.log("hh");
  const userId = req.params;
  console.log(userId);
  //const o_id = new Types.ObjectId({ userId });

  const user = await User.findOne({ _id: userId.id });
  const { password, ...data } = user.toJSON();
  if (!user) {
    throw new ApiError(
      httpStatusCodes.BAD_REQUEST,
      "No user Exist",
      httpStatusCodes.BAD_REQUEST
    );
  }
  ApiResponse.result(res, { user: data }, httpStatusCodes.OK);
};
//Delete User
const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)

  await User.deleteOne( { _id:id.id } );
  ApiResponse.result(res, { status: "User deleted successfully" }, httpStatusCodes.OK);
};
//Update
const updateAdmin = async (req, res, next) => {
  const { FullName, UserName, role } = req.body;
  const userid =req.params
  console.log(userid)

  const updateFields = {};
  if (FullName !== undefined) updateFields.FullName = FullName;
  if (UserName !== undefined) updateFields.UserName = UserName;
  if (role !== undefined) updateFields.role = role;
  console.log(userid)

  await User.updateOne({userid},  {$set:updateFields });

  ApiResponse.result(res, { status: 'User updated successfully' }, httpStatusCodes.OK);
};
const disableAdmin = async (req, res, next) => {
  try {
    const  adminId   = req.params;
     console.log(adminId)
    if (!adminId) {
      throw new ApiError(400, "Admin ID is required");
    }

    const admin = await User.findById({_id:adminId.id});

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    admin.status = "disabled";
    await admin.save();

    ApiResponse.result(res, { status: "Admin disabled successfully", admin }, 200);
  } catch (error) {
    console.error("Error disabling Admin:", error);
    next(new ApiError(500, error.message || "Internal Server Error"));
  }
};

export {
  registration,
  login,
  getalladmins,
  currentUser,
  deleteAdmin,
  updateAdmin,
  disableAdmin,
  
};