import { hash } from "bcrypt";
import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [280, "Tweet cannot be more than 280 characters"],
    },
    hashtags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hashtag",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);
