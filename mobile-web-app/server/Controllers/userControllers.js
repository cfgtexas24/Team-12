const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

// Signup function
const signup = async (req, res) => {
  try {
    const { name, username, password, user_type } = req.body;

    // Validate input
    if (!name || !username || !password || user_type === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate user_type
    if (![0, 1, 2].includes(user_type)) {
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
    const newUser = await User.create({
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

// Login function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user_id: user.user_id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login', details: error.message });
  }
};

module.exports = {
  signup,
  login,
};
