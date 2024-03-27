// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: String, required: true },
  domain: [{ type: String, required: true }],
  technology: [{ type: String, required: true }],
  githubLink: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;