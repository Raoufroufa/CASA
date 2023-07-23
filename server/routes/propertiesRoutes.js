import express from "express";


import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getPropertyDetail,
  updateProperty,
  getOwnerProperties,
  getHomeProperties,
  getFlatsharingProperties,
  getRentingProperties,
} from "../controllers/propertyController.js";

import auth from "../middlewares/authentication.js";

const router = express.Router();

router
  .route("/")
  // Owner create a property
  .post(auth, createProperty) // Add the upload middleware here
  // Admin  get all the properties that are active and not currently active.
  .get(auth, getAllProperties);

// Fetch all the properties that are active and not currently active for the owner who created these properties
router.route("/yours").get(auth, getOwnerProperties);

// Fetch all the properties that are active on home page
router.route("/home").get(getHomeProperties);


// Fetch all renting properties that are active on home page
router.get("/renting", getRentingProperties);

// Fetch all flatsharing properties that are active on home page
router.get("/flatsharing", getFlatsharingProperties);

router
  .route("/:id")
  // Admin, Owner and Client  get a property details
  .get(getPropertyDetail)
  //Owner updates a property
  .patch(auth, updateProperty)
  //Admin and Owner delete a property
  .delete(auth, deleteProperty);


export default router;
