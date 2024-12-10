const Team = require('../models/Team');
const express = require('express');
const router = express.Router();

const getTeam = async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.status(200).json(teamMembers);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching team members', error });
      }
}

const addMember = async (req, res) => {
    const { name, role, description, linkedin, image } = req.body;

  try {
    const newMember = new Team({
      name,
      role,
      description,
      linkedin,
      image,
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Error adding new team member", error });
  }
}

const updateMember = async (req, res) => {
const { name, role, description, linkedin, image } = req.body;
  try {
    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      { name, role, description, linkedin, image },
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: "Error updating team member", error });
  }

}

const deleteMember = async(req , res ) => {
    try {
        const deletedMember = await Team.findByIdAndDelete(req.params.id);
        if (!deletedMember) {
          return res.status(404).json({ message: "Team member not found" });
        }
        res.status(200).json({ message: "Team member deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting team member", error });
      }
}
module.exports = {getTeam , addMember, updateMember, deleteMember};
