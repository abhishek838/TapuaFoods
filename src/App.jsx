import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

// Components
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

// Pages
import { Home } from './pages/Home/Home';
import { Products } from './pages/Products/Products';
import { ProductDetails } from './pages/ProductDetails/ProductDetails';
import { Cart } from './pages/Cart/Cart';
import { Checkout } from './pages/Checkout/Checkout';
import { OrderSuccess } from './pages/OrderSuccess/OrderSuccess';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Account } from './pages/Account/Account';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { Contact } from './pages/Contact/Contact';
import { Recipes } from './pages/Recipes/Recipes';
import { Stories } from './pages/Stories/Stories';
import { NotFound } from './pages/NotFound/NotFound';

// Styles
import './styles/index.css';

// Auto-scroll to top upon page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ToastProvider>
              <ScrollToTop />
              <div className="app-shell">
                <Navbar />
                <main id="main-content" className="app-main">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </ToastProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
