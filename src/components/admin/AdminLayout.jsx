import React from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './ProductList';
import ProductFormPage from './ProductFormPage';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/admin/products" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                Panel de Administración
              </Link>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                ADMIN
              </span>
            </div>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50"
            >
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route index element={<Navigate to="/admin/products" replace />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/edit/:id" element={<ProductFormPage />} />
        </Routes>
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Panel de Administración - Supermercado UNTDF
          </p>
        </div>
      </footer>
    </div>
  );
}export default AdminLayout;