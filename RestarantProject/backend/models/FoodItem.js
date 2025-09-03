const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  food_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
  price: Number
});

module.exports = mongoose.model('FoodItem', foodItemSchema);