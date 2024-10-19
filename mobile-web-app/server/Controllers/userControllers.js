// controllers/userControllers.js
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Client = require('../Models/Client');
const { ClientType } = require('../Models/ClientType');

// Signup function
const signup = async (req, res) => {
  try {
    const { name, username, password, user_type } = req.body;

    // Validate input
    if (!name || !username || !password || user_type === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate user_type
    if (![ClientType.MENTOR, ClientType.MENTEE].includes(user_type)) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Generate unique user ID and hash the password
    const userId = uuidv4();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await Client.create({
      user_id: userId,
      user_type,
      name,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user_id: newUser.user_id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
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
  getuser
};