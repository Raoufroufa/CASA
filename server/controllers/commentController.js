import PropertyComment from "../mongodb/models/comment/PropertyComment.js";
import PostComment from "../mongodb/models/comment/PostComment.js";
import Comment from "../mongodb/models/comment/Comment.js";
import Post from "../mongodb/models/Post.js";
import Property from "../mongodb/models/Property.js";

// Controller for creating a comment
const createComment = async (req, res) => {
  try {
    const creator = req.user.id;
    const { text, targetId } = req.body;

    let comment;

    // Check if the ID exists in both Post and Property collections
    const isPost = await Post.exists({ _id: targetId });

    const isProperty = await Property.exists({ _id: targetId });

    if (isPost) {
      // Create a new comment instance for a post
      comment = new PostComment({
        creator,
        text,
        postId: targetId,
      });
    } else if (isProperty) {
      // Create a new comment instance for a property
      comment = new PropertyComment({
        creator,
        text,
        propertyId: targetId,
      });
    } else {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Save the comment to the database
    await comment.save();

    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    console.error("Failed to create comment:", error);
    res.status(500).json({ message: err.message });
  }
};

const getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;

  try {
    // Retrieve comments using the PostComment discriminator model
    const comments = await PostComment.find({ postId }).populate("creator");

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      text: comment.text,
      creator: {
        id: comment.creator._id,
        name: comment.creator.name,
      },
      createdAt: comment.createdAt,
    })
    );
    

    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentsByPropertyId = async (req, res) => {
  const propertyId = req.params.id;

  try {
    // Retrieve comments using the PostComment discriminator model
    const comments = await PropertyComment.find({ propertyId }).populate(
      "creator"
    );

    const formattedComments = comments.map((comment) => ({
      _id: comment._id,
      text: comment.text,
      creator: {
        id: comment.creator._id,
        name: comment.creator.name,
      },
      createdAt: comment.createdAt,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a comment with his replies
// const getCommentWithReplies = async (req, res) => {
//   try {
//     const commentId = req.params.id;

//     // Find the comment by its ID
//     const comment = await Comment.findById(commentId);

//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Find the replies for the comment
//     const replies = await Comment.find({ parentCommentId: commentId });

//     res.status(200).json({ comment, replies });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Controller for getting all comments
// const getAllComments = async (req, res) => {
//   try {
//     // Fetch all comments
//     const comments = await Comment.find({});

//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// Controller for comment's creator to update his comment status
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the creator of the comment
    if (!comment.creator.equals(req.user.id)) {
      return res
        .status(401)
        .json({ message: "You can update only your own comment" });
    }

    comment.text = text;
    const updatedComment = await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller for comment's creator or Admin to delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the comment by commentId
    const comment = await Comment.findById(id);
    

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the authenticated user is the comment creator or an admin
    if (!comment.creator.equals(req.user.id) && req.user.role !== "Admin") {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Delete the main comment
    await comment.deleteOne();

    res
      .status(200)
      .json({ message: "Comment  deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createComment,
  getCommentsByPostId,
  getCommentsByPropertyId,
  // getCommentWithReplies,
  // getAllComments,
  updateComment,
  deleteComment,
};
