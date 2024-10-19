import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmergencyButton from '../components/EmergencyButton';
import ApplicantTable from '../components/ApplicantTable';
import logo from "../LOGO.png";
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  IconButton,
  Box,
} from '@mui/material';
import { 
  Settings as SettingsIcon
} from '@mui/icons-material';

const AdminLandingPage = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin User");

  useEffect(() => {
    console.log('AdminLandingPage component has been rendered');
  }, []); // Empty dependency array ensures this runs only on mount

  const handleOpenSettingsDialog = () => {
    // Implement settings dialog logic here
    console.log("Open settings dialog");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Emergency Button at the top */}
      <EmergencyButton />

      {/* Static Logo in the top left */}
      <Box sx={{ position: 'absolute', top: '80px', left: '16px' }}>
        <img 
          src={logo} 
          alt="Support App Logo" 
          style={{ width: '80px', height: '40px', cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <IconButton onClick={handleOpenSettingsDialog} size="small">
          <SettingsIcon />
        </IconButton>
      </Box>
      <Grid container spacing={3}>
        {/* Admin Dashboard */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography component="p" variant="h4">
              Welcome back!
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Admin: {adminName}
            </Typography>
            <Typography component="p" variant="body1">
              Manage applicants and system settings
            </Typography>
          </Paper>
        </Grid>
        
        {/* Applicant Summary */}
        <Grid item xs={12} md={6} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Applicant Summary
            </Typography>
            {/* You can add a summary of applicant statistics here */}
            <Typography component="p" variant="body1">
              Total Applicants: X
            </Typography>
            <Typography component="p" variant="body1">
              Pending Reviews: Y
            </Typography>
            <Typography component="p" variant="body1">
              Approved: Z
            </Typography>
          </Paper>
        </Grid>
        
        {/* Applicant Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Applicant Table
            </Typography>
            <ApplicantTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminLandingPage;