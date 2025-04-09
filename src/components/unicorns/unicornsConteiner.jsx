import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [name, setNombre] = useState('');
    const [color, setYear] = useState('');
    const [age, setPrecio] = useState('');
    const [power, setCpu] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !age || !color || !power) {
            alert("Todos los campos son obligatorios.");
            return;
        }
    
        const productData = {
            name: str(name),
            age: Number(age),
            color: str(color),
            power: str(power),
            }
        };
    
        try {
            const response = await fetch('https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
    
            const data = await response.json();
    
            if (response.ok) {

                const nuevoUnicornio = {
                    id: ultimoId + 1,
                    name,
                    age,
                    color,
                    price,
                    hardDisk,
                    apiId: data.id 
                };
    
    
                navigate("/nuevos-unicornio"); 
            } else {
                setError("Error al crear unicornio en la API");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Fallo al conectar con la API");
        }
    };
    

    return (
        <div>
            <h2>Crear Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label>Año:</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />

                <label>Precio:</label>
                <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

                <label>Modelo CPU:</label>
                <input type="text" value={cpu} onChange={(e) => setCpu(e.target.value)} required />

                <label>Tamaño Hard Disk (especificar: gb, mb, tb):</label>
                <input type="text" value={hardDisk} onChange={(e) => setHardDisk(e.target.value)} required />

                <button type="submit">Crear Producto</button>
            </form>
            <button onClick={() => navigate("/")}>Volver al Home</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateProduct;
