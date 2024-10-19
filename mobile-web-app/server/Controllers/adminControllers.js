const { v4: uuidv4 } = require('uuid');
const Admin = require('../Models/Admin');

const signup = async (req, res) => {
  try {
    const { username } = req.body; // No password needed
    console.log(Admin);

    // Validate input
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Check if username already exists
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Generate unique user ID
    const userId = uuidv4();

    // Create new user
    const newAdmin = await Admin.create({
      user_id: userId,
      username,
    });

    res.status(201).json({ message: 'User created successfully', user_id: newAdmin.user_id });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

module.exports = {
  signup
};
