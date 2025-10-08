import React from 'react';
import { Link } from 'react-router-dom';
import './product-item.css';

// ProductItem component - demonstrates Props usage
function ProductItem({ id, title, picture, description, price }) {
  return (
    <Link to={`/producto/${id}`} className="max-w-96 shadow-lg bg-gray-100 h-full flex flex-col hover:shadow-xl transition-shadow">
      <img src={picture} alt={String(title || '')} className="aspect-square w-full mix-blend-multiply brightness-110" />
      <div className="flex-1 p-3 bg-white flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">{String(title || '')}</h2>
        <p className="text-gray-600 mb-2">{String(description || '')}</p>
        <div className="text-2xl font-semibold text-green-600">${String(price || '0')}</div>
      </div>
    </Link>
  );
}

export default ProductItem;