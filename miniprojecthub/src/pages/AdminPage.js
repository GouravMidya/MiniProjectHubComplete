import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid,CircularProgress } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import apiService from '../services/apiService';

const AdminPage = () => {
  const [pendingProjects, setPendingProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state


  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        // await delay(2000);
        setIsLoading(true); // Set isLoading to true before fetching data
        const projects = await apiService.getPendingProjects();
        setPendingProjects(projects);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data
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
      {isLoading ? ( // Render CircularProgress if isLoading is true
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        // Render the rest of the content
        <div>
        
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
      </div>
      )}
      
    </Box>
  );
};

export default AdminPage;