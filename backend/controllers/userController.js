const User = require('../models/User'); 

const getUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).select('name email _id phone occupation institution'); 

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({ ...user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'Error fetching user' });
  }
};

module.exports = { getUser };
