import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UnicornProvider } from './context/unicornContext';

import UnicornRoutes from './component/unicorns';
import Home from './home';
import Navbar from './navbar';
import ProductRoutes from './component/products'; // Importamos las rutas de productos (aún por crear)

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unicornios/*" element={
          <UnicornProvider>
            <UnicornRoutes />
          </UnicornProvider>
        } />
        <Route path="/productos/*" element={<ProductRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
