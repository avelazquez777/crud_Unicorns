import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsView from './productsView';
import ProductForm from './productForm';

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
      <Route path="/crear" element={<ProductForm />} />
      <Route path="/editar/:id" element={<ProductForm />} />
    </Routes>
  );
};

export default ProductRoutes;