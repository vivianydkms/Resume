import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';

export default function Restaurants() {
  const { locationId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/restaurants/${locationId}`)
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, [locationId]);

  const handleRestaurantSelect = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col items-center bg-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white bg-gray-700 bg-opacity-50 w-90 p-4 border-white shadow-lg rounded-md text-center">Select Restaurant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map(restaurant => (
          <RestaurantCard 
            key={restaurant._id}
            restaurant={restaurant}
            onSelect={handleRestaurantSelect}
          />
        ))}
      </div>
    </div>
  );
}