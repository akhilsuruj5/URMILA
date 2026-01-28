const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendMail } = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, occupation, institution } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email, and password are required" });
    }

    // Email can be delivered via SendGrid (preferred) or SMTP. Fail fast if neither is configured.
    if ((!process.env.EMAIL_USER || !process.env.EMAIL_PASS) && (!process.env.SMTP_USER || !process.env.SMTP_PASS)) {
      console.error("Email service not configured. Set SMTP_USER/SMTP_PASS (preferred) or EMAIL_USER/EMAIL_PASS.");
      return res.status(500).json({ msg: "Email service not configured. Please contact support." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUser) {
      existingUser.password = hashedPassword;
      existingUser.phone = phone;
      existingUser.occupation = occupation;
      existingUser.institution = institution;
      existingUser.otp = otp;
      existingUser.isVerified = false;
      await existingUser.save();
    } else {
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        occupation,
        institution,
        otp,
        isVerified: false,
      });

      await newUser.save();
    }

    await sendMail({
      to: email,
      subject: "Email Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Welcome!</h2>
          <p style="color: #555;">Thank you for signing up. Please verify your email address to activate your account.</p>
          <p style="color: #333; font-size: 20px; font-weight: bold;">Your OTP for email verification is:</p>
          <h3 style="color: #007BFF; font-size: 24px; font-weight: bold;">${otp}</h3>
          <p style="color: #555;">Enter this code in the verification page to complete your registration.</p>
          <p style="color: #555;">If you did not request this, please ignore this email.</p>
          <p style="color: #555;">Thank you,<br>URMILA</p>
        </div>
      `,
    });

    res.status(201).json({
      msg: "OTP sent to your email. Please check your email to verify.",
    });
  } catch (error) {
    console.error("Error in register function:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
      command: error.command,
    });
    
    // Return more specific error messages
    if (error.message.includes("timeout")) {
      return res.status(500).json({ 
        msg: "Email service timeout. Please try again or contact support.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
    
    if (error.code === "EAUTH" || error.responseCode === 535) {
      return res.status(500).json({ 
        msg: "Email authentication failed. Please contact support.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }

    res.status(500).json({ 
      msg: "Error registering user",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (user.otp === otp) {
      user.isVerified = true;
      user.otp = null;
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ msg: "Email verified successfully", token });
    } else {
      res.status(400).json({ msg: "Invalid OTP. Please try again." });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error verifying OTP" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "No user found with this email." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    const resetURL = `https://www.urmila.academy/reset-password/${resetToken}`;

    await sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
            font-size: 24px;
            color: #333;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
        }
        a {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 15px;
            background-color: #add8e6; /* Light blue color */
            color: #000000; /* Black text */
            text-decoration: none;
            border-radius: 3px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetURL}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <div class="footer">
            <p>&copy; 2024 URMILA. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

      `,
    });

    res.status(200).json({ msg: "Password reset link sent to email." });
  } catch (error) {
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ msg: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ msg: "Refresh token not found, please log in again" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Invalid refresh token" });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token, msg: "Login successful" });
};

module.exports = {
  register,
  verifyOtp,
  forgotPassword,
  resetPassword,
  refreshToken,
  login,
};
