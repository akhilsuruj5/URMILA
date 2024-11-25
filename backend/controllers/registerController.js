const Registration = require('../models/Registration'); 
const Offering = require('../models/Offerings');

exports.registerForMentorship = async (req, res) => {
  try {
    const { userId } = req.body; 

    const mentorshipOffering = await Offering.findOne({ type: 'one-to-one mentorship' });
    if (!mentorshipOffering) {
      return res.status(404).json({ error: 'Mentorship offering not found' });
    }

    const existingRegistration = await Registration.findOne({ user: userId, offering: mentorshipOffering._id });
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
      message: 'Successfully registered for one-to-one mentorship!',
      registrationId: newRegistration._id,
    });
  } catch (error) {
    console.error('Error registering for mentorship:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
