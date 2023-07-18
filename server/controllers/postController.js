import Post from "../mongodb/models/Post.js";
import PostComment from "../mongodb/models/comment/PostComment.js"

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const creator = req.user.id; // Assuming the authenticated user is the client

  try {
    // Check if the authenticated user is a Client
    if (req.user.role !== "Client") {
      return res
        .status(403)
        .json({ error: "You are not authorized to create a post" });
    }

    const post = new Post({
      creator,
      title,
      description,
    });

    await post.save();

    res.status(201).json({
      message: "Post created successfully. It is currently inactive.",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create the post" });
  }
};

const getClientPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({ creator: req.user.id }).populate("creator");
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllPosts = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      // Fetch all posts for Admin (active and non-active)
      const allPosts = await Post.find({});
      res.status(200).json(allPosts);
    }
    // else if (req.user.role === "Owner") {
    //   // Fetch only active posts for Owner
    //   const posts = await Post.find({ status: true });
    //   res.status(200).json(posts);
    // } else if (req.user.role === "Client") {
    //   // Fetch all posts of the current client (active and non-active)
    //   const clientPosts = await Post.find({
    //     creator: req.user.id,
    //   });

    //   // Fetch active posts of other clients
    //   const otherClientsPosts = await Post.find({
    //     creator: { $ne: req.user.id },
    //     status: true,
    //   });

    //   const posts = clientPosts.concat(otherClientsPosts);

    //   res.status(200).json(posts);
    // }
    else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getHomePosts = async (req, res) => {
  try {
    // Fetch only active posts and populate the creator field
    const posts = await Post.find({ status: true }).populate("creator", "name");

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      creator: {
        name: post.creator.name,
      },
      createdAt: post.createdAt,
    }));

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostDetail = async (req, res) => {
  try {
     const { id } = req.params;
    const post = await Post.findById(id).populate("creator");
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only allow the post creator to update
    if (post.creator.equals(req.user.id)) {
      const { title, description } = req.body;

      post.set({
        title,
        description,
      });
    } else if (req.user.role === "Admin") {
      // Only allow the admin to update the status
      const { status } = req.body;
      if (status !== undefined) {
        post.status = status;
      }
    } else  {
      return res
        .status(401)
        .json({ message: "You can update only your own posts" });
    }

    const updatedPost = await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only allow the post creator or admin to delete the post
    if (!post.creator.equals(req.user.id) && req.user.role !== "Admin") {
      return res
        .status(401)
        .json({ message: "You can delete only your own posts" });
    }

    await PostComment.deleteMany({ postId: { $in: id } });

    //   Delete the post
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  createPost,
  getClientPosts,
  getAllPosts,
  getHomePosts,
  getPostDetail,
  updatePost,
  deletePost,
};
