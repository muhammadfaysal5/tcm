import { Router } from "express";
import {
  registration,
  login,
  getalladmins,
  updateAdmin,
  currentUser,
  deleteAdmin,
  disableAdmin,
} from "../controllers/userController.js";
const userRouter = Router();
import asyncHandler from "../utils/AsyncHandler.js";
import userAuth from "../Middleware/tokenAuth.js";

userRouter.post("/registration", asyncHandler(registration));
userRouter.post("/login", asyncHandler(login));
userRouter.put("/updateadmin/:id", userAuth, asyncHandler(updateAdmin));
userRouter.get("/admins",userAuth, asyncHandler(getalladmins));
userRouter.delete("/delete/:id", userAuth, asyncHandler(deleteAdmin));
userRouter.get("/currentuser/:id",userAuth, asyncHandler(currentUser));
userRouter.put("/disable/:id",userAuth, asyncHandler(disableAdmin));

export default userRouter;