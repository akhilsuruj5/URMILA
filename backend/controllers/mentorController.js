const nodemailer = require('nodemailer');
const Offering = require('../models/Offerings');
const Registration = require('../models/Registration');

const registerMentor = async (req, res) => {
  const { name, email, program } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userEmailContent = `
    <h2>Hi ${name},</h2>
    <p>Thank you for registering for the <strong>${program}</strong> mentorship program!</p>
    <p>We will reach out to you shortly with more details.</p>
    <p>Best Regards,<br>URMILA Team</p>
  `;

  const adminEmailContent = `
    <h2>New Registration</h2>
    <p>A new user has registered for the mentorship program:</p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Program:</strong> ${program}</li>
    </ul>
    <p>Best Regards,<br>URMILA Team</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Registration Confirmation for ${program}`,
      html: userEmailContent,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Registration: ${name}`,
      html: adminEmailContent,
    });

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send emails" });
  }
};

const registerMentorship = async (req, res) => {
  try {
    const { userId, mentorshipType } = req.body;

    if (!mentorshipType || !['One-to-One Mentorship Program', 'Assignment-Based Mentorship'].includes(mentorshipType)) {
      return res.status(400).json({ error: 'Invalid mentorship type' });
    }

    const mentorshipOffering = await Offering.findOne({
      type: 'mentorship',
      name: mentorshipType,
    });

    if (!mentorshipOffering) {
      return res.status(404).json({ error: `${mentorshipType} offering not found` });
    }

    const existingRegistration = await Registration.findOne({
      user: userId,
      offering: mentorshipOffering._id,
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'You are already registered for this mentorship.' });
    }

    const newRegistration = new Registration({
      user: userId,
      offering: mentorshipOffering._id,
      status: 'pending',
    });

    await newRegistration.save();

    res.status(201).json({
      message: `Successfully registered for ${mentorshipType}!`,
      registrationId: newRegistration._id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerMentor, registerMentorship };
