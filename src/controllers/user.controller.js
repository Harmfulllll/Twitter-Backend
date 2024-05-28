import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import upload from "../middlewares/multer.middleware.js";

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (
      [username, email, fullname, password].some((field) => {
        field?.trim() === "";
      })
    ) {
      return res.status(400).json(new apiError(400, "All fields are required"));
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json(new apiError(400, "User already exists"));
    }
    const profilePicture = req.files?.profilePic[0]?.path;
    const uploadedImage = await cloudinary(profilePicture);

    const savedUser = await User.create({
      username,
      email,
      password,
      profilePic: uploadedImage?.url || "",
    });
    savedUser.password = undefined;
    return res.status(201).json(new apiResponse(201, savedUser));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(new apiError(400, "All fields are required"));
  }
  const findUser = await User.findOne({ username });
  if (!findUser) {
    return res.status(400).json(new apiError(400, "User not found"));
  }
  if (!(await findUser.isPasswordMatch(password))) {
    return res.status(400).json(new apiError(400, "Invalid credentials"));
  }
  const token = await findUser.generateToken();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        { username: findUser.username, email: findUser.email, token },
        "Login successful"
      )
    );
};

const logout = async (req, res) => {
  req.user.tokens = req.user.tokens.filter(
    (token) => token.token !== req.token
  );
  return res.status(200).json(new apiResponse(200, {}, "Logout successful"));
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json(new apiError(400, "All fields are required"));
    }
    const user = await User.findById(req.user._id);
    if (!(await user.isPasswordMatch(oldPassword))) {
      return res.status(400).json(new apiError(400, "Invalid credentials"));
    }
    req.user.password = newPassword;
    await req.user.save();
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;
    if (!bio) {
      return res.status(400).json(new apiError(400, "Data is required"));
    }
    req.user.bio = bio;
    await req.user.save();
    return res
      .status(200)
      .json(new apiResponse(200, { bio }, "Bio updated successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new apiError(500, error.message || "Something went wrong"));
  }
};

const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json(new apiError(404, "User not found"));
    }
    return res
      .status(200)
      .json(new apiResponse(200, user, "User data fetched successfully"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export { register, login, logout, changePassword, updateBio, getProfile };
