export default function FoodItemCard({ item, onSelect }) {
    return (
      <div 
        className="p-6 bg-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform duration-300 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => onSelect(item)}
      >
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">{item.category}</p>
        <p className="text-lg font-semibold text-blue-600 mt-2">Rs {item.price}</p>
      </div>
    );
  }