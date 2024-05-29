/*
 * Title: follow.route.js
 * Description : Follow routes
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:29:23
 */

import express from "express";
import verifyJwt from "../middlewares/verify.middleware.js";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../controllers/follow.controller.js";

const router = express.Router();

router.post("/follow/:id", verifyJwt, followUser);

router.post("/unfollow/:id", verifyJwt, unfollowUser);

router.get("/followers/:id", verifyJwt, getFollowers);

router.get("/following/:id", verifyJwt, getFollowing);

export default router;
