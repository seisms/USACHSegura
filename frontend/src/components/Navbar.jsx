import React, { useState, useContext } from "react";
import "./css/Navbar.css";
import logo from "../assets/LogoSF.png"; // Importar la imagen desde la carpeta assets
import Cabecera from "./Cabecera.jsx";
import PanelPertenencias from "./PanelesPrincipal/PanelPertenencias.jsx";
import PanelPerfil from "./PanelesPrincipal/PanelPerfil.jsx";
import { UserContext } from "../userContext.jsx";

export default function Navbar() {
  const [isOpenMain, setIsOpenMain] = useState(false);
  const [isOpenPert, setIsOpenPert] = useState(false);
  const [isOpenPerf, setIsOpenPerf] = useState(false);
  const { user } = useContext(UserContext);
  const { email, userType } = user;

  const handleSelect = (option) => {
    if (option === "Pertenencias") {
      setIsOpenPert(!isOpenPert);
    } else if (option === "Perfil") {
      setIsOpenPerf(!isOpenPerf);
    }
  };

  const toggleMenu = () => {
    setIsOpenMain(!isOpenMain);
  };

  function listar_sectores_frecuentados() {
    console.log(email);
    fetch("http://localhost:3001/list-sec-frec", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Parsing data");
        if (data.success) {
          console.log(data.result);
        } else {
          console.error(data.message);
        }
      });
  }

  return (
    <div className={`navbar ${isOpenMain ? "open" : ""}`}>
      <div className="panel_lateral">
        <Cabecera />
        <div className={`panel_pertenencias ${isOpenPert ? "open" : ""}`}>
          <PanelPertenencias handleSelect={handleSelect} />
        </div>
        <div className={`panel_perfil ${isOpenPerf ? "open" : ""}`}>
          <PanelPerfil handleSelect={handleSelect} />
        </div>
        <h1 className="titulo">Usach Segura</h1>
        <ul className="opcionesss">
          <li onClick={listar_sectores_frecuentados}>Lugares Frecuentados</li>
          <li onClick={() => handleSelect("Pertenencias")}>Pertenencias</li>
          <li onClick={() => handleSelect("Perfil")}>Perfil</li>
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
