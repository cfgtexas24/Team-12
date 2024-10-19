const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  cookingPoints: {
    type: Number,
    required: true,
  },
  financePoints: {
    type: Number,
    required: true,
  },
  stressPoints: {
    type: Number,
    required: true,
  },
  careerPoints: {
    type: Number,
    required: true,
  }
});

const Points = mongoose.model('points', pointsSchema);

module.exports = Points;
