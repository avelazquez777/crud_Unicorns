import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UnicornsView from './unicornsView';
import UnicornForm from './unicornForm';

const UnicornRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UnicornsView />} />
      <Route path="/crear" element={<UnicornForm />} />
      <Route path="/editar/:id" element={<UnicornForm />} />
    </Routes>
  );
};

export default UnicornRoutes;