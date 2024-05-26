import mongoose from "mongoose";

const retweetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Retweet", retweetSchema);
