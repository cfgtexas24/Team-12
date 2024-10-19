// controllers/userControllers.js
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Client = require('../Models/Client');
const { ClientType } = require('../Models/ClientType');

// Signup function

// {
//   "first_name": "abc",
//   "last_name": "abc",
//   "client_type": 0,
//   "password": "tomtom",
//   "username": "abc",
//   "email": "abc@gmail.com",
//   "preferred_attributes": "abc",
//   "phone_number": "1234556789",
//   "occupation": "developer",
//   "years_of_experience": "2",
//   "reason_for_application": "I need money sir"

// }


const salt = "$2b$10$EixZaYVKm8U8fZ1Zb8uGu.";

const signup = async (req, res) => {
  try {
    const { first_name, last_name,  username, password, client_type } = req.body;

    // Validate input
    if (!first_name || !last_name || !username || !password || client_type === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate user_type
    if (![ClientType.MENTOR, ClientType.MENTEE].includes(client_type)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    // Check if username already exists
    const existingUser = await Client.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Generate unique user ID and hash the password
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    const newUser = await Client.create({
      user_id: userId,
      client_type,
      first_name,
      last_name,
      username,
      password: hashedPassword,
      ...req.body
    });

    res.status(201).json({ message: 'User created successfully', user_id: newUser.user_id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body; // Corrected: removed await

    // Find the user by username
    const current_user = await Client.findOne({ username });
    
    // Check if the user exists
    if (!current_user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = (current_user.password == password);
    
    if (isMatch) {
      req.session.user_id = current_user._id.toString();  // Store user ID in session
      req.session.client_type = current_user.client_type; 
      console.log('Session data:', req.session);
      return res.status(200).json({ message: 'Logged in successfully' });
    } else {
      return res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: 'Invalid request' });
  }
};

const getusers = async (req, res) => {
  try {
    const data = await Client.find(); 
    res.status(200).json(data.map(user => ({
      Name: user.name,
      Username: user.username
      
    }))); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getuser = async (req, res) => {

  const username = await req.params.username

  try {
    const data = await Client.findOne( {username} ); 
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  getusers,
  getuser,
  login
};