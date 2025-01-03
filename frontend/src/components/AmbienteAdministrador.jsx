import "./css/AmbienteAdministrador.css";
import { useState } from "react";
import Cabecera from "./Cabecera.jsx";
import Sectores from "./tablasAdmin/Sectores.jsx";
import TUsuario from "./tablasAdmin/TUsuario.jsx";
import TPertenencia from "./tablasAdmin/TPertenencia.jsx";
import TIncidente from "./tablasAdmin/TIncidente.jsx";

function AdminSpaceWork() {
  // Estado para el boton seleccionado
  const [selectedTab, setSelectedTab] = useState(null);

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "sectores":
        return <Sectores />;
    
      case "tpertenencia":
        return <TPertenencia />;

      case "tusuario":
        return <TUsuario />;
      
      case "tincidente":
        return <TIncidente />;

      default:
        return <h2>Selecciona una opción para ver su contenido</h2>;
    }
  };

  return (
    <div className="fondo">
      <Cabecera />
      <div className="logout-button">
        <button>Cerrar Sesión</button>
      </div>
      <div className="titulo">
        <h1>Tablas UsachSegura</h1>
      </div>
      <div className="opcionesTablas">
        <button className="botones" onClick={() => handleTabChange("sectores")}> <h2> Sectores </h2> </button>
        <button className="botones" onClick={() => handleTabChange("tusuario")}> <h2> Tipo de Usuarios </h2> </button>
        <button className="botones" onClick={() => handleTabChange("tincidente")}> <h2> Tipo de Incidentes </h2> </button>
        <button className="botones" onClick={() => handleTabChange("tpertenencia")}> <h2> Tipo de Pertenencias </h2> </button>
      </div>
      <div className="datos_tabla">{renderTabContent()}</div>
    </div>
  );
}

export default AdminSpaceWork;
