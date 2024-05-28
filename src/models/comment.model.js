import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: [240, "Comment cannot be more than 240 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    onComment: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    commentAble: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onComment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
