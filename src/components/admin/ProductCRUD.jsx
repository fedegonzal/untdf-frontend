import React, { useState, useEffect } from 'react';
import { API_URL, getAuthHeaders } from '../../config/api';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

function ProductCRUD() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

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

    const handleCreate = async (productData) => {
        try {
            const response = await fetch(`${API_URL}/products/`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            await fetchProducts();
            setShowForm(false);
            alert('Producto creado exitosamente');
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleUpdate = async (id, productData) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }

            await fetchProducts();
            setEditingProduct(null);
            setShowForm(false);
            alert('Producto actualizado exitosamente');
        } catch (err) {
            alert(`Error: ${err.message}`);
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

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleNewProduct = () => {
        setEditingProduct(null);
        setShowForm(true);
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
                {!showForm && (
                    <button
                        onClick={handleNewProduct}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                    >
                        + Nuevo Producto
                    </button>
                )}
            </div>

            {/* Form */}
            {showForm && (
                <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                    <ProductForm
                        product={editingProduct}
                        onSubmit={editingProduct ? (data) => handleUpdate(editingProduct.id, data) : handleCreate}
                        onCancel={handleCancelEdit}
                    />
                </div>
            )}

            {/* Table */}
            {!showForm && (
                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default ProductCRUD;