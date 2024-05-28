import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJwt = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new apiError(401, "Unauthorized access");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.json(new apiError(400, err.message || "Invalid token"));
  }
};

export default verifyJwt;
