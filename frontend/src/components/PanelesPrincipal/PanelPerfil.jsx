import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../userContext.jsx'
import Cabecera from "../Cabecera";
import "../css/Paneles/PanelPerfil.css";

function PanelPertenencias({ handleSelect }) {
  const { user } = useContext(UserContext);
  const { email, userType } = user;
  const [correo, setCorreo] = useState("");
  const [fono, setFono] = useState("");


  fetch(`http://localhost:3001/info/perfil/${email}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.success) {
        setCorreo(data.result.us_correo || "");
        setFono(data.result.us_fono || "");
      } else {
        console.error(data.message);
      }
    });

  return (
    <div className="fondo-panel-perfil">
      <Cabecera />
      <h1 className="titulo">Perfil</h1>
      <div className="contenido-perfil">
        <div className="box-perfil">
            <p className='box-perfil-header'> Correo </p>
            <p className='box-perfil-info'> {correo || "No disponible"} </p>
        </div>
        <div className="box-perfil">
            <p className='box-perfil-header'> Teléfono </p>
            <p className='box-perfil-info'> {fono || "No disponible"} </p>
        </div>
      </div>
      <div className="perfil-little-buttons">
        <button onClick={() => handleSelect("Perfil")}> Atras </button>
        <button> Cerrar Sesion </button>
      </div>
    </div>
  );
}

export default PanelPertenencias;
