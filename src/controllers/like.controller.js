/*
 * Title: like.controller.js
 * Description : Like controller
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:32:00
 */

import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import tweetModel from "../models/tweet.model.js";
import retweetModel from "../models/retweet.model.js";
import commentModel from "../models/comment.model.js";
import likeModel from "../models/like.model.js";

const likeTweet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const tweet = await tweetModel.findById({ _id: id });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
    const like = await likeModel.findOne({
      user: req.user._id,
      likeable: id,
      onLike: "Tweet",
    });

    await tweetModel.findByIdAndUpdate(id, {
      $push: { likes: like._id },
    });
    return res.status(200).json(new apiResponse(200, tweet, "Tweet liked"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const tweet = await tweetModel.findById({ _id: id });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
    const like = await likeModel.findOne({
      user: req.user._id,
      likeable: id,
      onLike: "Tweet",
    });
    if (!like) {
      return res.status(404).json(new apiError(404, "Tweet is not liked"));
    }
    await like.deleteOne({ _id: like._id });

    await tweet.findByIdAndUpdate(id, {
      $pull: { likes: like._id },
    });

    return res.status(200).json(new apiResponse(200, tweet, "Tweet unliked"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const totaLikes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const tweet = await tweetModel.findById({ _id: id });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
    const totalLikes = await likeModel
      .find({ likeable: id, onLike: "Tweet" })
      .countDocuments();

    return res
      .status(200)
      .json(new apiResponse(200, totalLikes, "Total likes"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export { likeTweet, unlikeTweet, totaLikes };
