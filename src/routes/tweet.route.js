/*
 * Title: tweet.route.js
 * Description : Tweet routes
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:28:56
 */

import express from "express";
import verifyJwt from "../middlewares/verify.middleware.js";
import {
  createTweet,
  deleteTweet,
  getTweet,
  getTweets,
  retweet,
} from "../controllers/tweet.controller.js";
import {
  likeTweet,
  totaLikes,
  unlikeTweet,
} from "../controllers/like.controller.js";
import { totalComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-tweet", verifyJwt, createTweet);

router.delete("/delete-tweet/:id", verifyJwt, deleteTweet);

router.get("/get-tweets", verifyJwt, getTweets);

router.get("/get-tweet/:id", verifyJwt, getTweet);

router.post("/retweet/:id", verifyJwt, retweet);

router.post("/like-tweet/:id", verifyJwt, likeTweet);

router.delete("/unlike-tweet/:id", verifyJwt, unlikeTweet);

router.get("/total-likes/:id", verifyJwt, totaLikes);

router.get("total-comments/:id", verifyJwt, totalComments);

export default router;
