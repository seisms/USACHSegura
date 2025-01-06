import sectorImages from "../../assets/MapaU/sectors"; // Archivo que exporta todas las imágenes de sectores
import MapI from "../../assets/MapaU/BlancoNegro.png";
import "../css/MapaDefault.css";
import { useEffect, useState } from "react";

export default function defaultMap() {
  const [sectores, setSectores] = useState([]);

  function getSectores() {
    fetch("http://localhost:3001/listar/sectores", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("el");
          console.log(data.result);
          setSectores(data.result);
        } else {
          console.error(data.message);
        }
      });
  }
  /*
   useEffect(() => {
          getSectores();
      }, [sectores]);
  */
  return (
    <div className="fondo-mapa-default">
      <div className="titulo-mapa">
        <h1> Escuela de Artes y Oficios </h1>
        <h4> Sector 2 </h4>
      </div>
      <div className="map-default">
        <img src={MapI} alt="Mapa del Campus" className="map-image" />
        {Object.keys(sectorImages).map((sectorKey, index) => {
          const imageSrc = sectorImages[sectorKey];
          return (
            <img
              key={index}
              className="default-sector"
              src={imageSrc}
              alt={sectorKey}
            />
          );
        })}
      </div>
    </div>
  );
}
