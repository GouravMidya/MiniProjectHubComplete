import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import apiService from '../services/apiService';
import SearchFilter from '../components/SearchFilter';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const approvedProjects = await apiService.getApprovedProjects();
        setProjects(approvedProjects);
        setFilteredProjects(approvedProjects);
      } catch (error) {
        console.error(error);
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
      <Typography variant="h4" gutterBottom>
        Approved Projects
      </Typography>
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;