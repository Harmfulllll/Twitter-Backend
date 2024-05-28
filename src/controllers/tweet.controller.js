import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import tweetModel from "../models/tweet.model.js";
import retweetModel from "../models/retweet.model.js";
import commentModel from "../models/comment.model.js";
import likeModel from "../models/like.model.js";

const createTweet = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json(new apiError(400, "Write something..."));
    }
    const newTweet = await tweetModel.create({
      content,
      user: req.user._id,
    });
    return res
      .status(201)
      .json(new apiResponse(201, newTweet, "Tweet created"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const deleteTweet = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(401).json(new apiError(401, "No id specified"));
  }
  const findTweet = await tweetModel.findById({ _id: id });
  if (!findTweet) {
    return res.status(404).jsoon(new apiError(404, "No tweet found"));
  }
  await tweetModel.deleteOne({ _id: id });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "Tweet has been deleted"));
};

const getTweets = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const tweets = await tweetModel
      .aggregate([
        {
          $match: {
            user: req.user._id,
          },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return res.status(200).json(new apiResponse(200, tweets, "Tweets fetched"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const getTweet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const tweet = await tweetModel.findById({
      _id: id,
    });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const retweet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const tweet = await tweetModel.findById({ _id: id });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
    const retweet = await retweetModel.create({
      user: req.user._id,
      retweetable: id,
      onRetweet: "Tweet",
    });
    return res.status(200).json(new apiResponse(200, retweet, "Retweeted"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export { createTweet, deleteTweet, getTweets, getTweet, retweet };
