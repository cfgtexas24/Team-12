import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Error } from '@mui/icons-material';

const EmergencyButton = () => {
  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<Error />}
      component={Link}
      to="/emergency"
      sx={{
        position: 'fixed',
        top: '20px',
        right: '20px',
      }}
    >
      Emergency
    </Button>
  );
};

export default EmergencyButton;