/*
 * Title: user.route.js
 * Description : User routes
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:28:35
 */

import express from "express";
import upload from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/verify.middleware.js";
import {
  changePassword,
  getProfile,
  login,
  logout,
  register,
  updateBio,
} from "../controllers/user.controller.js";
import { name } from "ejs";

const router = express.Router();

router
  .route("/register")
  .post(upload.fields([{ name: "profilePic", maxCount: 1 }]), register);

router.post("/login", login);

router.post("/logout", verifyJwt, logout);

router.get("/get-user", verifyJwt, getProfile);

router.put("/update-bio", verifyJwt, updateBio);

router.patch("/update-password", verifyJwt, changePassword);

export default router;
