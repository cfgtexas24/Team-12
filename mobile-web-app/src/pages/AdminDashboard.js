import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import EmergencyButton from '../components/EmergencyButton';
import ApplicantTable from '../components/ApplicantTable';



const AdminLandingPage = () => {
  useEffect(() => {
    console.log('AdminLandingPage component has been rendered');
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div>
      {/* Static Logo in the top left */}
      <Box sx={{ position: 'absolute', top: '80px', left: '16px' }}>
        <img 
          src={logo} 
          alt="Support App Logo" 
          style={{ width: '80px', height: '40px', cursor: 'pointer' }} 
          // You can add a navigation function here if needed
        />
      </Box>

      <Container maxWidth="lg" sx={{ marginTop: '80px' }}>
        {/* Emergency Button at the top */}
        <EmergencyButton />

        {/* Applicant Table Section */}
        <Box sx={{ marginY: 4 }}>
          <ApplicantTable />
        </Box>
      </Container>
    </div>
  );
};

export default AdminLandingPage;
