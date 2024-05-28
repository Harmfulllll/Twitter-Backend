import mongoose from "mongoose";

const retweetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    onRetweet: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    retweetable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onRetweet",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Retweet", retweetSchema);
