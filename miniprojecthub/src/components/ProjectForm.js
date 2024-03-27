import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Autocomplete } from '@mui/material';
import apiService from '../services/apiService';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    domain: [],
    technology: [],
    githubLink: '',
  });

  const domains = ['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'Cybersecurity', 'DevOps', 'Game Development', 'Cloud Computing', 'IoT', 'Big Data', 'Blockchain', 'AR/VR Development', 'Desktop Applications', 'Embedded Systems', 'Quantum Computing', 'Bioinformatics', 'Health Tech', 'FinTech', 'Educational Technology', 'E-commerce', 'Social Media', 'Content Management Systems (CMS)', 'Search Engine Optimization (SEO)', 'Digital Marketing', 'Gaming', 'Animation', 'Virtual Assistants', 'Robotics', 'Natural Language Processing (NLP)', 'Computer Vision', 'Human-Computer Interaction (HCI)', 'Ethical Hacking', 'Network Security', 'Information Assurance', 'Cryptography', 'Digital Forensics', 'Security Operations', 'Privacy Engineering', 'Penetration Testing', 'Malware Analysis', 'Reverse Engineering', 'Security Compliance', 'Threat Intelligence'];

  const technologies = ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java', 'C++', 'JavaScript', 'Swift', 'Kotlin', 'Django', 'Flask', 'Spring', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'OpenCV', 'Unity', 'Unreal Engine', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Raspberry Pi', 'Arduino', 'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Elasticsearch', 'GraphQL', 'RESTful APIs', 'Blockchain', 'Solidity', 'Smart Contracts', 'Hadoop', 'Spark', 'Hive', 'Kafka', 'RabbitMQ', 'Ansible', 'Chef', 'Puppet', 'Git', 'CI/CD', 'Jenkins', 'Travis CI', 'CircleCI', 'SonarQube', 'JIRA', 'Trello', 'Slack', 'GitLab', 'Bitbucket', 'GitHub', 'Microsoft Teams', 'Discord', 'Zoom', 'Microsoft Azure DevOps'];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDomainChange = (event, values) => {
    setFormData({ ...formData, domain: values });
  };

  const handleTechnologyChange = (event, values) => {
    setFormData({ ...formData, technology: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.createProject(formData);
      // Reset form after successful submission
      setFormData({
        name: '',
        semester: '',
        domain: [],
        technology: [],
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
        <Autocomplete
          multiple
          options={domains}
          value={formData.domain}
          onChange={handleDomainChange}
          renderInput={(params) => (
            <TextField {...params} label="Domain" margin="normal" fullWidth />
          )}
        />
        <Autocomplete
          multiple
          options={technologies}
          value={formData.technology}
          onChange={handleTechnologyChange}
          renderInput={(params) => (
            <TextField {...params} label="Technology" margin="normal" fullWidth />
          )}
        />
        <TextField
          name="githubLink"
          label="GitHub Link"
          value={formData.githubLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" sx = {{ color: 'white', mt: 2}} fullWidth size="large">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProjectForm;