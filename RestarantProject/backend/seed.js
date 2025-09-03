const mongoose = require('mongoose');
require('dotenv').config();

// Models
const Location = require('./models/Location');
const Restaurant = require('./models/Restaurant');
const FoodItem = require('./models/FoodItem');

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  // Clear existing data
  await Location.deleteMany();
  await Restaurant.deleteMany();
  await FoodItem.deleteMany();

  // Insert locations
  const locations = await Location.insertMany([
    { city: "New York", state: "NY", zip_code: "10001" },
    { city: "Los Angeles", state: "CA", zip_code: "90001" },
    { city: "Chicago", state: "IL", zip_code: "60601" }
  ]);

  // Insert restaurants
  const restaurants = await Restaurant.insertMany([
    { name: "Tasty Bites", location_id: locations[0]._id },
    { name: "Golden Spoon", location_id: locations[0]._id },
    { name: "Sunset Grill", location_id: locations[1]._id },
    { name: "Windy City Eats", location_id: locations[2]._id },
    { name: "Urban Delights", location_id: locations[1]._id }
  ]);

  // Insert food items and prices
  const foodItems = await FoodItem.insertMany([
    { restaurant_id: restaurants[0]._id, food_id: new mongoose.Types.ObjectId(), name: "Cheeseburger", category: "Fast Food", price: 8.99 },
    { restaurant_id: restaurants[0]._id, food_id: new mongoose.Types.ObjectId(), name: "Pepperoni Pizza", category: "Pizza", price: 12.99 },
    // Add all other food items similarly
  ]);

  console.log('Database seeded!');
  process.exit();
};

seedData();