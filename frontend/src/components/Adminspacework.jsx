import "./css/AdminSpaceWork.css";
import { useState } from "react";
import Cabecera from "./Cabecera";
import Sectores from "./tablasAdmin/Sectores.jsx";

function AdminSpaceWork() {
  const [selectedTab, setSelectedTab] = useState(null);

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "sectores":
        return <Sectores />;
      /*
      case "tpertenencia":
        return <h2>Contenido del formulario de Pertenencia</h2>;
      case "tusuario":
        return <h2>Contenido del formulario de Usuarios</h2>;
      */
      default:
        return <h2>Selecciona una opción para ver su contenido</h2>;
    }
  };

  return (
    <div className="fondo">
      <Cabecera />
      <div className="titulo">
        <h1>Tablas UsachSegura</h1>
      </div>
      <div className="opciones">
        <button className="botones" onClick={() => handleTabChange("sectores")}>
          <h2> Sectores </h2>
        </button>
      </div>
      <div className="datos_tabla">
        <div className="datos_tabla">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AdminSpaceWork;
