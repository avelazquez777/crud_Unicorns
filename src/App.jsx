import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import UnicornsIndex from "./unicorns/index";
import UnicornCreate from "./unicorns/unicornsCreate";
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';                              
import 'primeflex/primeflex.css';                                


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unicornios" element={<UnicornsIndex />} />
        <Route path="/crear-unicornio" element={<UnicornCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
