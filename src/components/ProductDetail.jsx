import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_URL, getAuthHeaders, getImageUrl } from '../config/api';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);
  
  const itemQuantity = product ? getItemQuantity(product.id) : 0;

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!product?.extra?.stars || !Array.isArray(product.extra.stars) || product.extra.stars.length === 0) {
      return 0;
    }
    const sum = product.extra.stars.reduce((acc, star) => acc + (star.value || 0), 0);
    return sum / product.extra.stars.length;
  };

  // Wrap fetchProduct in useCallback to prevent unnecessary re-renders
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/products/${id}/`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      
      const data = await response.json();
      
      // Transform the data (price calculation and pictures like in ProductList)
      const transformedProduct = {
        ...data,
        price: Math.floor(data.price * 1000),
        pictures: data.pictures && Array.isArray(data.pictures) 
          ? data.pictures.map(pic => getImageUrl(pic))
          : []
      };
      
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

  // Handle rating submission
  const handleRatingSubmit = async (newValue) => {
    if (!newValue || submittingRating) return;
    
    try {
      setSubmittingRating(true);
      
      // Prepare the new stars array
      const currentStars = product.extra?.stars || [];
      const newStar = {
        timestamp: new Date().toISOString(),
        value: newValue
      };
      
      const updatedExtra = {
        ...product.extra,
        stars: [...currentStars, newStar]
      };
      
      // Update product with new rating
      const response = await fetch(`${API_URL}/products/${id}/`, {
        method: 'PUT',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price / 1000, // Convert back to API format
          category_id: product.category_id || product.category?.id,
          stock: product.stock,
          extra: updatedExtra
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar calificación');
      }

      // Refresh product data
      await fetchProduct();
      setUserRating(0);
      alert('¡Gracias por tu calificación!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setSubmittingRating(false);
    }
  };

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

          {/* Rating Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Calificación</h3>
            <div className="space-y-4">
              {/* Average Rating Display */}
              <div className="flex items-center space-x-3">
                <Rating 
                  value={calculateAverageRating()} 
                  readOnly 
                  precision={0.1} 
                  size="large"
                />
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-lg text-gray-900">
                    {calculateAverageRating() > 0 ? calculateAverageRating().toFixed(1) : 'Sin calificaciones'}
                  </span>
                  {product.extra?.stars?.length > 0 && (
                    <span className="ml-1">
                      ({product.extra.stars.length} {product.extra.stars.length === 1 ? 'calificación' : 'calificaciones'})
                    </span>
                  )}
                </div>
              </div>

              {/* User Rating Input */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Califica este producto:
                </label>
                <Box className="flex items-center space-x-3">
                  <Rating
                    value={userRating}
                    onChange={(event, newValue) => {
                      setUserRating(newValue);
                      handleRatingSubmit(newValue);
                    }}
                    disabled={submittingRating}
                    size="large"
                  />
                  {submittingRating && (
                    <span className="text-sm text-gray-600">Enviando...</span>
                  )}
                </Box>
              </div>
            </div>
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
                  <dd className="text-gray-900">
                    {typeof product.category === 'object' ? product.category.title : String(product.category)}
                  </dd>
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
            {/* Cart Controls */}
            <div className="space-y-4">
              {itemQuantity === 0 ? (
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-red-800 text-white py-3 px-6 rounded-lg hover:bg-red-900 hover:scale-105 active:scale-95 transition-all font-semibold cursor-pointer shadow-md hover:shadow-lg"
                >
                  Agregar al carrito
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
                    <span className="font-medium text-gray-700">En el carrito:</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">
                        {itemQuantity}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-8 h-8 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    Subtotal: ${(product.price * itemQuantity).toLocaleString('es-AR')}
                  </div>
                </div>
              )}
            </div>
            
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