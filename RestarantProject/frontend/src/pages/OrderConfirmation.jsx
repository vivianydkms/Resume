import { useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const item = state?.item;

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1674669520816-c3c5615dfe51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center flex flex-col items-center justify-center p-8">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-5xl font-bold text-green-600 mb-4"> 🎉🎉🎉🎉Hurray, Order Placed!</h1>
        {item && (
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
            <p className="text-gray-600 mt-2">Price: Rs {item.price}</p>
          </div>
        )}
        <p className="mt-6 text-gray-700">Your order will be ready in 30 minutes!</p>
      </div>
    </div>
  );
}

