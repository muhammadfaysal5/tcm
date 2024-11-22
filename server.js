import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/dbconnection.js";
import * as ErrorHandler from "./Middleware/errorHandler.js";
const app = express();
//routes
import userRoutes from "./Routes/userRoutes.js";
import programrouter from "./Routes/programRoutes.js";
import StudentRouter from "./Routes/studentRoutes.js"

app.use(express.json());

app.use(cors({
  origin: '*', // Allows requests from any origin
}));

app.get("/", (req, re) => {
  console.log("Hello welcome to the kummon")
  res.send("welcome to kummon xyz")
});

app.use("/api", userRoutes);
app.use("/api", programrouter);
app.use("/api", StudentRouter);
//error handler
app.use(ErrorHandler.notFoundErrorHandler);
app.use(ErrorHandler.errorHandler);

const PORT = process.env.PORT || 8000;
connectDB();
app.listen(PORT, () => {
  console.log("------------------------------------------------");
  console.log(`Status: Running`);
  console.log(`Listening to Port: ${PORT}`);
  console.log("-----------------------------------------------");
});