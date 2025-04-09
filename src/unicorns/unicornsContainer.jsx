import { useState, useEffect } from "react";
import UnicornsView from "./unicornsView";
import { useNavigate } from "react-router-dom";

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);
  const [modoCreacion, setModoCreacion] = useState(false);
  const navigate = useNavigate();
  const baseURL = "https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f/unicornios";

  const cargarUnicornios = async () => {
    try {
      const res = await fetch(baseURL);
      const data = await res.json();
      setUnicorns(data);
    } catch (err) {
      console.error("Error al obtener unicornios:", err);
    }
  };

  const eliminarUnicornio = async (id) => {
    try {
      await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      setUnicorns(prev => prev.filter(u => u._id !== id));
    } catch (error) {
      console.error("Error al eliminar unicornio:", error);
    }
  };

  const crearUnicornio = async (nuevoUnicornio) => {
    try {
      await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUnicornio),
      });
      setModoCreacion(false);
      cargarUnicornios();
    } catch (error) {
      console.error("Error al crear unicornio:", error);
    }
  };

  useEffect(() => {
    cargarUnicornios();
  }, []);

  return (
    <UnicornsView
      unicorns={unicorns}
      eliminarUnicornio={eliminarUnicornio}
      recargarUnicornios={cargarUnicornios}
      crearUnicornio={crearUnicornio}
      modoCreacion={modoCreacion}
      activarCreacion={() => setModoCreacion(true)}
      cancelarCreacion={() => setModoCreacion(false)}
      onVolver={() => navigate("/")}
    />
  );
};

export default UnicornsContainer;
