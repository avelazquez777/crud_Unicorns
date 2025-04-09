import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemProduct = ({ unicornio, eliminarUnicornio }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [name, setNombre] = useState(unicornio.nombre);
  const [age, setPrecio] = useState(unicornio.precio);
  const [color, setYear] = useState(unicornio.year);
  const [power, setCpu] = useState(unicornio.cpu);
  const navigate = useNavigate();


    if (producto.apiId) {
      try {
        const response = await fetch(`https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f/${producto.apiId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            age: parseFloat(precio),
            color: parseInt(year, 10),
            power,
            }
          })
        });

        if (!response.ok) {
          console.warn("No se pudo actualizar el producto en la API");
        } else {
          console.log("Producto actualizado en la API correctamente");
        }
      } catch (error) {
        console.error("Error al actualizar producto en la API:", error);
      }
    }

    setModoEdicion(false);
  };

  return (
    <li>
      {modoEdicion ? (
        <>
          <input type="number" value={producto.id} disabled />
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          <input type="text" value={cpu} onChange={(e) => setCpu(e.target.value)} />
          <input type="text" value={hardDisk} onChange={(e) => setHardDisk(e.target.value)} />
          <button onClick={actualizarProducto}>Guardar</button>
        </>
      ) : (
        <>
          <span>
            ID: {producto.id} - {producto.nombre} - ${producto.precio} - Año: {producto.year} - CPU: {producto.cpu} - Disco: {producto.hardDisk}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => setModoEdicion(true)}>Editar</button>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ItemProduct;
