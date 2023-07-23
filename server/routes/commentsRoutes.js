import express from "express";

import {
  createComment,
  getCommentsByPostId,
  getCommentsByPropertyId,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

import auth from "../middlewares/authentication.js";

const router = express.Router();

// user get post's comments
router.route("/post/:id").get(getCommentsByPostId);

// user get property's comments
router.route("/property/:id").get(getCommentsByPropertyId);

// user creates a comment
router.route("/addcomment").post(auth, createComment);


router
  .route("/:id")
  // comment's Creator update its comment status
  .patch(auth, updateComment)
  // Creator or Admin can delete a comment
  .delete(auth, deleteComment);


export default router;
