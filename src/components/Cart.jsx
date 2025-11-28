import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { items, totalItems, totalPrice, addToCart, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="text-center">
          <svg 
            className="w-24 h-24 mx-auto text-gray-300 mb-4" 
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">Agrega productos para comenzar tu compra</p>
          <Link 
            to="/productos" 
            className="inline-block bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Mi Carrito</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 font-medium text-sm"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Product Image */}
                <Link to={`/producto/${item.id}`} className="flex-shrink-0">
                  <img 
                    src={item.picture} 
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-grow">
                  <Link 
                    to={`/producto/${item.id}`}
                    className="font-semibold text-gray-800 hover:text-red-800 block mb-1"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold text-red-800 mt-2">
                    ${item.price.toLocaleString('es-AR')}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-bold transition"
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold min-w-[2rem] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 flex items-center justify-center bg-red-800 hover:bg-red-900 rounded-full text-white font-bold transition"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[100px]">
                  <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Resumen del pedido</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Productos ({totalItems})</span>
                <span>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span>${totalPrice.toLocaleString('es-AR')}</span>
              </div>
            </div>

            <button className="w-full bg-red-800 text-white py-3 rounded-lg font-semibold hover:bg-red-900 transition mb-3">
              Finalizar compra
            </button>

            <Link 
              to="/productos" 
              className="block text-center text-red-800 hover:text-red-900 font-medium text-sm"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
