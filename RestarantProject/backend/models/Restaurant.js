const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);