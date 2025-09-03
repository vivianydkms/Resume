import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import FoodMenu from './pages/FoodMenu';
import OrderConfirmation from './pages/OrderConfirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:locationId" element={<Restaurants />} />
        <Route path="/menu/:restaurantId" element={<FoodMenu />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;