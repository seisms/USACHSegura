import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./components/InicioSesion";
import PagP from "./components/PaginaPrincipal";
import Registro from "./components/Registro";
import Adminspacework from "./components/AmbienteAdministrador";
import Sectores from "./components/tablasAdmin/Sectores";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/pagp" element={<PagP />} />
        <Route path="/adminspacework" element={<Adminspacework />} />
        <Route path="/sectores" element={<Sectores />} />
      </Routes>
    </Router>
  );
}

export default App;
