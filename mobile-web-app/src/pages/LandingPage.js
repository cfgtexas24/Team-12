import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import EmergencyButton from '../components/EmergencyButton';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleQuickAccess = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '80px' }}>
      <EmergencyButton />
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Support App
      </Typography>
      <Typography variant="body1" paragraph>
        Get the support you need, when you need it.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/signin">
          Sign In
        </Button>
        <Button variant="outlined" color="primary" component={Link} to="/register">
          Sign Up
        </Button>
      </Box>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleQuickAccess}
        fullWidth
        sx={{ mt: 2 }}
      >
        Quick Access to User Dashboard
      </Button>
    </Container>
  );
};

export default LandingPage;