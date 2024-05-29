/*
 * Title: directMessage.controller.js
 * Description : Direct Message controller
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:32:19
 */

import directMessage from "../models/directMessage.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import followModel from "../models/follow.model.js";

const createDirectMessage = async (req, res) => {
  try {
    const { message, receiver } = req.body;
    if (!message || !receiver) {
      return res.status(400).json(new apiError(400, "Write something..."));
    }
    const isFollowing = await followModel.findOne({
      follower: req.user._id,
      following: receiver,
    });
    const isFollowed = await followModel.findOne({
      follower: receiver,
      following: req.user._id,
    });

    if (!isFollowing || !isFollowed) {
      return res
        .status(400)
        .json(
          new apiError(400, "You must follow each other to send a message")
        );
    }
    const newDirectMessage = await directMessage.create({
      message,
      sender: req.user._id,
      receiver,
    });
    return res
      .status(201)
      .json(new apiResponse(201, newDirectMessage, "Direct Message sent"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const deleteDirectMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(401).json(new apiError(401, "No id specified"));
    }
    const directMessage = await directMessage.findById({ _id: id });
    if (!directMessage) {
      return res.status(404).json(new apiError(404, "No message found"));
    }
    await directMessage.deleteOne({ _id: id });
    return res
      .status(200)
      .json(new apiResponse(200, {}, "Message has been deleted"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};

const getDirectMessages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const { userid } = req.params;
    const directMessages = await directMessage
      .aggregate([
        {
          $match: {
            sender: req.user._id,
          },
        },
        {
          $match: {
            receiver: userid,
          },
        },
      ])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    return res
      .status(200)
      .json(new apiResponse(200, directMessages, "Messages fetched"));
  } catch (error) {
    return res.status(500).json(new apiError(500, error.message));
  }
};
export { createDirectMessage, deleteDirectMessage, getDirectMessages };
