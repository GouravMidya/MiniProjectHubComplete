import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          MiniProject Hub
        </Typography>
        <Box>
          <Button component={Link} to="/form" sx = {{ color: 'white'}}  variant="outlined">
            Submit Project
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;