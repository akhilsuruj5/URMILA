const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const courseRoutes = require("./routes/courseRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const emailRoutes = require("./routes/emailRoutes");
const  adminRoutes = require("./routes/adminRoutes");
const  teamRoutes = require("./routes/teamRoutes");
const  jobRoutes = require("./routes/jobRoutes");
const  additionalAdminRoutes = require("./routes/additionalAdminRoutes");

app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(authRoutes);
app.use(userRoutes);
app.use(mentorRoutes);
app.use(courseRoutes);
app.use(testimonialRoutes);
app.use(emailRoutes);
app.use(teamRoutes);

app.use(adminRoutes);
app.use(jobRoutes);
app.use(additionalAdminRoutes);

app.get("/", (req, res) => res.send("Welcome to the API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const crypto = require("crypto");

// const Registration = require("./models/Registration");
// const Offering = require("./models/Offerings");
// const app = express();

// app.use(express.json());
// app.use(cors());
// const JWT_SECRET = process.env.JWT_SECRET;

// const mongoURI = process.env.MONGO_URI
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const bcrypt = require("bcryptjs");
// const User = require("./models/User");
// const authenticateToken = require("./middlewares/auth");

// const nodemailer = require("nodemailer");
// const router = require("./routes/registerRoutes");
// const Testimonial = require("./models/Testimonial");

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, phone, occupation, institution } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser && existingUser.isVerified) {
//       return res.status(400).json({ msg: "Email already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     if (existingUser) {
//       existingUser.password = hashedPassword;
//       existingUser.phone = phone;
//       existingUser.occupation = occupation;
//       existingUser.institution = institution;
//       existingUser.otp = otp;
//       existingUser.isVerified = false;
//       await existingUser.save();
//     } else {
//       const newUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         occupation,
//         institution,
//         otp,
//         isVerified: false,
//       });

//       await newUser.save();
//     }

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.hostinger.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Email Verification OTP",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; background-color: #f9f9f9;">
//           <h2 style="color: #333;">Welcome!</h2>
//           <p style="color: #555;">Thank you for signing up. Please verify your email address to activate your account.</p>
//           <p style="color: #333; font-size: 20px; font-weight: bold;">Your OTP for email verification is:</p>
//           <h3 style="color: #007BFF; font-size: 24px; font-weight: bold;">${otp}</h3>
//           <p style="color: #555;">Enter this code in the verification page to complete your registration.</p>
//           <p style="color: #555;">If you did not request this, please ignore this email.</p>
//           <p style="color: #555;">Thank you,<br>URMILA</p>
//         </div>
//       `,
//     });

//     res.status(201).json({
//       msg: "OTP sent to your email. Please check your email to verify.",
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Error registering user" });
//   }
// });

// app.post("/complete-registration", authenticateToken, async (req, res) => {
//   const { mobileNumber, currentOccupation, instituteOrOrganizationName } =
//     req.body;
//   console.log("hello");
//   // Validate input
//   if (!mobileNumber && !currentOccupation && !instituteOrOrganizationName) {
//     return res.status(400).json({ msg: "At least one field is required." });
//   }

//   try {
//     // Get user ID from authenticated token
//     const userId = req.user.id;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ msg: "User not found." });
//     }
//     console.log(user);
//     // Update user fields
//     if (mobileNumber) user.mobileNumber = mobileNumber;
//     if (currentOccupation) user.currentOccupation = currentOccupation;
//     if (instituteOrOrganizationName)
//       user.instituteOrOrganizationName = instituteOrOrganizationName;

//     await user.save();

//     return res
//       .status(200)
//       .json({ msg: "Registration completed successfully!" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: "Server error." });
//   }
// });

// app.post("/verify-otp", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ msg: "User not found" });
//     }

//     if (user.otp === otp) {
//       user.isVerified = true;
//       user.otp = null;
//       await user.save();

//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });

//       res.status(200).json({ msg: "Email verified successfully", token });
//     } else {
//       res.status(400).json({ msg: "Invalid OTP. Please try again." });
//     }
//   } catch (error) {
//     res.status(500).json({ msg: "Error verifying OTP" });
//   }
// });

// app.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ msg: "No user found with this email." });
//     }

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000;

//     await user.save();

//     const resetURL = `https://www.urmila.academy/reset-password/${resetToken}`;

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.hostinger.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Request",
//       html: `
//         <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Password Reset Email</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             background-color: #f4f4f4;
//         }
//         .container {
//             width: 100%;
//             max-width: 600px;
//             margin: 20px auto;
//             background-color: #ffffff;
//             padding: 20px;
//             border-radius: 5px;
//             box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
//         }
//         h1 {
//             font-size: 24px;
//             color: #333;
//         }
//         p {
//             font-size: 16px;
//             line-height: 1.5;
//             color: #555;
//         }
//         a {
//             display: inline-block;
//             margin: 20px 0;
//             padding: 10px 15px;
//             background-color: #add8e6; /* Light blue color */
//             color: #000000; /* Black text */
//             text-decoration: none;
//             border-radius: 3px;
//         }
//         .footer {
//             margin-top: 20px;
//             font-size: 14px;
//             color: #777;
//             text-align: center;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Password Reset Request</h1>
//         <p>You requested a password reset. Click the link below to reset your password:</p>
//         <a href="${resetURL}">Reset Password</a>
//         <p>If you did not request this, please ignore this email.</p>
//         <div class="footer">
//             <p>&copy; 2024 URMILA. All rights reserved.</p>
//         </div>
//     </div>
// </body>
// </html>

//       `,
//     });

//     res.status(200).json({ msg: "Password reset link sent to email." });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error. Please try again later." });
//   }
// });

// app.post("/reset-password/:token", async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ msg: "Password has been reset successfully." });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error. Please try again later." });
//   }
// });

// app.get("/user", authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("name email _id phone occupation institution "); // Adjust fields as needed

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.status(200).json({ ...user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ msg: "Error fetching user" });
//   }
// });

// app.post("/registermentor", async (req, res) => {
//   const { name, email, program } = req.body; // Expect name, email, and program in the request body

//   // Configure nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     host: "smtp.hostinger.com",
//     port: 465,
//     secure: true, // Use SSL
//     auth: {
//       user: process.env.EMAIL_USER, // Your email (admin email)
//       pass: process.env.EMAIL_PASS, // Your email password
//     },
//   });

//   // Email content for the user
//   const userEmailContent = `
//     <h2>Hi ${name},</h2>
//     <p>Thank you for registering for the <strong>${program}</strong> mentorship program!</p>
//     <p>We will reach out to you shortly with more details.</p>
//     <p>Best Regards,<br>URMILA Team</p>
//   `;

//   // Email content for the admin
//   const adminEmailContent = `
//     <h2>New Registration</h2>
//     <p>A new user has registered for the mentorship program:</p>
//     <ul>
//       <li><strong>Name:</strong> ${name}</li>
//       <li><strong>Email:</strong> ${email}</li>
//       <li><strong>Program:</strong> ${program}</li>
//     </ul>
//     <p>Best Regards,<br>URMILA Team</p>
//   `;

//   try {
//     // Send email to the user
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Registration Confirmation for ${program}`,
//       html: userEmailContent,
//     });

//     // Send email to the admin
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER, // Admin's email
//       subject: `New Registration: ${name}`,
//       html: adminEmailContent,
//     });

//     res.status(200).json({ message: "Emails sent successfully" });
//   } catch (error) {
//     console.error("Error sending emails:", error);
//     res.status(500).json({ message: "Failed to send emails" });
//   }
// });

// app.post('/send-email', async (req, res) => {
//   const { name, email, phone, occupation, institution, title } = req.body.userData;

//   console.log('hello1');
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.hostinger.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   console.log('hello1');
//   const userEmailContent = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
//   <h2 style="color: #333;">Hi ${name},</h2>
//   <p style="color: #555;">
//   You have initiated course registration for <strong style="color: #0056b3;">${title}</strong>.
//   </p>
//   <p style="color: #555;">
//   Thank you for your interest! We will process your request shortly.
//   </p>
//   <p style="color: #555;">
//   You will receive a call from us within the next 24 hours to assist you further.
//   </p>
//   <footer style="margin-top: 20px;">
//       <p style="color: #888;">Best Regards,<br>URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
//     </footer>
//   </div>
// `;
// const adminEmailContent = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
//     <h2 style="color: #333;">New Course Registration Request</h2>
//     <p style="color: #555;">User Details:</p>
//     <ul style="list-style-type: none; padding-left: 0; color: #555;">
//       <li style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</li>
//       <li style="margin-bottom: 5px;"><strong>Email:</strong> ${email}</li>
//       <li style="margin-bottom: 5px;"><strong>Phone:</strong> ${phone}</li>
//       <li style="margin-bottom: 5px;"><strong>Occupation:</strong> ${occupation}</li>
//       <li style="margin-bottom: 5px;"><strong>Institution:</strong> ${institution}</li>
//     </ul>
//     <p style="color: #555;">Course Interested: <strong style="color: #0056b3;">${title}</strong></p>
//     <footer style="margin-top: 20px;">
//       <p style="color: #888;">Best Regards,<br>Technical team</p>
//        <p style="color: #888;">URMILA - Unified Resource Management Institute for Logistics and Analytics</p>

//     </footer>
//     </div>
//     `;

//     console.log('hello2');
//     try {

//       const transporter = nodemailer.createTransport({
//         host: 'smtp.hostinger.com',
//         port: 465,
//         secure: true, // use SSL
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Registration Initiation: ${title}`,
//       html: userEmailContent,
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: 'New Course Registration Request',
//       html: adminEmailContent,
//     });

//     console.log('hello4');
//       res.status(200).send('Emails sent successfully');
//     } catch (error) {
//       console.error('Error sending emails:', error);
//       res.status(500).send('Error sending emails');
//     }
// });

// app.post('/refresh-token', (req, res) => {
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {
//     return res.status(401).json({ msg: 'Refresh token not found, please log in again' });
//   }

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ msg: 'Invalid refresh token' });

//     // Generate a new access token
//     const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ accessToken });
//   });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(400).json({ msg: "Invalid email or password" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ msg: "Invalid email or password" });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.status(200).json({ token, msg: "Login successful" });
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to the backend!");
// });

// app.post('/api/register/mentorship', async (req, res) => {
//   try {
//     const { userId, mentorshipType } = req.body;
//     if (!mentorshipType || !['One-to-One Mentorship Program', 'Assignment-Based Mentorship'].includes(mentorshipType)) {
//       return res.status(400).json({ error: 'Invalid mentorship type' });
//     }

//     // Fetch the corresponding mentorship offering based on the type
//     const mentorshipOffering = await Offering.findOne({
//       type: 'mentorship',
//       name: mentorshipType // Match the type and name of the mentorship offering
//     });

//     if (!mentorshipOffering) {
//       return res.status(404).json({ error: `${mentorshipType} offering not found` });
//     }

//     // Check if the user is already registered for this mentorship offering
//     const existingRegistration = await Registration.findOne({
//       user: userId,
//       offering: mentorshipOffering._id
//     });

//     if (existingRegistration) {
//       return res.status(400).json({ error: 'You are already registered for this mentorship.' });
//     }

//     // Create a new registration
//     const newRegistration = new Registration({
//       user: userId,
//       offering: mentorshipOffering._id,
//       status: 'pending', // default to pending
//     });

//     await newRegistration.save();

//     res.status(201).json({
//       message: `Successfully registered for ${mentorshipType}!`,
//       registrationId: newRegistration._id,
//     });
//   } catch (error) {
//     console.error('Error registering for mentorship:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/api/register/course', async (req, res) => {
//   try {
//     const { userId, courseId } = req.body;
//     console.log(userId);
//     console.log(courseId);
//     console.log('hellpo1')
//     // Fetch the corresponding course offering based on the course ID
//     const courseOffering = await Offering.findOne({
//       _id: courseId,
//       type: 'course'
//     });

//     if (!courseOffering) {
//       return res.status(404).json({ error: 'Course not found' });
//     }
//     console.log('hellpo2')

//     // Check if the user is already registered for this course offering
//     const existingRegistration = await Registration.findOne({
//       user: userId,
//       offering: courseOffering._id
//     });

//     if (existingRegistration) {
//       return res.status(400).json({ error: 'You are already registered for this course.' });
//     }

//     // Create a new registration
//     const newRegistration = new Registration({
//       user: userId,
//       offering: courseOffering._id,
//       status: 'pending', // Default to pending
//     });

//     await newRegistration.save();

//     res.status(201).json({
//       message: `Successfully registered for ${courseOffering.name}!`,
//       registrationId: newRegistration._id,
//     });
//   } catch (error) {
//     console.error('Error registering for course:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get("/api/courses/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Validate if the ID is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid Course ID" });
//     }

//     // Fetch the course directly using findById
//     const course = await Offering.findById(id);

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" });
//     }

//     res.status(200).json(course);
//   } catch (error) {
//     console.error("Error fetching course:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get('/api/courses', async (req, res) => {
//   try {
//     // Fetch offerings where type is 'course'
//     const courses = await Offering.find({ type: 'course' });

//     // Return the fetched courses
//     res.status(200).json(courses);
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // app.get("/api/registrations/enrolled", async (req, res) => {
// //   const userId = req.query.userId;
// //   console.log(userId);
// //   try {
// //     const registrations = await Registration.find({
// //       user: userId,
// //       status: "completed", // Filter only completed registrations
// //     }).populate("course"); // Populate course details

// //     console.log(registrations, 'registratios');
// //     const enrolledCourses = registrations.map((reg) => reg.course);
// //     res.status(200).json(enrolledCourses);
// //   } catch (error) {
// //     console.error("Error fetching enrolled courses:", error);
// //     res.status(500).json({ error: "Internal Server Error" });
// //   }
// // });

// const getEnrolledCourses = async (userId) => {
//   try {
//     // Find registrations for the user where offerings are of type 'course' and status is 'completed'
//     const enrolledCourses = await Registration.find({ user: userId, status: 'completed' })
//       .populate({
//         path: 'offering',
//         match: { type: 'course' }, // Match only offerings of type 'course'
//       })
//       .exec();

//     // Filter out any registrations where offering didn't match (null after population)
//     const filteredCourses = enrolledCourses.filter((registration) => registration.offering !== null);

//     return filteredCourses;
//   } catch (error) {
//     console.error('Error fetching enrolled courses:', error);
//     throw error;
//   }
// };

// app.get('/api/registrations/enrolled', async (req, res) => {
//   const userId = req.query.userId; // Use query parameter for userId
//   try {
//     const enrolledCourses = await Registration.find({ user: userId, status: 'completed' })
//       .populate('offering') // Populate offering details
//       .exec();

//     res.status(200).json(enrolledCourses);
//   } catch (error) {
//     console.error('Error fetching enrolled courses:', error);
//     res.status(500).json({ message: 'Error fetching enrolled courses' });
//   }
// });

// app.post('/send-mentorship-email', async (req, res) => {
//   const { name, email, phone, occupation, institution } = req.body.user;
//   const { mentorshipType } = req.body;

//   console.log('hello1');
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.hostinger.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   console.log('hello1');
//   const userEmailContent = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
//     <h2 style="color: #333;">Hi ${name},</h2>
//     <p style="color: #555;">
//       You have initiated mentorship registration for <strong style="color: #0056b3;">${mentorshipType}</strong>.
//     </p>
//     <p style="color: #555;">
//       Thank you for your interest! We will process your request shortly.
//     </p>
//     <p style="color: #555;">
//       You will receive a call from us within the next 24 hours to assist you further.
//     </p>
//     <footer style="margin-top: 20px;">
//       <p style="color: #888;">Best Regards,<br>URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
//     </footer>
//   </div>
//   `;

//   const adminEmailContent = `
//   <div style="font-family: Arial, sans-serif; line-height: 1.5; padding: 20px; background-color: #f4f4f4;">
//     <h2 style="color: #333;">New Mentorship Registration Request</h2>
//     <p style="color: #555;">User Details:</p>
//     <ul style="list-style-type: none; padding-left: 0; color: #555;">
//       <li style="margin-bottom: 5px;"><strong>Name:</strong> ${name}</li>
//       <li style="margin-bottom: 5px;"><strong>Email:</strong> ${email}</li>
//       <li style="margin-bottom: 5px;"><strong>Phone:</strong> ${phone}</li>
//       <li style="margin-bottom: 5px;"><strong>Occupation:</strong> ${occupation}</li>
//       <li style="margin-bottom: 5px;"><strong>Institution:</strong> ${institution}</li>
//     </ul>
//     <p style="color: #555;">Mentorship Interested: <strong style="color: #0056b3;">${mentorshipType}</strong></p>
//     <footer style="margin-top: 20px;">
//       <p style="color: #888;">Best Regards,<br>Technical team</p>
//       <p style="color: #888;">URMILA - Unified Resource Management Institute for Logistics and Analytics</p>
//     </footer>
//   </div>
//   `;

//   console.log('hello2');
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: `Registration Initiation: ${mentorshipType}`,
//       html: userEmailContent,
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: 'New Mentorship Registration Request',
//       html: adminEmailContent,
//     });

//     console.log('hello4');
//     res.status(200).send('Emails sent successfully');
//   } catch (error) {
//     console.error('Error sending emails:', error);
//     res.status(500).send('Error sending emails');
//   }
// });

// app.post("/api/testimonials", async (req, res) => {
//   try {
//     const { name, linkedin, text, photo, course } = req.body;

//     // Validate required fields
//     if (!name || !text ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const testimonialStatus =  "pending";

//     // Create a new testimonial
//     const newTestimonial = new Testimonial({
//       name,
//       linkedin,
//       text,
//       photo,
//       status: testimonialStatus, // Save the status to the database
//     });

//     // Save to the database
//     await newTestimonial.save();

//     res.status(201).json({ message: "Testimonial submitted successfully!" });
//   } catch (error) {
//     console.error("Error saving testimonial:", error.message);
//     res.status(500).json({ message: "Failed to submit testimonial." });
//   }
// });

// app.get("/api/testimonials", async (req, res) => {
//   try {
//     // Only return testimonials with status 'approved'
//     const testimonials = await Testimonial.find();
//     res.json(testimonials);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching testimonials", error });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
