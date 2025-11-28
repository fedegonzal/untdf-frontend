import React, { useState, useEffect } from 'react';
import { API_URL, getAuthHeaders, getImageUrl } from '../../config/api';

function ProductForm({ product, onSubmit, onCancel }) {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '',
        stock: '',
        pictures: [],
        extra: {}
    });

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);
            const response = await fetch(`${API_URL}/categories/`, {
                headers: getAuthHeaders()
            });

            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        if (product) {
            // Extract category_id if category is an object
            const categoryId = product.category_id || (product.category?.id || '');

            setFormData({
                title: String(product.title || ''),
                description: String(product.description || ''),
                price: typeof product.price === 'number' ? product.price : (product.price || ''),
                category_id: String(categoryId),
                stock: typeof product.stock === 'number' ? product.stock : (product.stock || ''),
                pictures: Array.isArray(product.pictures) ? product.pictures : [],
                extra: product.extra || {}
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Por favor seleccione un archivo de imagen válido');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo es muy grande. Tamaño máximo: 5MB');
            return;
        }

        // Check if product has an ID (required for upload)
        if (!product || !product.id) {
            alert('Primero debe crear el producto antes de subir imágenes. Guarde el producto y luego edítelo para agregar imágenes.');
            return;
        }

        try {
            setUploadingImage(true);

            // Create FormData for file upload
            const uploadData = new FormData();
            uploadData.append('files', file);

            // Upload to API using product_id
            const response = await fetch(`${API_URL}/products/${product.id}/pictures`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${getAuthHeaders().Authorization.split(' ')[1]}`
                },
                body: uploadData
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            
            // Add the uploaded image path to pictures array
            // API returns a string directly with the path
            const imagePath = typeof data === 'string' ? data : (data.path || data.url || data.file_path);
            if (imagePath) {
                setFormData(prev => ({
                    ...prev,
                    pictures: [...prev.pictures, imagePath]
                }));
                alert('Imagen subida exitosamente');
            } else {
                throw new Error('No se recibi\u00f3 la ruta de la imagen');
            }

            // Reset file input
            e.target.value = '';
        } catch (err) {
            console.error('Upload error:', err);
            alert(`Error al subir la imagen: ${err.message}`);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleRemovePicture = async (index) => {
        if (!product || !product.id) {
            // If product doesn't exist yet, just remove from local state
            setFormData(prev => ({
                ...prev,
                pictures: prev.pictures.filter((_, i) => i !== index)
            }));
            return;
        }

        if (!window.confirm('¿Está seguro de eliminar esta imagen?')) {
            return;
        }

        try {
            const picturePath = formData.pictures[index];
            
            // Delete from server
            const response = await fetch(`${API_URL}/products/${product.id}/pictures`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ file_path: picturePath })
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la imagen del servidor');
            }

            // Remove from local state after successful deletion
            setFormData(prev => ({
                ...prev,
                pictures: prev.pictures.filter((_, i) => i !== index)
            }));
            
            alert('Imagen eliminada exitosamente');
        } catch (err) {
            console.error('Delete error:', err);
            alert(`Error al eliminar la imagen: ${err.message}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert numeric fields
        const dataToSubmit = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            category_id: parseInt(formData.category_id) || null
        };

        onSubmit(dataToSubmit);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del producto"
                    />
                </div>

                {/* Description */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descripción del producto"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio *
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoría
                    </label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        disabled={loadingCategories}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">
                            {loadingCategories ? 'Cargando categorías...' : 'Seleccione una categoría'}
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pictures Management */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imágenes del Producto
                    </label>
                    
                    {/* File Upload Input */}
                    <div className="mb-3">
                        <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                            <div className="text-center">
                                {uploadingImage ? (
                                    <div className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-blue-600 font-medium">Subiendo imagen...</span>
                                    </div>
                                ) : (
                                    <div>
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold text-blue-600">Click para subir</span> o arrastra una imagen
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hasta 5MB</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                disabled={uploadingImage}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Pictures List */}
                    {formData.pictures.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                {formData.pictures.length} {formData.pictures.length === 1 ? 'imagen' : 'imágenes'}
                            </p>
                            <div className="grid grid-cols-4 gap-3">
                                {formData.pictures.map((pic, index) => (
                                    <div key={index} className="relative group">
                                        <div className="aspect-square border-2 border-gray-300 rounded overflow-hidden bg-gray-100">
                                            <img
                                                src={getImageUrl(pic)}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ENo image%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePicture(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Eliminar imagen"
                                        >
                                            ×
                                        </button>
                                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                            #{index + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {formData.pictures.length === 0 && (
                        <div className="text-sm text-gray-500 italic">
                            No hay imágenes. Sube imágenes usando el selector arriba.
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                    {product ? 'Actualizar' : 'Crear'} Producto
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default ProductForm;