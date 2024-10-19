const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Points = require('../models/points');


const addPoint = async (req, res) => {
    try {
      const { username } = req.body;
  
      // Create a filter for the document to update
      const filter = { username: username }; // Use the username from the request body
  
      // Create an update document to increment cookingPoints by 1
      const updateDoc = {
        $inc: {
          cookingPoints: 1, // Increment the cookingPoints field by 1
        },
      };
  
      // Update a single document
      const result = await collection.updateOne(filter, updateDoc);
  
      // Check if a document was modified
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Points added successfully' }); // Changed to 200 for success
      } else {
        res.status(404).json({ message: 'User not found or points not updated' });
      }
    } catch (error) {
      console.error('Error updating points:', error);
      res.status(500).json({ error: 'Failed to add points', details: error.message });
    }
  };
  

// Add point function
const pointLookup = async (req, res) => {
    try {
        // Destructure the points from the request body
        const { username, cookingPoints, financePoints, stressPoints, careerPoints } = req.body;

        // Ensure the username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        // Fetch the existing points for the user
        const userPoints = await Points.findOne({ username });
        
        if (!userPoints) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update points
        userPoints.cookingPoints += cookingPoints || 0; // Add points or default to 0
        userPoints.financePoints += financePoints || 0;
        userPoints.stressPoints += stressPoints || 0;
        userPoints.careerPoints += careerPoints || 0;

        // Calculate the total points
        const total = userPoints.cookingPoints + userPoints.financePoints + userPoints.stressPoints + userPoints.careerPoints;

        // Update the user points in the database
        await userPoints.save();

        // Return the updated points and total
        return res.status(200).json({
            message: "Points updated successfully.",
            points: {
                cookingPoints: userPoints.cookingPoints,
                financePoints: userPoints.financePoints,
                stressPoints: userPoints.stressPoints,
                careerPoints: userPoints.careerPoints,
                totalPoints: total
            }
        });

    } catch (error) {
        console.error("Error updating points:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


module.exports = {
  signup,
  login,
};
