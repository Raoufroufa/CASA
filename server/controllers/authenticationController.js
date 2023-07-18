import User from "../mongodb/models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

async function registration(req, res) {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
        subscribed: user.subscribed,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    // Create a new user object without the password field
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "User registered successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      // Create a new user object without the password field
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      // Generate JWT token
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
          role: user.role,
          subscribed: user.subscribed,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );
      res.status(200).json({
        message: "Logged in successfully",
        token,
        user: userWithoutPassword,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function logout(req, res) {
  try {
    // Clear the user information from the request object
    req.user = null;

    // Send a success response
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function resetPassword(req, res) {
  const { email, newPassword } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
        subscribed: user.subscribed,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    // Create a new user object without the password field
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      message: "User registered successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export { registration, login, logout, resetPassword };
