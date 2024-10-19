import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ApplicantTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const form = useRef();

  useEffect(() => {
    // Sample data for testing
    const sampleApplicants = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        occupation: 'Engineer',
        experience: 5,
        reason: 'Looking to mentor someone in my field.',
        preferredMenteeAttributes: 'Eager to learn',
        role: 'Mentor',
        file: null,
      },
      {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        occupation: 'Designer',
        experience: 3,
        reason: 'Want to give back to the community.',
        preferredMenteeAttributes: 'Creative and curious',
        role: 'Mentee',
        file: null,
      },
      {
        _id: '3',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        phone: '555-123-4567',
        occupation: 'Developer',
        experience: 4,
        reason: 'Interested in sharing knowledge.',
        preferredMenteeAttributes: 'Motivated and curious',
        role: 'Mentor',
        file: null,
      },
      {
        _id: '4',
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob.brown@example.com',
        phone: '555-987-6543',
        occupation: 'Product Manager',
        experience: 6,
        reason: 'Looking to guide someone in product development.',
        preferredMenteeAttributes: 'Passionate about learning',
        role: 'Mentor',
        file: null,
      }
    ];

    setApplicants(sampleApplicants);
    const initialStatuses = sampleApplicants.reduce((acc, applicant) => {
      acc[applicant._id] = 'pending'; // Default status
      return acc;
    }, {});
    setStatuses(initialStatuses);
  }, []);

  const handleStatusChange = (applicantId, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [applicantId]: newStatus,
    }));

    if (newStatus === 'matched') {
      console.log("MATCHED DETECTED");
      setTimeout(() => {
        sendEmail(applicantId);
      }, 0); // Ensure state is updated before sending email
    }
  };

  const toggleRowExpansion = (applicantId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [applicantId]: !prevExpandedRows[applicantId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'darkgrey';
      case 'matched':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'inherit';
    }
  };

  const sendEmail = (applicantId) => {
    const applicant = applicants.find((app) => app._id === applicantId);
    if (!applicant) {
      console.error(`Applicant with ID ${applicantId} not found.`);
      return;
    }

    const templateParams = {
      to_name: `${applicant.firstName} ${applicant.lastName}`,
      to_email: applicant.email,
      message: `Congratulations ${applicant.firstName}, you have been matched!`,
    };

    emailjs
      .send(
        process.env.REACT_APP_MATCH_SERVICE_ID,
        process.env.REACT_APP_MATCH_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_MATCH_PUBLIC_KEY
      )
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setEmailStatusMessage('Notified User of Match!');
        setEmailDialogOpen(true);
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
        setEmailStatusMessage('Failed to send email. Please try again.');
        setEmailDialogOpen(true);
      });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Applicant Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell> {/* New column for role */}
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.map((applicant) => (
              <React.Fragment key={applicant._id}>
                <TableRow>
                  <TableCell>{applicant.firstName}</TableCell>
                  <TableCell>{applicant.lastName}</TableCell>
                  <TableCell>{applicant.role}</TableCell> {/* Display role */}
                  <TableCell>
                    <Select
                      value={statuses[applicant._id] || 'pending'}
                      onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                      sx={{
                        backgroundColor: getStatusColor(statuses[applicant._id]),
                        color: 'white',
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="matched">Matched</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => toggleRowExpansion(applicant._id)}>
                      {expandedRows[applicant._id] ? 'Collapse' : 'Expand'}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows[applicant._id] && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box p={2} border={1} borderColor="grey.300">
                        <Typography variant="h6">Details for {applicant.firstName} {applicant.lastName}</Typography>
                        <p><strong>Email:</strong> {applicant.email}</p>
                        <p><strong>Phone:</strong> {applicant.phone}</p>
                        <p><strong>Occupation:</strong> {applicant.occupation}</p>
                        <p><strong>Experience:</strong> {applicant.experience}</p>
                        <p><strong>Reason:</strong> {applicant.reason}</p>
                        <p><strong>Preferred Attributes:</strong> {applicant.preferredMenteeAttributes}</p>
                        <p><strong>File:</strong> {applicant.file ? <a href={applicant.file} download>Download</a> : 'No File'}</p>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)}>
        <DialogTitle>Email Status</DialogTitle>
        <DialogContent>
          <Typography>{emailStatusMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplicantTable;
