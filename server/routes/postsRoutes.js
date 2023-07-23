import express from "express";

import {
  getAllPosts,
  getHomePosts,
  getClientPosts,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

import auth from "../middlewares/authentication.js";

const router = express.Router();

router
  .route("/")
  // Client create a post
  .post(auth, createPost)
  // Admin get all the posts that are active and not currently active.
  .get(auth, getAllPosts);

// Fetch all the posts that are active and not currently active for the client who created these posts
router.route("/yours").get(auth, getClientPosts);

// Fetch all the posts that are active on home page
router.route("/home").get(getHomePosts);

router
  .route("/:id")
  // Admin, Owner and Client  get a post details
  .get(getPostDetail)
  //update a post details
  .patch(auth, updatePost)
  //Admin and Client delete a post
  .delete(auth, deletePost);



export default router;
