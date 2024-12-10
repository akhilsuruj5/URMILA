const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  linkedin: { type: String, required: false },
  image: { type: String, required: false },
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
