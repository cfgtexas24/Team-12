import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import EmergencyButton from '../components/EmergencyButton';
import '../styles/App.css';
import logo from "../LOGO.png"

const Logon = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
      
        // Redirect to UserLandingPage
        navigate('/dashboard');
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    
    <div style={{ 
      maxWidth: '800px', 
      margin: '50px auto', // Center the form and push it down
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center' // Center items within the container
    }}>
      <Box sx={{ position: 'absolute', top: '80px', left: '16px' }}>
        <img 
          src={logo} 
          alt="Support App Logo" 
          style={{ width: '80px', height: '40px', cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        />
      </Box>
      {/* Emergency Button at the top */}
      <EmergencyButton />
      <h2 style={{ fontSize: '26px' }}>Log in</h2>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label style={{ fontSize: '26px' }}>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', // Full width
              padding: '12px', 
              fontSize: '18px', // Increased font size
              marginTop: '5px' 
            }}
          />
        </div>
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <label style={{ fontSize: '26px' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', // Full width
              padding: '12px', 
              fontSize: '18px', // Increased font size
              marginTop: '5px' 
            }}
          />
        </div>
        <button type="submit" style={{ padding: '12px', width: '100%', fontSize: '18px' }}>
          Log In
        </button>
        
        {/* Forgot Password Link */}
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <a 
            href="/forgotpassword" 
            style={{ 
              fontSize: '16px', 
              color: 'blue', 
              textDecoration: 'none', 
              cursor: 'pointer' 
            }}
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Logon;