import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import apiService from '../services/apiService';

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const approvedProjects = await apiService.getApprovedProjects();
        setProjects(approvedProjects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Approved Projects
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;