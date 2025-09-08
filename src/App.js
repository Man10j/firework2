import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import Checkout from './components/Checkout/Checkout';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import products from "./products.json";

function App() {


  const [cart, setCart] = useState({});

  // Calculate total items in cart
  const cartCount = Object.values(cart).reduce((sum, val) => sum + val, 0);

    // Handler to add item to cart by productId
    const handleAddToCart = (productId) => {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
    };

    // Handler to remove item from cart by productId
    const handleRemoveFromCart = (productId) => {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      setCart((prev) => {
        const newCart = { ...prev };
        if (newCart[productId]) {
          newCart[productId] -= 1;
          if (newCart[productId] <= 0) delete newCart[productId];
        }
        return newCart;
      });
    };

  return (
    <Router>
      <div className="App">
        <Header cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <SubHeader cartCount={cartCount} cart={cart} products={products} enableCartNav /> */}
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
