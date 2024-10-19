import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Error } from '@mui/icons-material';
import '../App.css'; 

const EmergencyBanner = () => {
  return (
    <Button
      variant="contained"
      color="error"
      component={Link}
      to="/emergency"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'var(--color-secondary)', 
        color: 'var(--color-secondary)', 
        padding: '15px 0',
        fontSize: '18px',
        fontWeight: 'bold',
        border: '4px solid',
        borderColor: 'var(--color-primary)', 
        textAlign: 'center',
        zIndex: 1000, 
        '&:hover': {
          backgroundColor: 'var(--color-primary)', 
        }
      }}
    >
      <Error sx={{ marginRight: '10px' }} /> Click Here for Emergency
    </Button>
  );
};

export default EmergencyBanner;
