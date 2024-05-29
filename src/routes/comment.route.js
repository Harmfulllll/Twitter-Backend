/*
 * Title: comment.route.js
 * Description : Comment routes
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:29:35
 */

import express from "express";
import verifyJwt from "../middlewares/verify.middleware.js";
import {
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create-comment", verifyJwt, createComment);

router.delete("/delete-comment/:id", verifyJwt, deleteComment);

router.post("like-comment/:id", verifyJwt, likeComment);

router.delete("unlike-comment/:id", verifyJwt, unlikeComment);

export default router;
