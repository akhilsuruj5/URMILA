const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const crypto = require("crypto");
const Offering = require('../models/Offerings');
const Registration = require('../models/Registration'); 
const Testimonial = require('../models/Testimonial');
const User = require('../models/User');
const { sendMail } = require("../utils/mailer");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    if (!admin.isVerified) {
      return res.status(403).json({ msg: "Account not verified" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};




const signupAdmin = async (req, res) => {
  const { email, password, name } = req.body;
  try {

    const existingAdmin = await Admin.findOne({ email, isAdmin: true });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
      verificationToken: crypto.randomBytes(32).toString("hex"),
      isVerified: false,
    });
    
    // Save new admin user to DB
    await newAdmin.save();

    const verificationUrl = `https://admin.urmila.academy/admin/verify-account/${newAdmin.verificationToken}`;
    await sendMail({
      to: "support@urmila.academy", // Support email
      subject: "New Admin Signup - Pending Verification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Admin Signup</h2>
          <p style="color: #555;">A new admin account request has been made:</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p>To verify the account, click the link below:</p>
          <a href="${verificationUrl}" style="color: #007BFF; font-size: 18px; font-weight: bold;">Verify Admin Account</a>
        </div>
        `,
      });
      
    res.status(201).json({ msg: "Signup successful.  Your request has been sent to the support team for verification." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error during signup." });
  }

};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Find admin by verification token
    const admin = await Admin.findOne({ verificationToken: token });

    if (!admin) {
      return res.status(404).send("Invalid or expired verification token.");
    }

    // If the token is null, it means the account has already been verified
    if (admin.verificationToken === null) {
      return res.status(400).json({ msg: "Account already verified." });
    }

    admin.isVerified = true;
    admin.verificationToken = null;
    await admin.save();

    await sendMail({
      to: admin.email,
      subject: "Your Admin Account Has Been Verified",
      html: `<p>Dear ${admin.name},</p><p>Your admin account has been successfully verified. You can now log in to the admin dashboard.</p>`,
    });

    res.status(200).json({ msg: "Account verified successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying account.");
  }
};


const overview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOfferings = await Offering.countDocuments();
    const activeRegistrations = await Registration.countDocuments({
      status: { $in: ['pending', 'completed'] },
    });
    const pendingTestimonials = await Testimonial.countDocuments({ status: 'pending' });

    res.json({
      totalUsers,
      totalOfferings,
      activeRegistrations,
      pendingTestimonials,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch overview data' });
  }
};


const getAllUsers = async (req ,res) => {
  try {
    const { search, occupation, isVerified, sortBy, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (occupation) {
      filter.occupation = occupation;
    }
    if (isVerified !== undefined) {
      filter.isVerified = isVerified === 'true';
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = {};
    if (sortBy === 'name') {
      sort = { name: 1 };
    } else if (sortBy === 'date') {
      sort = { createdAt: -1 };
    } else if (sortBy === 'verification') {
      sort = { isVerified: -1 };
    }

    const users = await User.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await User.countDocuments(filter);

    res.json({
      users,
      totalUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
    }
}

const deleteUser = async (req , res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

const updateUser = async(req , res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

module.exports = { adminLogin , signupAdmin, verifyEmail , overview ,getAllUsers , updateUser , deleteUser};