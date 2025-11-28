import React from 'react';
import Rating from '@mui/material/Rating';

function ProductTable({ products, onEdit, onDelete }) {
    // Helper function to calculate average rating
    const calculateAverageRating = (product) => {
        if (!product.extra?.stars || !Array.isArray(product.extra.stars) || product.extra.stars.length === 0) {
            return null;
        }
        const sum = product.extra.stars.reduce((acc, star) => acc + (star.value || 0), 0);
        const avg = sum / product.extra.stars.length;
        return avg.toFixed(1);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Título
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descripción
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Rating
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                                    No hay productos disponibles
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {String(product.id || '')}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <div className="font-medium max-w-xs truncate">
                                            {String(product.title || '')}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        <div className="max-w-xs truncate">
                                            {String(product.description || '-')}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {product.stock !== undefined && product.stock !== null ? String(product.stock) : '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                        {product.category ? (typeof product.category === 'object' ? product.category.name || product.category.title || '-' : String(product.category)) : '-'}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                        {(() => {
                                            const avgRating = calculateAverageRating(product);
                                            if (avgRating === null) {
                                                return (
                                                    <div className="flex items-center space-x-1">
                                                        <Rating value={0} readOnly size="small" />
                                                        <span className="text-gray-400 text-xs">(0)</span>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div className="flex items-center space-x-1">
                                                    <Rating value={parseFloat(avgRating)} readOnly precision={0.1} size="small" />
                                                    <span className="text-gray-600 text-xs">
                                                        {avgRating} ({product.extra.stars.length})
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductTable;