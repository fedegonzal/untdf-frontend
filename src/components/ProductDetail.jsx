import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchProduct in useCallback to prevent unnecessary re-renders
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://161.35.104.211:8000/products/${id}/`, {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer fedegonzal'
        }
      });
      
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      
      const data = await response.json();
      
      // Debug: Log the data to see its structure
      console.log('API Response:', data);
      
      // Transform the data (price calculation and pictures like in ProductList)
      const transformedProduct = {
        ...data,
        price: Math.floor(data.price * 1000),
        pictures: data.pictures && Array.isArray(data.pictures) 
          ? data.pictures.map(pic => `http://161.35.104.211:8000${pic}`)
          : []
      };
      
      console.log('Transformed Product:', transformedProduct);
      setProduct(transformedProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center">
          <p className="text-xl text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error: {error}</p>
          <Link 
            to="/productos"
            className="mt-4 inline-block bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center">
          <p className="text-gray-600">Producto no encontrado</p>
          <Link 
            to="/productos"
            className="mt-4 inline-block bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Breadcrumb navigation */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <Link to="/" className="hover:text-red-800">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-red-800">Productos</Link>
          <span>/</span>
          <span className="text-gray-900">{String(product.title || '')}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {product.pictures && product.pictures.length > 0 ? (
            <div>
              <img 
                src={product.pictures[0]} 
                alt={product.title}
                className="w-full aspect-square object-cover rounded-lg shadow-lg mix-blend-multiply brightness-110"
              />
              {product.pictures.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.pictures.slice(1).map((pic, index) => (
                    <img 
                      key={index}
                      src={pic} 
                      alt={`${product.title} ${index + 2}`}
                      className="w-full aspect-square object-cover rounded shadow mix-blend-multiply brightness-110"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{String(product.title || '')}</h1>
            <p className="text-gray-600 text-lg">{String(product.description || '')}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-4xl font-bold text-green-600 mb-4">
              ${String(product.price || '0')}
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles del producto</h3>
            <dl className="space-y-2">
              <div className="flex">
                <dt className="text-gray-600 font-medium w-24">ID:</dt>
                <dd className="text-gray-900">{String(product.id || '')}</dd>
              </div>
              {product.category && (
                <div className="flex">
                  <dt className="text-gray-600 font-medium w-24">Categoría:</dt>
                  <dd className="text-gray-900">{String(product.category)}</dd>
                </div>
              )}
              {product.brand && (
                <div className="flex">
                  <dt className="text-gray-600 font-medium w-24">Marca:</dt>
                  <dd className="text-gray-900">{String(product.brand)}</dd>
                </div>
              )}
              {product.stock !== undefined && (
                <div className="flex">
                  <dt className="text-gray-600 font-medium w-24">Stock:</dt>
                  <dd className="text-gray-900">{String(product.stock)} unidades</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <button className="w-full bg-red-800 text-white py-3 px-6 rounded-lg hover:bg-red-900 transition-colors font-semibold">
              Agregar al carrito
            </button>
            <Link 
              to="/productos"
              className="block w-full text-center bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Volver a productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;