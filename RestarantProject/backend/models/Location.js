const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  city: String,
  state: String,
  zip_code: String
});

module.exports = mongoose.model('Location', locationSchema);