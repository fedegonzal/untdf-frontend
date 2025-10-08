import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

// ProductList component - demonstrates State, Hooks, Fetch, and Lists
function ProductList() {
  // useState hook for managing component state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook for side effects (data fetching)
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Async function for fetching data
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://161.35.104.211:8000/products/', {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer fedegonzal'
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      
      const data = await response.json();
      
      // Transform the data (price calculation like in original)
      const transformedProducts = data.map(product => ({
        ...product,
        price: Math.floor(product.price * 1000),
        picture: `http://161.35.104.211:8000${product.pictures[0]}`
      }));
      
      setProducts(transformedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search - demonstrates lifting state up
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conditional rendering based on state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error: {error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Productos del Supermercado
      </h2>

      {/* Search input - demonstrates controlled components */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Products count */}
      <p className="text-gray-600 mb-6">
        Mostrando {filteredProducts.length} productos
        {searchTerm && ` para "${searchTerm}"`}
      </p>

      {/* Products grid - demonstrates list rendering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map(product => (
          <ProductItem
            key={product.id}
            title={product.title}
            picture={product.picture}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      {/* Conditional rendering when no products found */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm 
              ? `No se encontraron productos para "${searchTerm}"` 
              : 'No hay productos disponibles'
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;