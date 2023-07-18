import User from "../mongodb/models/User.js";

import Post from "../mongodb/models/Post.js";
import Property from "../mongodb/models/Property.js";

const getDashboardCounts = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const clients = await User.countDocuments({ role: "Client" });
      const owners = await User.countDocuments({ role: "Owner" });
      const users = clients + owners;

      const properties = await Property.countDocuments();
      const activeProperties = await Property.countDocuments({
        status: true,
      });
      const inactiveProperties = await Property.countDocuments({
        status: false,
      });
      const rentingProperties = await Property.countDocuments({ category: "Renting" });
      const flatsharingProperties = await Property.countDocuments({ category: "Flatsharing" });

      const posts = await Post.countDocuments();
      const activePosts = await Post.countDocuments({ status: true });
      const inactivePosts = await Post.countDocuments({
        status: false,
      });

      res.status(200).json({
        clients,
        owners,
        users,
        properties,
        activeProperties,
        inactiveProperties,
        rentingProperties,
        flatsharingProperties,
        posts,
        activePosts,
        inactivePosts,
      });
    } else {
      return res.status(404).json({ message: "You aren't autherized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve dashboard counts" });
  }
};

export {getDashboardCounts}
