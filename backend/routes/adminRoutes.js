const express = require('express');
const {adminLogin , signupAdmin , verifyEmail, overview ,getAllUsers , updateUser , deleteUser} = require("../controllers/adminController");
const {getOfferings , addAllOffering , updateOffering , deleteOffering , getRegistrations , updateStatus} = require("../controllers/offeringsController");    
const router = express.Router();
const User = require('../models/User'); 
// Admin Login Endpoint
router.post("/admin/login", adminLogin);
router.post('/admin/signup', signupAdmin);
router.get("/admin/overview", overview);

// users routes

// GET /api/admin/users
router.get('/admin/users', getAllUsers);

// DELETE /api/admin/users/:id
router.delete('/admin/users/:id', deleteUser);

// PUT /api/admin/users/:id
router.put('/admin/users/:id', updateUser);


router.get("/admin/verify-account/:token", verifyEmail);


// offerings routes 
router.get('/admin/offerings', getOfferings);

  router.post('/admin/offerings', addAllOffering);

  router.put('/admin/offerings/:id', updateOffering);

  router.delete("/admin/offerings/:id", deleteOffering);


  router.get('/admin/registrations', getRegistrations);

  
  router.put('/admin/registrations/:id/status', updateStatus);
  
  router.get('/team', async (req, res) => {
    try {
      const teamMembers = await Team.find();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get("/admin/usersProfile/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
