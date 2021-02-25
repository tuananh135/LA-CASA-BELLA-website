const mongoose = require('mongoose');

const BackgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Background = mongoose.model('Background', BackgroundSchema);

module.exports = Background;
