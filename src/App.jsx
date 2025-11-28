import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import CartSummary from './components/CartSummary';
import AdminLayout from './components/admin/AdminLayout';
import { CartProvider } from './context/CartContext';
import './style.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin Routes - No public nav */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Public Routes */}
          <Route path="*" element={
            <div className="bg-white min-h-screen">
              <nav className="bg-red-800 text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                  <h1 className="text-xl font-bold">Supermercado UNTDF</h1>
                  <div className="flex items-center space-x-6">
                    <div className="space-x-4">
                      <Link to="/" className="hover:text-red-200">Productos</Link>
                      <Link to="/carrito" className="hover:text-red-200">Carrito</Link>
                      <Link to="/admin/products" className="text-xs hover:text-red-200 opacity-50">Admin</Link>
                    </div>
                    <CartSummary />
                  </div>
                </div>
              </nav>
            
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<Cart />} />
              </Routes>
            </div>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;