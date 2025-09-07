import './App.css';
import Header from './components/Header/Header';
import SubHeader from './components/SubHeader/SubHeader';
import ProductList from './components/ProductList/ProductList';
import Checkout from './components/Checkout/Checkout';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import products from "./products.json";

function App() {


  const [cart, setCart] = useState({});

  // Calculate total items in cart
  const cartCount = Object.values(cart).reduce((sum, val) => sum + val, 0);

  // Handler to add item to cart
  const handleAddToCart = (productIdx) => {
    setCart((prev) => ({ ...prev, [productIdx]: (prev[productIdx] || 0) + 1 }));
  };

  // Handler to remove item from cart
  const handleRemoveFromCart = (productIdx) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productIdx]) {
        newCart[productIdx] -= 1;
        if (newCart[productIdx] <= 0) delete newCart[productIdx];
      }
      return newCart;
    });
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SubHeader cartCount={cartCount} cart={cart} products={products} enableCartNav />
                <ProductList products={products} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} cart={cart} />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Checkout products={products} cart={cart} onOrderPlaced={() => setCart({})} />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
