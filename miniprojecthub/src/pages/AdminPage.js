import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import apiService from '../services/apiService';

const AdminPage = () => {
  const [pendingProjects, setPendingProjects] = useState([]);

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const projects = await apiService.getPendingProjects();
        setPendingProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPendingProjects();
  }, []);

  const handleApprove = async (projectId) => {
    try {
      await apiService.approveProject(projectId);
      setPendingProjects(pendingProjects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (projectId) => {
    try {
      await apiService.rejectProject(projectId);
      setPendingProjects(pendingProjects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Pending Projects
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {pendingProjects.map((project) => (
          <Box key={project._id} sx={{ margin: '1rem' }}>
            <ProjectCard project={project} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button variant="contained" color="primary" onClick={() => handleApprove(project._id)}>
                Approve
              </Button>
              <Button variant="contained" color="error" onClick={() => handleReject(project._id)}>
                Reject
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminPage;