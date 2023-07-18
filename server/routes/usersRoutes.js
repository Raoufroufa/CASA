import express from "express";

import {
  getAllUsers,
  getAllOwners,
  getAllClients,
  getUserInfoById,
  updateUser,
  deleteUser,
  subscribeToNewsletter,
  // unsubscribeFromNewsletter,
} from "../controllers/userController.js";

const router = express.Router();

// Admin get all users(Owners & Clients), all Owners and all Clients
router.route("/").get(getAllUsers);
router.route("/owners").get(getAllOwners);
router.route("/clients").get(getAllClients);

// User (Admin, Owner or Client) get user information, update user or delete user
router.route("/:id")
    .get(getUserInfoById)
    .patch(updateUser)
    .delete(deleteUser);

router.route("/subscribe").post(subscribeToNewsletter);

// router.route("/unsubscribe").post(unsubscribeFromNewsletter);


    
export default router;
