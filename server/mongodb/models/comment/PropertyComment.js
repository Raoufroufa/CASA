import mongoose from "mongoose";
import commentModel from "./Comment.js";

const PropertyComment = commentModel.discriminator(
  "PropertyComment",
  new mongoose.Schema({
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  })
);

export default PropertyComment;
