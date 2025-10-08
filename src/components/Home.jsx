import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Home component - demonstrates basic useState and event handling
function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState('¡Bienvenido a nuestro supermercado!');
  const [clickCount, setClickCount] = useState(0);

  const handleWelcomeClick = () => {
    setClickCount(prev => prev + 1);
    
    const messages = [
      '¡Bienvenido a nuestro supermercado!',
      '¡Explora nuestros productos!',
      '¡Encuentra las mejores ofertas!',
      '¡Gracias por visitarnos!'
    ];
    
    const newMessage = messages[clickCount % messages.length];
    setWelcomeMessage(newMessage);
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Supermercado UNTDF
        </h1>
        
        <button 
          onClick={handleWelcomeClick}
          className="text-xl text-red-800 hover:text-red-900 cursor-pointer transition-colors"
        >
          {welcomeMessage}
        </button>
        
        {clickCount > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Has hecho clic {clickCount} {clickCount === 1 ? 'vez' : 'veces'}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-red-800">
            Conceptos React
          </h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li>✅ <strong>Props:</strong> ProductItem recibe datos</li>
            <li>✅ <strong>State:</strong> useState para gestionar estado</li>
            <li>✅ <strong>Hooks:</strong> useEffect para efectos</li>
            <li>✅ <strong>Fetch:</strong> async/await para APIs</li>
            <li>✅ <strong>Listas:</strong> map() para renderizar</li>
            <li>✅ <strong>Condicional:</strong> && y ternarios</li>
            <li>✅ <strong>Router:</strong> Navegación SPA</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            Funcionalidades
          </h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li>🛒 Lista de productos desde API</li>
            <li>🔍 Búsqueda en tiempo real</li>
            <li>📱 Diseño responsive</li>
            <li>⚡ Estados de carga y error</li>
            <li>🎯 Composición de componentes</li>
            <li>🔄 Lifting state up</li>
          </ul>
        </div>
      </div>

      <Link 
        to="/productos"
        className="inline-block bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-900 transition-colors"
      >
        Ver Productos
      </Link>
    </div>
  );
}

export default Home;