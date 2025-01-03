import React, { useState, useContext } from "react";
import "./css/BarraNavegacion.css";
import logo from "../assets/LogoSF.png"; // Importar la imagen desde la carpeta assets
import Cabecera from "./Cabecera.jsx";
import { UserContext } from "../userContext.jsx";

export default function Navbar({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { email, userType } = user;

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false); // Cerrar el menú al seleccionar una opción
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="panel_lateral">
        <Cabecera />
        <h1 className="titulo">Usach Segura</h1>
        <ul className="opcionesss">
          <li onClick={listar_sectores_frecuentados}>Lugares Frecuentados</li>
          <li onClick={() => handleSelect("Pertenencias")}>Pertenencias</li>
          <li onClick={() => handleSelect("Perfil")}>Perfil</li>
        </ul>
        <div className="navbar-logo">
          <img src={logo} alt="USACH" /> {}
        </div>
      </div>
      <div className="caja_boton_panel">
        <button className={`boton-toggle`} onClick={toggleMenu}>
          &#9776; {}
        </button>
      </div>
    </div>
  );
}
