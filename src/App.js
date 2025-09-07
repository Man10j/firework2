import './App.css';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import { Provider } from 'react-redux';
import store from './store';
import SubHeader from './components/SubHeader/SubHeader';
import ProductList from './components/ProductList/ProductList';
import { products } from './components/ProductList/ProductList';
import Checkout from './components/Checkout/Checkout';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  const firebaseConfig = {  
  apiKey: "AIzaSyDO1rU59u8wndW4jvUuaUmwexunO1fBlXo",
  authDomain: "fireworks-58594.firebaseapp.com",
  projectId: "fireworks-58594",
  storageBucket: "fireworks-58594.firebasestorage.app",
  messagingSenderId: "549081166677",
  appId: "1:549081166677:web:77ad618abb408421f1b5dc",
  measurementId: "G-EGECL2MST2"
};

// // Initialize Firebase
// const fireworkapp = initializeApp(firebaseConfig);
// const db = getFirestore(fireworkapp);

// useEffect(() => {
//   const fetchData = async () => {
//     const fireworksCollection = collection(db, 'products');
//     const fireworksSnapshot = await getDocs(fireworksCollection);
//     const fireworksList = fireworksSnapshot.docs.map(doc => doc.data());
//     console.log(fireworksList);
//   };

//   fetchData();
// }, [db]);

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
