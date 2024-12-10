const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { name, email, phone, occupation, institution, title } = req.body.userData;

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userEmailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #333;">Hi ${name},</h2>
      <p style="color: #555;">You have initiated course registration for <strong style="color: #0056b3;">${title}</strong>.</p>
      <p style="color: #555;">Thank you for your interest! We will process your request shortly.</p>
      <p style="color: #555;">You will receive a call from us within the next 24 hours to assist you further.</p>
      <footer style="margin-top: 20px;">
        <p style="color: #888;">Best Regards,<br>URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
      </footer>
    </div>
  `;

  const adminEmailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #333;">New Course Registration Request</h2>
      <p style="color: #555;">User Details:</p>
      <ul style="list-style-type: none; padding-left: 0; color: #555;">
        <li style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</li>
        <li style="margin-bottom: 5px;"><strong>Email:</strong> ${email}</li>
        <li style="margin-bottom: 5px;"><strong>Phone:</strong> ${phone}</li>
        <li style="margin-bottom: 5px;"><strong>Occupation:</strong> ${occupation}</li>
        <li style="margin-bottom: 5px;"><strong>Institution:</strong> ${institution}</li>
      </ul>
      <p style="color: #555;">Course Interested: <strong style="color: #0056b3;">${title}</strong></p>
      <footer style="margin-top: 20px;">
        <p style="color: #888;">Best Regards,<br>Technical team</p>
        <p style="color: #888;">URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
      </footer>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Registration Initiation: ${title}`,
      html: userEmailContent,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Course Registration Request',
      html: adminEmailContent,
    });

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails');
  }
};

const sendMentorshipEmail = async (req, res) => {
  const { name, email, phone, occupation, institution } = req.body.user;
  const { mentorshipType } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const userEmailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #333;">Hi ${name},</h2>
      <p style="color: #555;">You have initiated mentorship registration for <strong style="color: #0056b3;">${mentorshipType}</strong>.</p>
      <p style="color: #555;">Thank you for your interest! We will process your request shortly.</p>
      <p style="color: #555;">You will receive a call from us within the next 24 hours to assist you further.</p>
      <footer style="margin-top: 20px;">
        <p style="color: #888;">Best Regards,<br>URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
      </footer>
    </div>
  `;

  const adminEmailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #333;">New Mentorship Registration Request</h2>
      <p style="color: #555;">User Details:</p>
      <ul style="list-style-type: none; padding-left: 0; color: #555;">
        <li style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</li>
        <li style="margin-bottom: 5px;"><strong>Email:</strong> ${email}</li>
        <li style="margin-bottom: 5px;"><strong>Phone:</strong> ${phone}</li>
        <li style="margin-bottom: 5px;"><strong>Occupation:</strong> ${occupation}</li>
        <li style="margin-bottom: 5px;"><strong>Institution:</strong> ${institution}</li>
      </ul>
      <p style="color: #555;">Mentorship Interested: <strong style="color: #0056b3;">${mentorshipType}</strong></p>
      <footer style="margin-top: 20px;">
        <p style="color: #888;">Best Regards,<br>Technical team</p>
        <p style="color: #888;">URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
      </footer>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Registration Initiation: ${mentorshipType}`,
      html: userEmailContent,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Mentorship Registration Request',
      html: adminEmailContent,
    });

    res.status(200).send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error sending emails');
  }
};

module.exports = { sendEmail, sendMentorshipEmail };
