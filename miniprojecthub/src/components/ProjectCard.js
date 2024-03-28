import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ height: 225, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Semester: {project.semester}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Domain: {project.domain.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Technology: {project.technology.join(', ')}
          </Typography>
          <Box mt="auto">
            <Typography variant="body2" color="text.secondary">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                GitHub Link
              </a>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;