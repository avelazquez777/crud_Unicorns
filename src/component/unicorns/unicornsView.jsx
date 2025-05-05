import React, { useEffect, useState } from 'react';
import { useUnicornContext } from '../../context/unicornContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/unicorn.css';

const UnicornsView = () => {
  const { unicorns, getUnicorns, deleteUnicorn, isInitialized, refreshFromApi } = useUnicornContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      setIsLoading(false);
      
      // Obtener fecha de última actualización
      const lastUpdateTime = localStorage.getItem('unicorns_last_update');
      if (lastUpdateTime) {
        const date = new Date(parseInt(lastUpdateTime));
        setLastUpdate(date.toLocaleString());
      }
    }
  }, [isInitialized]);

  const handleEdit = (id) => {
    navigate(`/unicornios/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este unicornio?')) {
      await deleteUnicorn(id);
    }
  };

  const handleCreate = () => {
    navigate('/unicornios/crear');
  };

  const handleForceRefresh = async () => {
    setIsLoading(true);
    await refreshFromApi();
    setIsLoading(false);
    
    // Actualizar la fecha de última actualización
    const lastUpdateTime = localStorage.getItem('unicorns_last_update');
    if (lastUpdateTime) {
      const date = new Date(parseInt(lastUpdateTime));
      setLastUpdate(date.toLocaleString());
    }
  };

  if (isLoading) {
    return <div className="container">
      <h2 className="heading">Cargando unicornios...</h2>
      <div className="loading-spinner"></div>
    </div>;
  }

  return (
    <div className="container">
      <h2 className="heading">Lista de Unicornios</h2>
      <div className="actions-container">
        <button onClick={handleCreate} className="create-button">
          Crear nuevo unicornio
        </button>
        <button onClick={handleForceRefresh} className="refresh-button">
          Actualizar datos
        </button>
      </div>
      
      {lastUpdate && (
        <p className="last-update">
          Última actualización: {lastUpdate}
        </p>
      )}

      {unicorns.length === 0 ? (
        <p className="noDataMessage">No hay unicornios registrados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Nombre</th>
              <th className="table-header">Color</th>
              <th className="table-header">Edad</th>
              <th className="table-header">Poder</th>
              <th className="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {unicorns.map((unicorn) => (
              <tr key={unicorn._id} className="table-row">
                <td className="table-cell">{unicorn.nombre}</td>
                <td className="table-cell">{unicorn.color}</td>
                <td className="table-cell">{unicorn.edad}</td>
                <td className="table-cell">{unicorn.poder}</td>
                <td className="table-cell">
                  <button 
                    onClick={() => handleEdit(unicorn._id)} 
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(unicorn._id)} 
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

export default UnicornsView;