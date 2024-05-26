import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: [3, "Username must be at least 3 characters"],
      max: [20, "Username cannot be more than 20 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      min: [6, "Password must be at least 6 characters"],
    },
    profilePic: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      max: [160, "Bio cannot be more than 160 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
