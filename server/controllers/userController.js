import User from "../mongodb/models/User.js";
import {transporter} from "../configNodemailer.js";
import Post from "../mongodb/models/Post.js";
import Property from "../mongodb/models/Property.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have an adminId in the request
    if (user.role != "Admin") {
      return res.status(404).json({ message: "You aren't autherized" });
    }

    const users = await User.find({
      $or: [{ role: "Owner" }, { role: "Client" }],
    }).select("-password");
    // // .populate("properties");
    // const clients = await User.find({ role: "" }).select("-password");
    // // .populate("posts");

    // const allUsers = {
    //   owners,
    //   clients,
    // };
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllOwners = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have an adminId in the request
    if (user.role != "Admin") {
      return res.status(404).json({ message: "You aren't autherized" });
    }

    const owners = await User.find({ role: "Owner" }).select("-password");
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllClients = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming you have an adminId in the request

    if (user.role != "Admin") {
      return res.status(404).json({ message: "You aren't autherized" });
    }
    const clients = await User.find({ role: "Client" }).select("-password");
    res.status(201).json(clients);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    // const requestingUserRole = req.user.role;
    
    const user = await User.findById(id).select("-password");
    
    if (user) {
      // if (user.role === "Admin" && requestingUserRole !== "Admin") {
      //   return res.status(403).json({
      //     message: "Access denied. This information is confidential.",
      //   });
      // } else {
        res.status(201).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    }  catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userId, password, ...userData } = req.body;

  if (id !== req.user.id) {
    return res.status(401).json("You can update only your account!");
  }

  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true }
    );

    if (updatedUser) {
      // Generate updated JWT token
      const token = jwt.sign(
        {
          email: updatedUser.email,
          id: updatedUser._id,
          name: updatedUser.name,
          role: updatedUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      return res.status(200).json({
        message: "Your account updated successfully",
        token,
        updatedUser,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// still to check
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found!");
    }

    // Check if the authenticated user is the same user or an admin
    if (user._id.equals(req.user.id) || req.user.role === "Admin") {
      // check this after creating properties and posts
      if (user.role === "Owner") {
        // Delete properties of the owner
        await Property.deleteMany({ creator: { $in: id } });
      } else if (user.role === "Client") {
        // Delete posts of the client
        await Post.deleteMany({ creator: { $in: id } });
      }

      // Delete the user
      await user.deleteOne();

      return res.status(200).json("User has been deleted successfully");
    } else {
      return res.status(401).json("You can delete only your account");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // Update the user's subscribed field to true
    const user = await User.findOneAndUpdate({ email }, { subscribed: true });

    // Send a confirmation email to the subscriber
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email,
      subject: "Subscription Confirmation",
      text: "Thank you for subscribing to our newsletter!",
    };

    await transporter.sendMail(mailOptions);

    // Return a response indicating success
    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Subscription failed" });
  }

};

// const unsubscribeFromNewsletter = async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Update the user's subscribed field to false
//     const user = await User.findOneAndUpdate({ email }, { subscribed: false });

//     // Send an email to confirm unsubscription
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Unsubscription Confirmation",
//       text: "You have been unsubscribed from our newsletter.",
//     };

//     await transporter.sendMail(mailOptions);

//     // Return a response indicating success
//     res.status(200).json({ message: "Unsubscription successful", token });
//   } catch (error) {
//     // Handle any errors
//     res.status(500).json({ message: "Unsubscription failed" });
//   }
// };

const sendNewsletter = async (req, res) => { 
  const { subject, message } = req.body;

   try {
     // Fetch the list of subscribers from your database
    const subscribedUsers = await User.find({ subscribed: true });

     // Send an email to each subscriber
     for (const subscriber of subscribedUsers) {
       const mailOptions = {
         from: process.env.EMAIL_USER,
         to: subscriber.email,
         subject,
         text: message,
       };

       await transporter.sendMail(mailOptions);
     }

     // Return a response indicating success
     res.status(200).json({ message: "Emails sent to subscribers" });
   } catch (error) {
     // Handle any errors
     res.status(500).json({ message: "Failed to send emails" });
   }


};


export {
  getAllUsers,
  getAllOwners,
  getAllClients,
  getUserInfoById,
  updateUser,
  deleteUser,
  subscribeToNewsletter,
  // unsubscribeFromNewsletter,
  sendNewsletter,
};
