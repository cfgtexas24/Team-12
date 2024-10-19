import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/App.css';
import emailjs from '@emailjs/browser';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const form = useRef(); // Reference for the form
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(process.env.REACT_APP_EMAILJS_SERVICE_ID);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, 
        form.current, 
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Email sending failed...');
        }
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log(formData.password); // Log the password for debugging

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return; // Exit if passwords do not match
    }

    // Prepare the data to be sent
    const data = {
        name: "TEST",
        username: "TESTING", // Extract username
        password: "TESTING",    // Extract password
        user_type: 2
    };

    // TODO: FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
    // Make the POST request to the MongoDB endpoint
    await fetch('http://localhost:8000/signup', {
        method: 'POST', // Specify the request method
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data) // Convert the data to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        console.log('Success:', data); // Handle the success response
        alert('Signup successful!'); // Alert user on success
    })
    .catch((error) => {
        console.error('Error:', error); // Handle any errors
        alert('Signup failed. Please try again.'); // Alert user on failure
    });
};

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Register</h2>
      <form ref={form} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', width: '100%' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;