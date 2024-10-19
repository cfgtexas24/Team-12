import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Typography } from '@mui/material';
import '../styles/App.css';

const EmergencyContact = () => {
  const [formData, setFormData] = useState({
    first_name: '', 
    last_name: '', 
    email: '',
    phone: '',
    message: '',
    category: '',
    otherCategory: '',
  });

  const [errors, setErrors] = useState({
    phone: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phone') {
      const phoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/; 
      if (!phoneRegex.test(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, phone: 'Invalid phone number' }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!errors.phone) {
      console.log(formData);
      // Navigate to confirmation page
      navigate('/confirmation');
    } else {
      alert('Please fix the errors before submitting');
    }
  };

  return (
    <Container
      maxWidth="sm"
      className="primary-background" 
    >
      <Typography variant="h4" gutterBottom>
        Emergency Contact Form
      </Typography>
      <Typography variant="body1" paragraph>
        Please fill out your emergency message and select the relevant category.
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* First Name Input */}
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          size="small"
        />

        {/* Last Name Input */}
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          size="small"
        />

        {/* Email Input */}
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          size="small"
        />

        {/* Phone Number Input */}
        <TextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          size="small"
          error={!!errors.phone} // Show error if there's an error
          helperText={errors.phone && errors.phone} // Display error message
        />

        {/* Message Input */}
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          multiline
          rows={3}
          size="small"
          sx={{
            maxHeight: '100px',
            overflow: 'auto',
          }}
        />

        {/* Category dropdown */}
        <FormControl fullWidth margin="normal" variant="outlined" size="small">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
            required
          >
            <MenuItem value="housing">Housing</MenuItem>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="unaccompanied_minor">Unaccompanied Minor</MenuItem>
            <MenuItem value="assault">Assault</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        {/* if other selected, they can input text */}
        {formData.category === 'other' && (
          <TextField
            label="Please specify"
            name="otherCategory"
            value={formData.otherCategory}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            size="small"
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EmergencyContact;
