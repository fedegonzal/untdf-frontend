import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL, getAuthHeaders } from '../../config/api';
import ProductForm from './ProductForm';

function ProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/products/${id}`, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }

            const data = await response.json();
            setProduct(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (productData) => {
        try {
            const url = isEditing
                ? `${API_URL}/products/${id}`
                : `${API_URL}/products/`;

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error(`Error al ${isEditing ? 'actualizar' : 'crear'} el producto`);
            }

            alert(`Producto ${isEditing ? 'actualizado' : 'creado'} exitosamente`);
            navigate('/admin/products');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleCancel = () => {
        navigate('/admin/products');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600 text-lg">Cargando producto...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-600 font-medium">Error: {error}</p>
                <Link
                    to="/admin/products"
                    className="mt-2 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Volver a la lista
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <Link
                    to="/admin/products"
                    className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-flex items-center"
                >
                    ← Volver a la lista
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">
                    {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                </h1>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <ProductForm
                    product={product}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default ProductFormPage;