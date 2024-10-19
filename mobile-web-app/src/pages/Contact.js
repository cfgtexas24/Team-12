import React from 'react';
import { Container, Grid, Paper, Typography, Box, Button, Grow } from '@mui/material';
import { Home, Restaurant, Security, Help } from '@mui/icons-material';

const ContactBox = ({ title, icon, phone, email, color }) => (
  <Grow in={true} timeout={1000}>
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        height: '100%', 
        backgroundColor: color, 
        color: 'white',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: 8, // Using a number instead of theme.shadows[10]
        },
      }}
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" mb={2}>
          {React.cloneElement(icon, { sx: { fontSize: 40, marginRight: 2 } })}
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" mb={2}>
          Phone: {phone}
        </Typography>
        <Typography variant="body1" mb={2}>
          Email: {email}
        </Typography>
        <Button 
          variant="contained" 
          color="inherit" 
          sx={{ 
            mt: 'auto', 
            color: color, 
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Contact Now
        </Button>
      </Box>
    </Paper>
  </Grow>
);

const Contact = () => {
  const contacts = [
    { 
      title: 'Housing', 
      icon: <Home fontSize="large" />, 
      phone: '(214) 555-7890', 
      email: 'housing@dallasmutualaid.org', 
      color: '#4CAF50' 
    },
    { 
      title: 'Food', 
      icon: <Restaurant fontSize="large" />, 
      phone: '(214) 555-8901', 
      email: 'food@dallasfoodbank.org', 
      color: '#FFA000' 
    },
    { 
      title: 'Assault', 
      icon: <Security fontSize="large" />, 
      phone: '(214) 555-9012', 
      email: 'support@dallasassaulthelp.org', 
      color: '#F44336' 
    },
    { 
      title: 'Other', 
      icon: <Help fontSize="large" />, 
      phone: '(214) 555-0123', 
      email: 'info@dallassupport.org', 
      color: '#2196F3' 
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grow in={true} timeout={1000}>
        <Typography variant="h3" component="h1" gutterBottom textAlign="center" mb={4}>
          Contact Information
        </Typography>
      </Grow>
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