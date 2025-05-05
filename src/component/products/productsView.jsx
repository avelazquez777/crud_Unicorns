import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadProducts, saveProducts } from './productData';
import '../../styles/unicorn.css'; // Reutilizamos los estilos de unicornios

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Cargar productos al iniciar
  useEffect(() => {
    const storedProducts = loadProducts();
    setProducts(storedProducts);
  }, []);

  const handleCreate = () => {
    navigate('/productos/crear');
  };

  const handleEdit = (id) => {
    navigate(`/productos/editar/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      saveProducts(updatedProducts);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Catálogo de Productos</h2>
      <button onClick={handleCreate} className="create-button">
        Agregar nuevo producto
      </button>

      {products.length === 0 ? (
        <p className="noDataMessage">No hay productos registrados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Nombre</th>
              <th className="table-header">Categoría</th>
              <th className="table-header">Precio</th>
              <th className="table-header">Stock</th>
              <th className="table-header">Descripción</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="table-row">
                <td className="table-cell">{product.nombre}</td>
                <td className="table-cell">{product.categoria}</td>
                <td className="table-cell">${product.precio.toFixed(2)}</td>
                <td className="table-cell">{product.stock}</td>
                <td className="table-cell">{product.descripcion}</td>
                <td className="table-cell">
                  <button 
                    onClick={() => handleEdit(product.id)} 
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsView;