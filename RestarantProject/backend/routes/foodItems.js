const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

router.get('/:restaurantId', async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ restaurant_id: req.params.restaurantId })
      .populate('food_id');
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;