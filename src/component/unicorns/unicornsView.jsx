import React, { useEffect, useState } from 'react';
import { useUnicornContext } from '../../context/unicornContext';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
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
    
    const lastUpdateTime = localStorage.getItem('unicorns_last_update');
    if (lastUpdateTime) {
      const date = new Date(parseInt(lastUpdateTime));
      setLastUpdate(date.toLocaleString());
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Establecemos un fondo con colores de arcoíris
    doc.setFillColor(255, 192, 203); // Rosa claro
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F'); // Fondo rosa
  
    // Agregamos el título con colores de unicornio
    doc.setFontSize(22);
    doc.setTextColor(255, 105, 180); // Rosa fuerte
    doc.text('Lista de Unicornios', 14, 30);
  
    // Fecha en colores más suaves
    doc.setFontSize(12);
    doc.setTextColor(138, 43, 226); // Violeta
    const today = new Date().toLocaleDateString();
    doc.text(`Generado el: ${today}`, 14, 40);
  
    // Dibujamos un arcoíris como fondo de la tabla (un diseño simple con líneas de colores)
    const rainbowColors = [
      [255, 0, 0],    // Rojo
      [255, 127, 0],  // Naranja
      [255, 255, 0],  // Amarillo
      [0, 255, 0],    // Verde
      [0, 0, 255],    // Azul
      [75, 0, 130],   // Índigo
      [238, 130, 238] // Violeta
    ];
  
    let yPosition = 50; // Empieza justo debajo de la fecha
    rainbowColors.forEach((color, index) => {
      doc.setFillColor(...color);
      doc.rect(0, yPosition, doc.internal.pageSize.width, 5, 'F');
      yPosition += 5;
    });
  
    // Definir las columnas y las filas
    const columns = ['Nombre', 'Color', 'Edad', 'Poder'];
    const rows = unicorns.map((u) => [u.nombre, u.color, u.edad, u.poder]);
  
    // Crear la tabla con los unicornios
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: yPosition + 10,
      headStyles: {
        fillColor: [255, 105, 180], // Rosa fuerte
        textColor: [255, 255, 255], // Blanco
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: yPosition + 10 },
      
      styles: {
        fontSize: 11,
        cellPadding: 5,
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      },
      
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { halign: 'center' }
      }
    });
  
    // Páginas y numeración
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
    }
  
    // Guardar el PDF
    doc.save('unicorns.pdf');
  };
  

  if (isLoading) {
    return (
      <div className="container">
        <h2 className="heading">Cargando unicornios...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
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
        <button onClick={handleDownloadPDF} className="pdf-button">
          Exportar PDF
        </button>
      </div>

      {lastUpdate && (
        <p className="last-update">Última actualización: {lastUpdate}</p>
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