import { useState, useEffect } from "react";
import UnicornsView from "./unicornsView";
import "../styles/unicorn.css";
import { useNavigate } from "react-router-dom";

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);
  const [modoCreacion, setModoCreacion] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const baseURL = "https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f/unicornios";

  const cargarUnicornios = async () => {
    try {
      const res = await fetch(baseURL);
      if (!res.ok) throw new Error("Error al cargar los unicornios.");
      const data = await res.json();
      setUnicorns(data);
    } catch (err) {
      console.error("Error al obtener unicornios:", err);
      setMensajeError("No se pudo cargar la lista de unicornios.");
    }
  };

  const eliminarUnicornio = async (id) => {
    try {
      const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar unicornio.");
      setUnicorns(prev => prev.filter(u => u._id !== id));
    } catch (error) {
      console.error("Error al eliminar unicornio:", error);
      setMensajeError("No se pudo eliminar el unicornio.");
    }
  };

  const crearUnicornio = async (nuevoUnicornio) => {
    try {
      const res = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUnicornio),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear unicornio.");
      }

      setModoCreacion(false);
      cargarUnicornios();
    } catch (error) {
      console.error("Error al crear unicornio:", error);
      setMensajeError(error.message || "Error al crear unicornio.");
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
      mensajeError={mensajeError}
      limpiarError={() => setMensajeError("")}
    />
  );
};

export default UnicornsContainer;
