import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Home from './components/Home';
import './style.css';

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <nav className="bg-red-800 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Supermercado UNTDF</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-red-200">Inicio</Link>
              <Link to="/productos" className="hover:text-red-200">Productos</Link>
            </div>
          </div>
        </nav>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;