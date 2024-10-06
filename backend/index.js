const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const userRoutes = require('./routes/userRoutes');

const app = express();


app.use(express.json());
app.use(cors());
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


const mongoURI = 'mongodb+srv://vinaymalik1729:2QVRcNSMZAqAvS4s@cluster0.boree.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


const bcrypt = require('bcryptjs');
  const User = require('./models/User'); // Assuming your schema is in models/User.js
const authenticateToken = require('./middlewares/auth');
  
app.post('/register', async (req, res) => {
    try {
        const { name, email, mobileNumber, currentOccupation, instituteOrOrganizationName, password } = req.body;

        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            mobileNumber,
            currentOccupation,
            instituteOrOrganizationName,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('User stored in DB');

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        // Send the token back to the client
        res.status(201).json({ msg: 'User registered successfully', token });
    } catch (error) {
        if (error.code === 11000) {
            // Handle unique constraint error (for duplicate email)
            return res.status(400).json({ msg: 'Email already exists' });
        }
        console.log("Error:", error);
        res.status(500).json({ msg: 'Error registering user' });
    }
});


app.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the authentication middleware
        const user = await User.findById(userId).select('name email'); // Adjust fields as needed
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ msg: 'Error fetching user' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }
  
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  
    // Send token and success message
    res.status(200).json({ token, msg: 'Login successful' });
  });
  

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
