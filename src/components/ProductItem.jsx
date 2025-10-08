import React from 'react';
import './product-item.css';

// ProductItem component - demonstrates Props usage
function ProductItem({ title, picture, description, price }) {
  return (
    <div className="max-w-96 shadow-lg bg-gray-100 h-full flex flex-col">
      <img src={picture} alt={title} className="aspect-square w-full mix-blend-multiply brightness-110" />
      <div className="flex-1 p-3 bg-white flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
        <div className="text-2xl font-semibold text-green-600">${price}</div>
      </div>
    </div>
  );
}

export default ProductItem;