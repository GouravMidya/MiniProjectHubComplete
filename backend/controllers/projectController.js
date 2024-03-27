// controllers/projectController.js
const Project = require('../models/Project');

// Get approved projects
exports.getApprovedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'approved' }, { domain: 1, technology: 1, name: 1, semester: 1, githubLink: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get pending projects
exports.getPendingProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'pending' }, { domain: 1, technology: 1, name: 1, semester: 1, githubLink: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new project submission
exports.createProject = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    semester: req.body.semester,
    domain: req.body.domain,
    technology: req.body.technology,
    githubLink: req.body.githubLink,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a project submission
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a project submission
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve a project submission
exports.approveProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject a project submission
exports.rejectProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};