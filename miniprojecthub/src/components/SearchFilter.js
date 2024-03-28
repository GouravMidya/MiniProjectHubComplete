import React, { useState } from 'react';
import { Box, TextField, Autocomplete, Button, Grid } from '@mui/material';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    semester: [],
    domain: [],
    technology: [],
  });

  const semesters = ['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6','Sem 7&8','Leisure'];
  const domains = ['Web Development', 'Mobile Development', 'Data Science', 'AI/ML', 'Cybersecurity', 'DevOps', 'Game Development', 'Cloud Computing', 'IoT', 'Big Data', 'Blockchain', 'AR/VR Development', 'Desktop Applications', 'Embedded Systems', 'Quantum Computing', 'Bioinformatics', 'Health Tech', 'FinTech', 'Educational Technology', 'E-commerce', 'Social Media', 'Content Management Systems (CMS)', 'Search Engine Optimization (SEO)', 'Digital Marketing', 'Gaming', 'Animation', 'Virtual Assistants', 'Robotics', 'Natural Language Processing (NLP)', 'Computer Vision', 'Human-Computer Interaction (HCI)', 'Ethical Hacking', 'Network Security', 'Information Assurance', 'Cryptography', 'Digital Forensics', 'Security Operations', 'Privacy Engineering', 'Penetration Testing', 'Malware Analysis', 'Reverse Engineering', 'Security Compliance', 'Threat Intelligence', 'Other'];

  const technologies = ['React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java', 'C++', 'JavaScript', 'Swift', 'Kotlin', 'Django', 'Flask', 'Spring', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'OpenCV', 'Unity', 'Unreal Engine', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Firebase', 'Raspberry Pi', 'Arduino', 'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis', 'Elasticsearch', 'GraphQL', 'RESTful APIs', 'Blockchain', 'Solidity', 'Smart Contracts', 'Hadoop', 'Spark', 'Hive', 'Kafka', 'RabbitMQ', 'Ansible', 'Chef', 'Puppet', 'Git', 'CI/CD', 'Jenkins', 'Travis CI', 'CircleCI', 'SonarQube', 'JIRA', 'Trello', 'Slack', 'GitLab', 'Bitbucket', 'GitHub', 'Microsoft Teams', 'Discord', 'Zoom', 'Microsoft Azure DevOps', 'Other'];


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (field, values) => {
    setFilterOptions({ ...filterOptions, [field]: values });
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilter = () => {
    onFilter(filterOptions);
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            size="large"
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            multiple
            options={semesters}
            value={filterOptions.semester}
            onChange={(event, values) => handleFilterChange('semester', values)}
            renderInput={(params) => (
              <TextField {...params} label="Semester" margin="normal" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            multiple
            options={domains}
            value={filterOptions.domain}
            onChange={(event, values) => handleFilterChange('domain', values)}
            renderInput={(params) => (
              <TextField {...params} label="Domain" margin="normal" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            multiple
            options={technologies}
            value={filterOptions.technology}
            onChange={(event, values) => handleFilterChange('technology', values)}
            renderInput={(params) => (
              <TextField {...params} label="Technology" margin="normal" fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFilter}
            fullWidth
            size="large"
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchFilter;