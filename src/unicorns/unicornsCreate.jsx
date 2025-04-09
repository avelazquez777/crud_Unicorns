import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/unicorn.css";


const UnicornCreate = () => {
  const [form, setForm] = useState({ name: "", color: "", age: "", power: "" });
  const navigate = useNavigate();
  const baseURL = "https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f/unicornios";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, color, age, power } = form;
    if (!name || !color || !power) {
      alert("Completá todos los campos.");
      return;
    }

    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber < 0) {
      alert("La edad debe ser un número válido.");
      return;
    }

    try {
      await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color, age: ageNumber, power }),
      });

      navigate("/unicornios"); // redirige a la lista luego de crear
    } catch (err) {
      console.error("Error al crear unicornio:", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Crear Unicornio 🦄</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} /><br />
        <input name="color" placeholder="Color" value={form.color} onChange={handleChange} /><br />
        <input name="age" placeholder="Edad" value={form.age} onChange={handleChange} /><br />
        <input name="power" placeholder="Poder" value={form.power} onChange={handleChange} /><br />
        <button type="submit">Crear</button>
        <button type="button" onClick={() => navigate("/unicornios")} style={{ marginLeft: "10px" }}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UnicornCreate;
