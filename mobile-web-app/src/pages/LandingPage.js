import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import EmergencyButton from '../components/EmergencyButton';
import logo from '../LOGO.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleQuickAccess = () => {
    navigate('/dashboard');
  };

  const handleAdminAccess = () => {
    navigate('/admin');
  };

  return (
    <div>
      {/* Static Logo in the top left */}
      <Box sx={{ position: 'absolute', top: '80px', left: '16px' }}>
        <img 
          src={logo} 
          alt="Support App Logo" 
          style={{ width: '80px', height: '40px', cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        />
      </Box>

      <Container maxWidth="sm" sx={{ marginTop: '80px' }}>
        {/* Emergency Button at the top */}
        <EmergencyButton />

        {/* Welcome and Description Section */}
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to STORM Virtual Drop-In Center
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Get the support you need, when you need it.
        </Typography>

        {/* Sign In and Sign Up Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button variant="contained" color="primary" component={Link} to="/signin">
            Sign In
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/register">
            Sign Up
          </Button>
        </Box>

        {/* Quick Access Button */}
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleQuickAccess}
          fullWidth
          sx={{ mt: 2 }}
        >
          Quick Access to User Dashboard
        </Button>

        {/* New Admin Access Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAdminAccess}
          fullWidth
          sx={{ mt: 2 }}
        >
          Admin Access
        </Button>
      </Container>
    </div>
  );
};

export default LandingPage;