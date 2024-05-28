import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    onModel: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", LikeSchema);
