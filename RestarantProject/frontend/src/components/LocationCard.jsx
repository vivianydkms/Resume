export default function LocationCard({ location, onSelect }) {
    return (
      <div 
        className=" font-bold text-center mb-8 text-white bg-black bg-opacity-40 w-80 p-4 border-white shadow-lg rounded-md hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 transform transition-transform duration-300"
        onClick={() => onSelect(location._id)}
      >
        <h3 className="text-2xl font-bold text-white">{location.city}</h3>
        <p className="text-white text-xl">{location.state} - {location.zip_code}</p>
      </div>
    );
  }