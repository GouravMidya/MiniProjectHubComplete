import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Collapse, Alert,Button, CircularProgress} from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import apiService from '../services/apiService';
import SearchFilter from '../components/SearchFilter';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    
    const fetchProjects = async () => {
      try {
        // await delay(2000);
        setIsLoading(true); // Set isLoading to true before fetching data
        const approvedProjects = await apiService.getApprovedProjects();
        setProjects(approvedProjects);
        setFilteredProjects(approvedProjects);
      } catch (error) {
        console.error(error);
      }finally {
        setIsLoading(false); // Set isLoading to false after fetching data
      }
    };
    fetchProjects();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(term.toLowerCase()) ||
        project.semester.toLowerCase().includes(term.toLowerCase()) ||
        project.domain.some((d) => d.toLowerCase().includes(term.toLowerCase())) ||
        project.technology.some((t) => t.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredProjects(filtered);
  };

  const handleFilter = async (options) => {
    try {
      const filterOptions = {
        semester: options.semester,
        domain: options.domain.length > 0 ? options.domain : undefined,
        technology: options.technology.length > 0 ? options.technology : undefined,
      };
      const filtered = await apiService.filterProjects(filterOptions);
      setFilteredProjects(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Collapse in={showAlert}>
        <Alert severity="info">
          {/* <Box sx={{ backgroundColor: '#f0f0f0', padding: '1rem', marginBottom: '1rem' }}> */}
            <Typography variant="body1" gutterBottom>
              <strong>Site Details:</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              🚀 Introducing Mini Project Hub: A Hub for Student Projects!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Hey everyone! 👋 We've all been there – endlessly browsing the internet, searching for inspiration when it comes to choosing a mini project problem statement. Wouldn't it be great if there were a platform that showcased projects created by our seniors or peers and provided ideas for various domains and tech stacks?
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>What We've Built:</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              - We've developed a React web app that allows you to explore projects submitted by other students.
            </Typography>
            <Typography variant="body1" gutterBottom>
              - While the app is still in its early stages, it has the potential to become an invaluable resource for all of us.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>How You Can Contribute:</strong>
            </Typography>
            <Typography variant="body1" gutterBottom>
              1. Visit our website. https://miniprojecthubcomplete-1.onrender.com/
            </Typography>
            <Typography variant="body1" gutterBottom>
              2. Click on the "Submit Project" button.
            </Typography>
            <Typography variant="body1" gutterBottom>
              3. Fill out a simple form with the following details:
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Project Name: What did you call your project?
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Semester: When did you work on it?
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Domains: Which areas does your project cover?
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Technologies Used: What tech stack did you employ?
            </Typography>
            <Typography variant="body1" gutterBottom>
              - GitHub Repository Link: Share the link to your project's repository.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Your small effort will help create a rich library of student projects, inspiring creativity and collaboration among peers. Let's build something amazing together! 🌟
            </Typography>
          {/* </Box> */}
        </Alert>
        </Collapse>
        <Button onClick={() => setShowAlert(!showAlert)} sx={{
            display: 'block',
            margin: 'auto',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
          {showAlert ? 'Tap to hide this information' : 'Tap to know about this website'}
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <Button onClick={() => setShowSearchFilter(!showSearchFilter)} variant="outlined">
            {showSearchFilter ? 'Close Search/Filter' : 'Search and Filter Options'}
          </Button>
        </Box>
        <Collapse in={showSearchFilter}>
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
        </Collapse>
      {isLoading ? ( // Render CircularProgress if isLoading is true
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        // Render the rest of the content
      <div>
        

        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Alert severity="info">The projects listed here are not real ones and just popular github repos to showcase until we collect enough data</Alert>
          </Grid>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </div>
      )}
    </Box>
  );
};

export default HomePage;