import followModel from "../models/follow.model.js";
import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const followUser = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json(new apiError(400, "No user id specified"));
    }
    if (userid === req.user._id) {
      return res
        .status(400)
        .json(new apiError(400, "You can't follow yourself"));
    }
    const userExist = await userModel.findById({ _id: userid });
    if (!userExist) {
      return res.status(404).json(new apiError(404, "No user found"));
    }
    const isFollowing = await followModel.findOne({
      follower: userid,
      following: req.user._id,
    });
    if (isFollowing) {
      return res
        .status(400)
        .json(new apiError(400, "You are already following this user"));
    }
    const follow = await followModel.create({
      follower: userid,
      following: req.user._id,
    });
    return res
      .status(201)
      .json(new apiResponse(201, { userExist }, "User followed"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userid } = req.params;
    if (!userid) {
      return res.status(400).json(new apiError(400, "No user id specified"));
    }
    if (userid === req.user._id) {
      return res
        .status(400)
        .json(new apiError(400, "You can't unfollow yourself"));
    }
    const userExist = await userModel.findById({ _id: userid });
    if (!userExist) {
      return res.status(404).json(new apiError(404, "No user found"));
    }
    const isFollowing = await followModel.findOne({
      follower: userid,
      following: req.user._id,
    });
    if (!isFollowing) {
      return res
        .status(400)
        .json(new apiError(400, "You are not following this user"));
    }
    await followModel.deleteOne({
      follower: userid,
      following: req.user._id,
    });
    return res
      .status(200)
      .json(new apiResponse(200, { userExist }, "User unfollowed"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const getFollowers = async (req, res) => {
  try {
    const userid = req.user._id;
    const followers = await followModel.aggregate([
      {
        $match: {
          follower: userid,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $project: {
          _id: 0,
          followers: 1,
        },
      },
    ]);
    return res
      .status(200)
      .json(new apiResponse(200, followers, "Followers fetched"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const getFollowing = async (req, res) => {
  try {
    const userid = req.user._id;
    const following = await followModel.aggregate([
      {
        $match: {
          following: userid,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "follower",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $project: {
          _id: 0,
          following: 1,
        },
      },
    ]);
    return res
      .status(200)
      .json(new apiResponse(200, following, "Following fetched"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};
export { followUser, unfollowUser, getFollowers, getFollowing };
