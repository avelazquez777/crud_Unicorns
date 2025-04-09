import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./styles/unicorn.css";

const Home = () => {
    const navigate = useNavigate();
  
    return (
      <div className="home-container">
        <video autoPlay loop muted className="background-video">
          <source src="/icon/unicornio.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
  
        <div className="content">
          <Card title="Bienvenido al mundo de los Unicornios 🦄">
            <Button label="Entrar" onClick={() => navigate("/unicornios")} />
          </Card>
        </div>
      </div>
    );
  };
  

export default Home;
