import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FoodItemCard from '../components/FoodItemCard';

export default function FoodMenu() {
  const { restaurantId } = useParams();
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/food-items/${restaurantId}`)
      .then(res => setFoodItems(res.data))
      .catch(err => console.error(err));
  }, [restaurantId]);

  const handleFoodSelect = (item) => {
    navigate('/order-confirmation', { state: { item } });
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1599172995721-49309fff2f21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col items-center bg-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white bg-gray-700 bg-opacity-50 w-80 p-4 border-white shadow-lg rounded-md text-center">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map(item => (
          <FoodItemCard 
            key={item._id}
            item={item}
            onSelect={handleFoodSelect}
          />
        ))}
      </div>
    </div>
  );
}
