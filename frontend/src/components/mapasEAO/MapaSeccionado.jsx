import React, { useEffect } from "react";
import BlancoNegro from "../../assets/MapaU/BlancoNegro.png";
import sectorImages from "../../assets/MapaU/sectors"; // Archivo que exporta todas las imágenes de sectores
import PanelSector from "../PanelesPrincipal/PanelSector";
import "../css/MapaSeccionado.css";

function SeccionedMap() {
  const [selectedSector, setSelectedSector] = React.useState(0);
  const [sectores, setSectores] = React.useState([]);  
  const sectors = Array.from({ length: 14 }, (_, i) => i + 1); // Crear una lista de sectores [1, 2, ..., 14]

  function getSectores() {
    fetch("http://localhost:3001/listar/sectores",
      {  
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
          console.log(data.result);
          setSectores(data.result);
        } else {
          console.error(data.message);
        }
      });
  }

  const handleClick = (sector) => {
    alert(`Sector ${sector}`); // Aquí puedes reemplazarlo por acciones específicas
    if(sector <= sectores.length){
      console.log(sectores[sector - 1]);
      setSelectedSector(sectores[sector - 1]);
    }
  };
  
  useEffect(() => {
    getSectores();
  }, []);

  return (
    <div className="fondo-mapa-seccionado">
      <div className="titulo-mapa">
        <h1> Escuela de Artes y Oficios </h1>
        <h4>Sector 2</h4>
      </div>
      <div className="mapa-seccionado">
        <img
          src={BlancoNegro}
          alt="Mapa del Campus"
          className="mapa-blanco-negro"
        />
        {sectors.map((sector) => (
          <React.Fragment key={sector}>
            {/* Condicional para el sector 11 */}
            {sector === 11 ? (
              <>
                <div
                  className="section-active"
                  id={`sector${sector}-active`}
                  onClick={() => handleClick(sector)}
                ></div>
                <div
                  className="section-active"
                  id={`sector${sector}sec-active`}
                  onClick={() => handleClick(sector)}
                ></div>
              </>
            ) : (
              <div
                className="section-active"
                id={`sector${sector}-active`}
                onClick={() => handleClick(sector)}
              ></div>
            )}
            <img
              src={sectorImages[`Sector${sector}`]}
              alt={`Sector${sector}-img`}
              id={`sector${sector}-img`}
              className="imagen-sectores"
            />
          </React.Fragment>
        ))}
      </div>
      {/* Aquí puedes agregar el panel de información del sector */}
      {selectedSector !== 0 && (<PanelSector sector={selectedSector}/>)}
    </div>
  );
}

export default SeccionedMap;
