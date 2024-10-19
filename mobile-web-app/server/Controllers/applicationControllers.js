// Import your Message model
const { v4: uuidv4 } = require('uuid');
const Application = require('../Models/Application');

// Controller to handle sending a message


// {
//     "application_details":  "Always jiggy yunno"
// }

const createApplication = async (req, res) => {
  const { text } = req.body;

  // Check if user is logged in (i.e., session contains user_id)
  if (!req.session.user_id) {
    return res.status(401).json({ message: 'Unauthorized, please log in' });
  }

  const applicant_id = uuidv4();

  try {
    // Create a new message with the user ID from the session
    const application = new Application({
      application_id: applicant_id,
      applicantion_type: req.session.client_type, 
      user_id: req.session.user_id, // Get the user ID from the session
      application_details: text,
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

module.exports = {
  createApplication
};
