import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import tweetModel from "../models/tweet.model.js";
import followModel from "../models/follow.model.js";

const getTimeline = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const following = await followModel.find({ follower: req.user._id });
    const followingIds = following.map((follow) => follow.following);
    const tweets = await tweetModel
      .aggregate([
        {
          $match: {
            user: { $in: followingIds },
          },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return res
      .status(200)
      .json(new apiResponse(200, tweets, "Timeline fetched"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export { getTimeline };
