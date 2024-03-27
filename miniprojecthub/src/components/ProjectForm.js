import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import apiService from '../services/apiService';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    domain: '',
    technology: '',
    githubLink: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.createProject(formData);
      // Reset form after successful submission
      setFormData({
        name: '',
        semester: '',
        domain: '',
        technology: '',
        githubLink: '',
      });
      alert('Project submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting project. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '2rem auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Submit Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Project Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="semester"
          label="Semester"
          value={formData.semester}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="domain"
          label="Domain"
          value={formData.domain}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="technology"
          label="Technology"
          value={formData.technology}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="githubLink"
          label="GitHub Link"
          value={formData.githubLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProjectForm;