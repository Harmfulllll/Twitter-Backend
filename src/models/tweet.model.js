import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [280, "Tweet cannot be more than 280 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);
