import { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import "../css/Paneles/PanelFrecuenta.css";

export default function PanelFrecuenta({ handleSelect, email, setFrecuenta }) {
  const [frecuentados, setFrecuentados] = useState([]);

  function listar_sectores_frecuentados() {
    console.log(email);
    fetch(`http://localhost:3001/listar/sectores_frecuentados/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Parsing data");
        if (data.success) {
          console.log(data.result);
          setFrecuentados(data.result); //info local
          setFrecuenta(data.result); //info para PanelReportes
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    listar_sectores_frecuentados();
  }, [email]);

  return (
    <div className="fondo-panel-frecuenta">
      <Cabecera />
      <h1 className="titulo">Sectores frecuentados</h1>
      <div className="contenido-frecuenta">
        <div className="lista-frecuentados">
          {frecuentados.length > 0 ? (
            <ul>
              {frecuentados.map((frecuentado, index) => (
                <li key={index}>{frecuentado.frec_sector}</li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron sectores frecuentados.</p>
          )}
        </div>
      </div>
      <div className="perfil-little-buttons">
        <button onClick={() => handleSelect("Frecuenta")}> Atras </button>
      </div>
    </div>
  );
}
