/*
 * Title: index.js
 * Description : Entry point for the application
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-29 11:20:53
 */

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDB from "./src/database/db.js";

// Create Express server
const app = express();

// Security settings
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Import routes
import userRoutes from "./src/routes/user.route.js";
import tweetRoutes from "./src/routes/tweet.route.js";
import followRoutes from "./src/routes/follow.route.js";
import messageRoutes from "./src/routes/message.route.js";
import commentRoutes from "./src/routes/comment.route.js";

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/tweet", tweetRoutes);
app.use("/api/v1/user/follow", followRoutes);
app.use("/api/v1/user/message", messageRoutes);
app.use("/api/v1/user/comment", commentRoutes);

// Connect to the database
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
