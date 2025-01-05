import React, { useState, useContext } from "react";
import "./css/BarraNavegacion.css";
import logo from "../assets/LogoSF.png"; // Importar la imagen desde la carpeta assets
import Cabecera from "./Cabecera.jsx";
import PanelPertenencias from "./PanelesPrincipal/PanelPertenencias.jsx";
import PanelPerfil from "./PanelesPrincipal/PanelPerfil.jsx";
import PanelFrecuenta from "./PanelesPrincipal/PanelFrecuenta.jsx";
import { UserContext } from "../userContext.jsx";
import PanelReportes from "./PanelesPrincipal/PanelReportes.jsx";

export default function Navbar() {
  const [isOpenMain, setIsOpenMain] = useState(false); // Para abrir o cerrar paneles laterales
  const [isOpenPert, setIsOpenPert] = useState(false);
  const [isOpenPerf, setIsOpenPerf] = useState(false);
  const [isOpenRep, setIsOpenRep] = useState(false);
  const [isOpenFre, setIsOpenFre] = useState(false);
  const [frecuenta, setFrecuenta] = useState([]); //Pasar info a PanelReportes
  const { user } = useContext(UserContext);
  const { email, userType } = user;

  const handleSelect = (option) => {
    if (option === "Frecuenta") {
      setIsOpenFre(!isOpenFre);
    } else if (option === "Pertenencias") {
      setIsOpenPert(!isOpenPert);
    } else if (option === "Perfil") {
      setIsOpenPerf(!isOpenPerf);
    } else if (option === "Reportes") {
      setIsOpenRep(!isOpenRep);
    }
  };

  const toggleMenu = () => {
    setIsOpenMain(!isOpenMain);
  };

  return (
    <div className={`navbar ${isOpenMain ? "open" : ""}`}>
      <div className="panel_lateral">
        <Cabecera />
        <div className={`panel_frecuenta ${isOpenFre ? "open" : ""}`}>
          <PanelFrecuenta
            handleSelect={handleSelect}
            email={email}
            setFrecuenta={setFrecuenta}
          />
        </div>
        <div className={`panel_pertenencias ${isOpenPert ? "open" : ""}`}>
          <PanelPertenencias handleSelect={handleSelect} />
        </div>
        <div className={`panel_perfil ${isOpenPerf ? "open" : ""}`}>
          <PanelPerfil handleSelect={handleSelect} email={email} />
        </div>
        <div className={`panel_reportes ${isOpenRep ? "open" : ""}`}>
          <PanelReportes handleSelect={handleSelect} frecuentados={frecuenta} />
        </div>
        <h1 className="titulo">Usach Segura</h1>
        <ul className="opcionesss">
          <li onClick={() => handleSelect("Frecuenta")}>
            Lugares Frecuentados
          </li>
          <li onClick={() => handleSelect("Pertenencias")}>Pertenencias</li>
          <li onClick={() => handleSelect("Perfil")}>Perfil</li>
          <li onClick={() => handleSelect("Reportes")}>Reportes</li>
        </ul>
        <div className="navbar-logo">
          <img src={logo} alt="USACH" />
        </div>
      </div>
      <div className="caja_boton_panel">
        <button className={`boton-toggle`} onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
    </div>
  );
}
