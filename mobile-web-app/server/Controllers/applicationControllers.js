// Import your Message model
const { v4: uuidv4 } = require('uuid');
const Application = require('../Models/Application');

// Controller to handle sending a message

const createAuth = (req, res, next) => {
  // Check if session and user_id exist
  if (!req.session || !req.session.user_id) {
    console.log('Session or user_id not found:', req.session);  // Log session content
    return res.status(401).json({ message: 'Unauthorized, please log in' });
  }

  // Log the session to ensure user_id and client_type exist
  console.log('Session data in createAuth:', req.session);

  // Assign session values to request object for further processing
  req.user_id = req.session.user_id;
  req.client_type = req.session.client_type;

  next(); // Proceed to the next middleware or route
};


// {
//     "application_details":  "Always jiggy yunno"
// }

const createApplication = async (req, res) => {
  const { details } = req.body;

  console.log(details);

  const applicantion_id = uuidv4();

  try {
    // Create a new application with the user ID from the request object
    const application = new Application({
      application_id: applicantion_id,
      application_type: req.session.client_type, 
      applicant_id: req.session.user_id, // Get the user ID from the request object
      details: details,
      timestamp: new Date()
    });

    // Save the message to the database
    await application.save();

    // Respond with success
    res.status(200).json({ message: 'Application created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createApplication, createAuth };