import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bienvenido a la App de Unicornios 🦄</h1>
      <button onClick={() => navigate("/unicornios")}>Ver Unicornios</button>
      <button onClick={() => navigate("/crear-unicornio")}>
        Crear Unicornio
      </button>
    </div>
  );
};

export default Home;
