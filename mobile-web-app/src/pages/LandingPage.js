import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';
import EmergencyButton from '../components/EmergencyButton';

const LandingPage = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '80px' }}>
      <EmergencyButton />
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Support App
      </Typography>
      <Typography variant="body1" paragraph>
        Get the support you need, when you need it.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/signin">
        Sign In
      </Button>
      <Button variant="outlined" color="primary" component={Link} to="/signup" sx={{ marginLeft: '10px' }}>
        Sign Up
      </Button>
    </Container>
  );
};

export default LandingPage;