import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationCard from '../components/LocationCard';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLocationSelect = (locationId) => {
    navigate(`/restaurants/${locationId}`);
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] brightness-500 flex flex-col items-center bg-cover bg-center p-8 ">
      <h1 className="text-4xl font-bold text-center mb-8 text-white bg-gray-700 bg-opacity-50 w-80 p-4 border-white shadow-lg rounded-md text-center">Food Finder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {locations.map(location => (
          <LocationCard 
            key={location._id}
            location={location}
            onSelect={handleLocationSelect}
          />
        ))}
      </div>
    </div>
  );
}