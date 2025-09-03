export default function RestaurantCard({ restaurant, onSelect }) {
    return (
      <div 
        className="p-6 bg-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform duration-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onSelect(restaurant._id)}
      >
        <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
      </div>
    );
  }