/*
 * Title: message.route.js
 * Description : Message routes
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:29:07
 */

import express from "express";
import verifyJwt from "../middlewares/verify.middleware.js";
import {
  createDirectMessage,
  deleteDirectMessage,
  getDirectMessages,
} from "../controllers/directMessage.controller.js";

const router = express.Router();

router.post("/send-message", verifyJwt, createDirectMessage);

router.delete("/delete-message/:id", verifyJwt, deleteDirectMessage);

router.get("/get-messages", verifyJwt, getDirectMessages);

export default router;
