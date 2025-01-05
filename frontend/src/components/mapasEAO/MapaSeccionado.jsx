import React from "react";
import BlancoNegro from "../../assets/MapaU/BlancoNegro.png";
import sectorImages from "../../assets/MapaU/sectors"; // Archivo que exporta todas las imágenes de sectores
import "../css/MapaSeccionado.css";

function SeccionedMap() {
  const sectors = Array.from({ length: 14 }, (_, i) => i + 1); // Crear una lista de sectores [1, 2, ..., 14]

  const handleClick = (sector) => {
    alert(`Sector ${sector}`); // Aquí puedes reemplazarlo por acciones específicas
  };

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
    </div>
  );
}

export default SeccionedMap;
