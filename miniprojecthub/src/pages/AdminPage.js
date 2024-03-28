import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
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
      <Grid container spacing={2}>
        {pendingProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <ProjectCard project={project} />
              <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' ,padding:"15px"}}>
                <Button variant="contained" color="primary" onClick={() => handleApprove(project._id)}>
                  Approve
                </Button>
                <Button variant="contained" color="error" onClick={() => handleReject(project._id)}>
                  Reject
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminPage;