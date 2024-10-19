import React from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { Home, Restaurant, Security, Help } from '@mui/icons-material';

const ContactBox = ({ title, icon, phone, email, color }) => (
  <Paper elevation={3} sx={{ p: 3, height: '100%', backgroundColor: color, color: 'white' }}>
    <Box display="flex" flexDirection="column" height="100%">
      <Box display="flex" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h5" component="h2" ml={1}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body1" mb={2}>
        Phone: {phone}
      </Typography>
      <Typography variant="body1" mb={2}>
        Email: {email}
      </Typography>
      <Button variant="contained" color="inherit" sx={{ mt: 'auto', color: color }}>
        Contact Now
      </Button>
    </Box>
  </Paper>
);

const Contact = () => {
  const contacts = [
    { title: 'Housing', icon: <Home fontSize="large" />, phone: '(123) 456-7890', email: 'housing@example.com', color: '#4CAF50' },
    { title: 'Food', icon: <Restaurant fontSize="large" />, phone: '(234) 567-8901', email: 'food@example.com', color: '#FFA000' },
    { title: 'Assault', icon: <Security fontSize="large" />, phone: '(345) 678-9012', email: 'assault@example.com', color: '#F44336' },
    { title: 'Other', icon: <Help fontSize="large" />, phone: '(456) 789-0123', email: 'other@example.com', color: '#2196F3' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center" mb={4}>
        Contact Information
      </Typography>
      <Grid container spacing={4}>
        {contacts.map((contact, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ContactBox {...contact} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Contact;