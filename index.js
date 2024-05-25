import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/database/db.js";

// Create Express server
const app = express();

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
