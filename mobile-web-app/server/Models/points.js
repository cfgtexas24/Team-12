const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  cookingPoints: {
    type: int,
    required: true,
  },
  financePoints: {
    type: int,
    required: true,
  },
  stressPoints: {
    type: int,
    required: true,
  },
  careerPoints: {
    type: int,
    required: true,
  }
});

const Points = mongoose.model('Points', pointsSchema);

module.exports = Points;
