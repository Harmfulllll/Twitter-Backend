/*
 * Title: comment.controller.js
 * Description : Comment controller
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:32:30
 */

import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import tweetModel from "../models/tweet.model.js";
import retweetModel from "../models/retweet.model.js";
import commentModel from "../models/comment.model.js";
import likeModel from "../models/like.model.js";

const createComment = async (req, res) => {
  try {
    const { content, tweetId } = req.body;
    if (!content) {
      return res.status(400).json(new apiError(400, "Write something..."));
    }
    const tweet = await tweetModel.findById({ _id: tweetId });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
    const newComment = await commentModel.create({
      content,
      user: req.user._id,
      onComment: "Tweet",
      commentAble: tweetId,
    });
    await tweetModel.findByIdAndUpdate(
      {
        _id: tweetId,
      },
      {
        $push: { comments: newComment._id },
      }
    );
    return res
      .status(201)
      .json(new apiResponse(201, newComment, "Comment created"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const comment = await commentModel.findById({ _id: id });
    if (!comment) {
      return res.status(404).json(new apiError(404, "No comment found"));
    }
    await commentModel.deleteOne({ _id: id });
    await tweetModel.findByIdAndUpdate(
      {
        _id: comment.commentAble,
      },
      {
        $pull: { comments: comment._id },
      }
    );
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Comment has been deleted"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const comment = await commentModel.findById({ _id: id });
    if (!comment) {
      return res.status(404).json(new apiError(404, "No comment found"));
    }
    const like = await likeModel.create({
      user: req.user._id,
      likeable: id,
      onLike: "Comment",
    });
    return res.status(200).json(new apiResponse(200, like, "Comment liked"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const unlikeComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const comment = await commentModel.findById({ _id: id });
    if (!comment) {
      return res.status(404).json(new apiError(404, "No comment found"));
    }
    const like = await likeModel.findOne({
      user: req.user._id,
      likeable: id,
      onLike: "Comment",
    });
    if (!like) {
      return res.status(404).json(new apiError(404, "Comment is not liked"));
    }
    await like.deleteOne({ _id: like._id });
    return res.status(200).json(new apiResponse(200, {}, "Comment unliked"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const totalComments = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const tweet = await tweetModel.findById({ _id: id });
    if (!tweet) {
      return res.status(404).json(new apiError(404, "No tweet found"));
    }
    const comments = await commentModel
      .find({
        commentAble: id,
        onComment: "Tweet",
      })
      .countDocuments();

    return res
      .status(200)
      .json(new apiResponse(200, comments, "Total comments"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

export {
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
  totalComments,
};
