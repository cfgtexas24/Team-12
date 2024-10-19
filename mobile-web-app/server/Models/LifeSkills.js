const mongoose = require('mongoose');

const lifeSkillSchema = new mongoose.Schema({
  lifeskill_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const LifeSkill = mongoose.model('LifeSkill', lifeSkillSchema);

module.exports = LifeSkill;
