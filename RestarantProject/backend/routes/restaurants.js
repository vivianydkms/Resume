const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

router.get('/:locationId', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ location_id: req.params.locationId });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;