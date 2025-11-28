import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartSummary() {
  const { totalItems, totalPrice, animateCart, setCartAnimation } = useCart();
  
  // Reset animation after it completes
  useEffect(() => {
    if (animateCart) {
      const timer = setTimeout(() => {
        setCartAnimation(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [animateCart, setCartAnimation]);
  
  return (
    <Link to="/carrito" className="flex items-center space-x-4 text-white hover:text-yellow-300 transition">
      <div className="flex items-center space-x-2 relative">
        <div className="relative">
          <svg 
            className={`w-6 h-6 transition-transform ${animateCart ? 'animate-bounce' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L7 7H5M7 13L5.4 9M7 13l-2.293 2.293c-.396.395-.586 1.208-.293 1.707S5.586 17 6 17h11M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
            />
          </svg>
          {animateCart && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          )}
        </div>
        <span className={`font-medium transition-all ${animateCart ? 'scale-110 text-yellow-300' : ''}`}>
          {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
        </span>
      </div>
      <div className={`font-bold transition-all ${animateCart ? 'scale-110 text-yellow-300' : ''}`}>
        ${totalPrice.toLocaleString('es-AR')}
      </div>
    </Link>
  );
}

export default CartSummary;