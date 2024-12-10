const Offering = require('../models/Offerings');
const Registration = require('../models/Registration'); 
const mongoose = require("mongoose");

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Course ID" });
    }

    const course = await Offering.findById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerForCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const courseOffering = await Offering.findOne({
      _id: courseId,
      type: 'course',
    });

    if (!courseOffering) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const existingRegistration = await Registration.findOne({
      user: userId,
      offering: courseOffering._id,
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'You are already registered for this course.' });
    }

    const newRegistration = new Registration({
      user: userId,
      offering: courseOffering._id,
      status: 'pending',
    });

    await newRegistration.save();

    res.status(201).json({
      message: `Successfully registered for ${courseOffering.name}!`,
      registrationId: newRegistration._id,
    });
  } catch (error) {
    console.error('Error registering for course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getEnrolledCourses = async (req, res) => {
  // const userId = req.query.userId;

  // try {
  //   const enrolledCourses = await Registration.find({ user: userId, status: 'completed' })
  //     .populate('offering', 'name type description image studyMaterialLink') // Include desired fields
  //     .exec();

  //   console.log(enrolledCourses);
  //   res.status(200).json(enrolledCourses);
  // } catch (error) {
  //   console.error('Error fetching enrolled courses:', error);
  //   res.status(500).json({ message: 'Error fetching enrolled courses' });
  // }
  const userId = req.query.userId; // Use query parameter for userId
  try {
    const enrolledCourses = await Registration.find({ user: userId, status: 'completed' })
      .populate('offering', 'name type description image studyMaterialLink')
      .exec();

      // console.log(enrolledCourses)
    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Error fetching enrolled courses' });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Offering.find({ type: 'course' });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getCourses,
  getCourseById,
  registerForCourse,
  getEnrolledCourses,
};
