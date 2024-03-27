// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Get approved projects
router.get('/approved', projectController.getApprovedProjects);

// Get pending projects
router.get('/pending', projectController.getPendingProjects);

// Create a new project submission
router.post('/', projectController.createProject);

// Update a project submission
router.put('/:id', projectController.updateProject);

// Delete a project submission
router.delete('/:id', projectController.deleteProject);

// Approve a project submission
router.put('/:id/approve', projectController.approveProject);

// Reject a project submission
router.put('/:id/reject', projectController.rejectProject);

module.exports = router;