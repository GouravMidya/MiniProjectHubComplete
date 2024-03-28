// NotFound.js
import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        height: '90vh', // Set the container height to full viewport height
      }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found 
      </Typography>
      <Typography>
        Oops! The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
