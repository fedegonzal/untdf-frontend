import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './product-item.css';

// ProductItem component - demonstrates Props usage
function ProductItem({ id, title, picture, description, price }) {
  const { addToCart, getItemQuantity } = useCart();
  
  const product = { id, title, picture, description, price };
  const itemQuantity = getItemQuantity(id);
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(product);
  };
  
  return (
    <div className="max-w-96 shadow-lg bg-gray-100 h-full flex flex-col hover:shadow-xl transition-shadow relative">
      {/* Quantity Badge */}
      {itemQuantity > 0 && (
        <div className="absolute top-2 right-2 z-10 bg-red-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
          {itemQuantity}
        </div>
      )}
      
      <Link to={`/producto/${id}`} className="flex-1 flex flex-col">
        <img src={picture} alt={String(title || '')} className="aspect-square w-full mix-blend-multiply brightness-110" />
        <div className="flex-1 p-3 bg-white flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-1">{String(title || '')}</h2>
          <p className="text-gray-600 mb-2">{String(description || '')}</p>
          <div className="text-2xl font-semibold text-green-600">${String(price || '0')}</div>
        </div>
      </Link>
      <div className="p-3 bg-white border-t border-gray-200">
        <button
          onClick={handleAddToCart}
          className="w-full bg-red-800 text-white py-2 px-4 rounded hover:bg-red-900 hover:scale-105 active:scale-95 transition-all font-medium text-sm cursor-pointer shadow-md hover:shadow-lg"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductItem;