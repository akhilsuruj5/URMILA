const Offering = require("../models/Offerings");
const Registration = require("../models/Registration");
const mongoose = require("mongoose");

const getOfferings = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const offerings = await Offering.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalOfferings = await Offering.countDocuments();
    res.json({
      offerings,
      totalPages: Math.ceil(totalOfferings / limit),
      totalOfferings,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching offerings" });
  }
};

const addAllOffering = async (req, res) => {
  try {
    const newOffering = new Offering(req.body);
    await newOffering.save();
    res.status(201).json(newOffering);
  } catch (error) {
    res.status(500).json({ error: "Error creating offering" });
  }
};
const updateOffering = async (req, res) => {
  try {
    const updatedOffering = await Offering.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOffering);
  } catch (error) {
    res.status(500).json({ error: "Error updating offering" });
  }
};
const deleteOffering = async (req, res) => {
  try {
    await Offering.findByIdAndDelete(req.params.id);
    res.json({ message: "Offering deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting offering" });
  }
};
const updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: "Error updating registration status" });
  }
};

const getRegistrations = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status = "pending",
    offeringType,
    userOccupation,
  } = req.query;

  try {
    const query = {};
    if (status) query.status = status;

    let offeringIds = [];
    if (offeringType) {
      const offerings = await Offering.find({ type: offeringType }, "_id");
      offeringIds = offerings.map((offering) => offering._id);
      query.offering = { $in: offeringIds };
    }

    // Use aggregation pipeline for occupation filtering
    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: "users", // Name of the User collection
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }, // Unwind user to access its fields
    ];

    if (userOccupation) {
      pipeline.push({ $match: { "user.occupation": userOccupation } });
    }

    pipeline.push(
      {
        $lookup: {
          from: "offerings", // Name of the Offering collection
          localField: "offering",
          foreignField: "_id",
          as: "offering",
        },
      },
      { $unwind: "$offering" },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) }
    );

    const registrations = await Registration.aggregate(pipeline);
    const totalRegistrations = await Registration.countDocuments(query);

    res.json({
      registrations,
      totalPages: Math.ceil(totalRegistrations / limit),
      totalRegistrations,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching registrations" });
  }
};


module.exports = {
  getOfferings,
  deleteOffering,
  updateOffering,
  addAllOffering,
  getRegistrations,
  updateStatus,
};
