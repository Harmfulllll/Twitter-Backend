import express from "express";
import verifyJwt from "../middlewares/verify.middleware.js";
import { getTimeline } from "../controllers/timeline.controller.js";

const router = express.Router();

router.get("/", verifyJwt, getTimeline);

export default router;
