import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MentorApply = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    experience: 0,
    reason: '',
    preferredMenteeAttributes: '',
    file: null,
  });

  const [isReasonOverLimit, setIsReasonOverLimit] = useState(false);
  const [isMenteeAttributesOverLimit, setIsMenteeAttributesOverLimit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'reason' && value.length > 300) {
      setIsReasonOverLimit(true);
    } else if (name === 'reason') {
      setIsReasonOverLimit(false);
    }

    if (name === 'preferredMenteeAttributes' && value.length > 300) {
      setIsMenteeAttributesOverLimit(true);
    } else if (name === 'preferredMenteeAttributes') {
      setIsMenteeAttributesOverLimit(false);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isReasonOverLimit && !isMenteeAttributesOverLimit) {
      console.log(formData);
      setIsSubmitted(true);
    } else {
      alert('Please reduce the character count in the fields to below 300 characters.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      {isSubmitted ? (
        <Typography variant="h4" component="h1" gutterBottom>
          We've received your application.
        </Typography>
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Mentor Application
          </Typography>
          <Typography variant="body1" paragraph>
            Please fill out the form below and upload your resume to apply as a mentor. 
            This form helps us match you with mentees who will benefit the most from your expertise.
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Years of Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={2}
                  label="Why do you want to be a mentor?"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  helperText={`${formData.reason.length}/300`}
                  error={isReasonOverLimit}
                  InputProps={{
                    style: {
                      borderColor: isReasonOverLimit ? 'red' : undefined,
                    }
                  }}
                  FormHelperTextProps={{
                    style: {
                      color: isReasonOverLimit ? 'red' : undefined,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="What qualities do you look for in a mentee?"
                  name="preferredMenteeAttributes"
                  value={formData.preferredMenteeAttributes}
                  onChange={handleChange}
                  helperText={`${formData.preferredMenteeAttributes.length}/300`}
                  error={isMenteeAttributesOverLimit}
                  InputProps={{
                    style: {
                      borderColor: isMenteeAttributesOverLimit ? 'red' : undefined,
                    }
                  }}
                  FormHelperTextProps={{
                    style: {
                      color: isMenteeAttributesOverLimit ? 'red' : undefined,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                >
                  Upload Resume
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </Button>
                {formData.file && (
                  <Typography variant="body2" sx={{ marginTop: '10px' }}>
                    Uploaded File: {formData.file.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isReasonOverLimit || isMenteeAttributesOverLimit}
                >
                  Submit Application
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};

export default MentorApply;
