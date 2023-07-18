import express from "express";

import {
  createComment,
  getCommentsByPostId,
  getCommentsByPropertyId,
  // getCommentWithReplies,
  // getAllComments,
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


  // Admin, Owner & Client get all comments 
// router.route("/").get(getAllComments);

  




// // Admin, Owner & Client get all comments for a property
// router.route("/property/").get(getAllPropertyComments);

// // Admin get and delete a comment for a post 
// router
//   .route("/post/:id")
//   .get(getPostCommentDetail)
//   .delete(deletePostComment);

// // Admin get and delete a comment for a property
// router
//   .route("/property/:id")
//   .get(getPropertyCommentDetail)
//   .delete(deletePropertyComment);    

// // Owner and Client can create, update, delete and get a comment for a post 
// router
//   .route("/post/:id")
//   .get(getPostntDetail)
//   .post(createPostComment)
//   .patch(updatePostComment)
//   .delete(deletePostComment);

// // Owner and Client can create, update, delete and get a comment for a property  
// router
//   .route("/property/:id")
//   .get(getPropertyCommentDetail)
//   .post(createPropertyComment)
//   .patch(updatePropertyComment)
//   .delete(deletePropertyComment);


export default router;
