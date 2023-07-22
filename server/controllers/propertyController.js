import Property from "../mongodb/models/Property.js";
import PropertyComment from "../mongodb/models/comment/PropertyComment.js";
import { transporter } from "../configNodemailer.js";

import * as dotenv from "dotenv";
dotenv.config();


const createProperty = async (req, res) => {
  const {
    title,
    description,
    location,
    category,
    wilaya,
    commune,
    price,
    contractType,
    photos,
  } = req.body;
  const creator = req.user.id; // Assuming the authenticated user is the Owner
  const email = req.user.email;

  try {
    // Check if the authenticated user is an Owner
    if (req.user.role !== "Owner") {
      return res
        .status(403)
        .json({ error: "You are not authorized to create a property" });
    }

    const property = new Property({
      creator,
      title,
      description,
      location,
      wilaya,
      commune,
      category,
      price,
      contractType,
      photos,
    });

    await property.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirmation de création",
      text: "Propriété créée avec succès. Il est actuellement inactif.",
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Property created successfully. It is currently inactive.",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create the property" });
  }
};

const getOwnerProperties = async (req, res) => {
  try {
    const allProperties = await Property.find({
      creator: req.user.id,
    }).populate("creator");
    res.status(200).json(allProperties);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllProperties = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      // Fetch all properties for Admin (active and non-active)
      const properties = await Property.find({}).populate("creator", "name");
      res.status(200).json(properties);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getHomeProperties = async (req, res) => {
  const filter = { status: true };
  req.query.category && (filter.category = req.query.category);
  req.query.wilaya && (filter.wilaya = req.query.wilaya);
  req.query.commune && (filter.commune = req.query.commune);
  req.query.contractType && (filter.contractType = req.query.contractType);
  // req.query.price && (filter.price = req.query.price);
  if (!!req.query.price || !!req.query.customPrice) {
    if (req.query.customPrice) {
      // Handle custom price range
      const customPrice = req.query.customPrice;
      if (customPrice) {
        filter.price = { $lte: Number(customPrice) };
      }
    } else if (req.query.price === "50000") {
      // Filter for $50000 or less
      filter.price = { $lte: 50000 };
    } else if (req.query.price === "20000") {
      // Filter for $20000 or less
      filter.price = { $lte: 20000 };
    }
    // Add more price range filters as needed
  }

  try {
    // Fetch only active properties and populate the creator field
    const properties = await Property.find(filter).populate("creator", "name");

    const formattedProperties = properties.map((property) => ({
      _id: property._id,
      title: property.title,
      description: property.description,
      location: property.location,
      wilaya: property.wilaya,
      commune: property.commune,
      price: property.price,
      photos: property.photos,
      category: property.category,
      contractType: property.contractType,
      creator: {
        name: property.creator.name,
      },
      createdAt: property.createdAt,
    }));

    res.status(200).json(formattedProperties);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPropertyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id).populate("creator");

    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate("creator");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Only allow the property creator to update fields other than status
    if (property.creator.equals(req.user.id)) {
      const {
        title,
        description,
        location,
        wilaya,
        commune,
        category,
        price,
        contractType,
        photos,
      } = req.body;

      property.set({
        title,
        description,
        location,
        wilaya,
        commune,
        category,
        price,
        contractType,
        photos,
      });
    } else if (req.user.role === "Admin") {
      // Only allow the admin to update the status
      const { status } = req.body;
      if (status !== undefined) {
        property.status = status;
        if (property.status === true) {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: property.creator.email,
            subject: "Activation de propriété...",
            text: "Votre propriété a été activée maintenant",
          };
          await transporter.sendMail(mailOptions);
        } else {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: property.creator.email,
            subject: "Désactivation de propriété...",
            text: "Votre propriété a été désactivée ",
          };
          await transporter.sendMail(mailOptions);

        }
        

        
      }
    } else {
      return res
        .status(401)
        .json({ message: "You can update only your own properties" });
    }

    const updatedProperty = await property.save();

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate("creator");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Only allow the property creator or admin to delete the property
    if (!property.creator.equals(req.user.id) && req.user.role !== "Admin") {
      return res
        .status(401)
        .json({ message: "You can delete only your own properties" });
    }

    await PropertyComment.deleteMany({ propertyId: { $in: id } });

    //   Delete the property
    await property.deleteOne();

     const mailOptions = {
       from: process.env.EMAIL_USER,
       to: property.creator.email,
       subject: "Suppression de propriété...",
       text: "Votre propriété a été suprimée...",
     };
     await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRentingProperties = async (req, res) => {
  try {
    const rentingProperties = await Property.find({
      category: "Renting",
      status: true,
    });

    res.status(200).json(rentingProperties);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFlatsharingProperties = async (req, res) => {
  try {
    const flatsharingProperties = await Property.find({
      category: "Flatsharing",
      status: true,
    });
    res.status(200).json(flatsharingProperties);
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getOwnerProperties,
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
  getHomeProperties,
  getFlatsharingProperties,
  getRentingProperties,
};
