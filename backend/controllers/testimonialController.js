const Testimonial = require('../models/Testimonial');
const express = require('express');
const router = express.Router();

const createTestimonial = async (req, res) => {
  try {
    const { name, linkedin, text, photo } = req.body;

    if (text.length > 400) {
      return res.status(400).json({ message: 'Text exceeds the maximum length of 400 characters.' });
    }

    const newTestimonial = new Testimonial({
      name,
      linkedin,
      text,
      photo,
    });

    await newTestimonial.save();

    res.status(201).json({ message: 'Testimonial added successfully', newTestimonial });
  } catch (error) {
    res.status(500).json({ message: 'Error adding testimonial', error });
  }
}
const getTestimonials = async (req, res) => {
  try {
    const { page = 1, status = 'all' } = req.query;
    const limit = 10;
    const filter = status === 'all' ? {} : { status };
    
    console.log('Filter:', filter);
    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await Testimonial.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      testimonials,
      totalPages,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error });
  }
}
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, linkedin, text, status } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (linkedin) updateFields.linkedin = linkedin;
    if (text) updateFields.text = text;
    if (status) {
      if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      updateFields.status = status;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial updated successfully', updatedTestimonial });
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial', error });
  }
};


const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error });
  }
}

module.exports = {deleteTestimonial , createTestimonial, getTestimonials, updateTestimonial};
