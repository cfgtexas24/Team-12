import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, Typography, Box } from '@mui/material';

const ApplicantTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [expandedRows, setExpandedRows] = useState({});

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
        file: null,
      },
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
                    <TableCell colSpan={4}>
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
    </div>
  );
};

export default ApplicantTable;
