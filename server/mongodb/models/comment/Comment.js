import mongoose from "mongoose";

// create comment Schema & model
const CommentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;
