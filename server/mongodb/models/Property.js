import mongoose from "mongoose";

// create property Schema & model
const PropertySchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    wilaya: {
      type: String,
      required: true,
    },
    commune: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Flatsharing", "Renting"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    contractType: {
      type: String,
      enum: ["Annuel", "Mensuel"],
      required: true,
    },
    photos: [
      {
        type: String,
        // required: true,
        default: "",
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const propertyModel = mongoose.model("Property", PropertySchema);

export default propertyModel;
