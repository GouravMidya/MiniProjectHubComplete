import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Semester: {project.semester}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Domain: {project.domain.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Technology: {project.technology.join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            GitHub Link
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;