import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, getAuthHeaders } from '../../config/api';
import ProductTable from './ProductTable';

function ProductList() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${API_URL}/products/`, {
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este producto?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            await fetchProducts();
            alert('Producto eliminado exitosamente');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600 text-lg">Cargando productos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded p-4">
                <p className="text-red-600 font-medium">Error: {error}</p>
                <button
                    onClick={fetchProducts}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Gestión de Productos ({products.length})
                </h1>
                <Link
                    to="/admin/products/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                    + Nuevo Producto
                </Link>
            </div>

            {/* Table */}
            <ProductTable
                products={products}
                onEdit={(product) => navigate(`/admin/products/edit/${product.id}`)}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default ProductList;