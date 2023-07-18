import mongoose from "mongoose";
import commentModel from "./Comment.js";

const PostComment = commentModel.discriminator(
  "PostComment",
  new mongoose.Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  })
);

export default PostComment;
