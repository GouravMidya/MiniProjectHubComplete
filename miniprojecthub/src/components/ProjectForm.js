import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Autocomplete } from '@mui/material';
import apiService from '../services/apiService';
import LoadingButton from '@mui/lab/LoadingButton';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    domain: [],
    technology: [],
    githubLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Add isSubmitting state

  const domains = ['Web Development','Mobile Development','Data Science','AI/ML','Cybersecurity','DevOps','Game Development','Cloud Computing','IoT','Big Data','Blockchain','AR/VR Development','Desktop Applications','Embedded Systems','Quantum Computing','Bioinformatics','Health Tech','FinTech','Educational Technology','E-commerce','Social Media','Content Management Systems (CMS)','Search Engine Optimization (SEO)','Digital Marketing','Gaming','Animation','Virtual Assistants','Robotics','Natural Language Processing (NLP)','Computer Vision','Human-Computer Interaction (HCI)','Ethical Hacking','Network Security','Information Assurance','Cryptography','Digital Forensics','Security Operations','Privacy Engineering','Penetration Testing','Malware Analysis','Reverse Engineering','Security Compliance','Threat Intelligence','Other'
  ];

  const technologies = ['React','Angular','Next.Js','Vue.js','Node.js','Python','Java','C++','JavaScript','Swift','Kotlin','Django','Flask','Spring','TensorFlow','PyTorch','Keras','Scikit-learn','Pandas','NumPy','Matplotlib','OpenCV','Unity','Unreal Engine','Docker','Kubernetes','AWS','Azure','Google Cloud','Firebase','Raspberry Pi','Arduino','MongoDB','MySQL','PostgreSQL','SQLite','Redis','Elasticsearch','GraphQL','RESTful APIs','Blockchain','Solidity','Smart Contracts','Hadoop','Spark','Hive','Kafka','RabbitMQ','Ansible','Chef','Puppet','Git','CI/CD','Jenkins','Travis CI','CircleCI','SonarQube','JIRA','Trello','Slack','GitLab','Bitbucket','GitHub','Microsoft Teams','Discord','Zoom','Microsoft Azure DevOps','PHP','HTML','CSS', 'Other'
  ];

  const semesters = ['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6','Sem 7&8','Leisure'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDomainChange = (event, values) => {
    setFormData({ ...formData, domain: values });
  };

  const handleTechnologyChange = (event, values) => {
    setFormData({ ...formData, technology: values });
  };

  const handleSemesterChange = (event, value) => {
    setFormData({ ...formData, semester: value });
  };

  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true before submitting

    // Check if any required field is empty
    const { name, semester, domain, technology, githubLink } = formData;
    if (!name || !semester || domain.length === 0 || technology.length === 0) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false); // Set isSubmitting to false if form is not valid
      return;
    }

    // Validate GitHub link
    const isValidLink =
      githubLink.startsWith('https://github.com/') || githubLink.startsWith('http://github.com/');
    if (!isValidLink && githubLink.trim() !== '') {
      alert('Please enter a valid GitHub repository link.');
      setIsSubmitting(false); // Set isSubmitting to false if form is not valid
      return;
    }

    try {
       // Introduce a delay of 2000 milliseconds (2 seconds)
      // await delay(2000);


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
    } finally {
      setIsSubmitting(false); // Set isSubmitting to false after submission is complete
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '2rem auto', padding: '2rem' }}>
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
          disabled={isSubmitting} // Disable the input fields while submitting
        />
        <Autocomplete
          options={semesters}
          value={formData.semester}
          onChange={handleSemesterChange}
          renderInput={(params) => (
            <TextField {...params} label="Semester" margin="normal" fullWidth />
          )}
          disabled={isSubmitting} // Disable the input fields while submitting
        />
        <Autocomplete
          multiple
          options={domains}
          value={formData.domain}
          onChange={handleDomainChange}
          renderInput={(params) => (
            <TextField {...params} label="Domain" margin="normal" fullWidth />
          )}
          disabled={isSubmitting} // Disable the input fields while submitting
        />
        <Autocomplete
          multiple
          options={technologies}
          value={formData.technology}
          onChange={handleTechnologyChange}
          renderInput={(params) => (
            <TextField {...params} label="Technology" margin="normal" fullWidth />
          )}
          disabled={isSubmitting} // Disable the input fields while submitting
        />
        <TextField
          name="githubLink"
          label="GitHub Link"
          value={formData.githubLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={isSubmitting} // Disable the input fields while submitting
        />
        {/* <Button type="submit" variant="contained" sx={{ color: 'white', mt: 2 }} fullWidth size="large">
          Submit
        </Button> */}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {isSubmitting ? (
            <LoadingButton loading variant="outlined" fullWidth>
              Submit
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              variant="contained"
              sx={{ color: 'white' }}
              fullWidth
              size="large"
            >
              Submit
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default ProjectForm;