const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const Points = require('../Models/points');


const addPoint = async (req, res) => {
    try {
      const { username, lesson } = req.query;
      console.log(username)
      console.log(lesson)
  
      // Create a filter for the document to update
      const filter = { username: username }; // Use the username from the request body
  
      // Create an update document to increment cookingPoints by 1
      // const updateDoc = {
      // $inc: {
      //   cookingPoints: 1, // Increment the cookingPoints field by 1
      // }

      if (lesson === 'cookingPoints') {
        updateDoc = {
          $inc: {
            cookingPoints: 1, // Increment the cookingPoints field by 1
          },
        };
        const result = await Points.updateOne(filter, updateDoc);
      } else if (lesson === 'careerPoints') {
        const updateDoc = {
          $inc: {
            careerPoints: 1, // Increment the cookingPoints field by 1
          },
        };
        const result = await Points.updateOne(filter, updateDoc);
      } else if (lesson === 'stressPoints') {
        const updateDoc = {
          $inc: {
            stressPoints: 1, // Increment the cookingPoints field by 1
          },
        };
        const result = await Points.updateOne(filter, updateDoc);
      } else if (lesson === 'financePoints') {
        const updateDoc = {
          $inc: {
            financePoints: 1, // Increment the cookingPoints field by 1
          },
        };
        const result = await Points.updateOne(filter, updateDoc);
      }
      
  
      // Update a single document
      // const result = await Points.updateOne(filter, updateDoc);
  
      // Check if a document was modified
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Points added successfully' }); // Changed to 200 for success
      } else {
        console.log("Not incremented sucessfully")
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
      // console.log(req)
      // console.log(req.query)
        // Destructure the points from the request body
        const { username } = req.query;
        // console.log(username)

        // Ensure the username is provided
        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        // Fetch the existing points for the user
        const userPoints = await Points.findOne({ "username": username });
        // console.log(userPoints)
        
        if (!userPoints) {
            return res.status(404).json({ message: "User not found." });
        }

        // Calculate the total points
        const total = userPoints.cookingPoints + userPoints.financePoints + userPoints.stressPoints + userPoints.careerPoints;

        // Update the user points in the database
        await userPoints.save();

        // Return the updated points and total
        return res.status(200).json({
            message: "Points retrieved successfully.",
            points: {
                Cooking: userPoints.cookingPoints,
                FinancialLiteracy: userPoints.financePoints,
                StressManagement: userPoints.stressPoints,
                CareerReadiness: userPoints.careerPoints,
                total: total
            }
        });

    } catch (error) {
        console.error("Error updating points:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


module.exports = {
  addPoint,
  pointLookup,
};
