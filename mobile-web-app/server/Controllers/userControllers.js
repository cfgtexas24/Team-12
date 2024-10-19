// controllers/userController.js
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const UserType = require('../Models/UserType');

// Signup function
const signup = async (req, res) => {
  try {
    const { name, username, password, user_type } = req.body;



    if (user_type > 2) {
      return res.status(400).json({ error: 'Invalid user type' });
    }

    // // Check if username already exists
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(400).json({ error: 'Username already taken' });
    // }

    // Generate unique user ID and hash the password
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser =  await User.create({
      user_id: userId,
      user_type,
      name,
      username,
      password: hashedPassword,
    });

    // Save user to the database
  console.log(newUser);

    res.status(201).json({ message: 'User created successfully', user_id: newUser.user_id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

module.exports = {
  signup,
};
