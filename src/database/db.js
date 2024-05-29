/*
 * Title: db.js
 * Description : Database connection
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:30:05
 */

import mongoose from "mongoose";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
  } catch (error) {
    return new apiError(500, error.message, [], error.stack);
  }
};

export default connectDB;
