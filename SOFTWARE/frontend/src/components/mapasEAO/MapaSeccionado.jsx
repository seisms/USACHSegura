import React, { useEffect } from "react";
import BlancoNegro from "../../assets/MapaU/BlancoNegro.png";
import sectorImages from "../../assets/MapaU/sectors"; // Archivo que exporta todas las imágenes de sectores
import PanelSector from "../PanelesPrincipal/PanelSector";
import "../css/MapaSeccionado.css";

export default function SeccionedMap({}) {
  const [selectedSector, setSelectedSector] = React.useState(null);
  const [isOpenDetalle, setIsOpenDetalle] = React.useState(false);
  const [sectores, setSectores] = React.useState([]);
  const sectors = Array.from({ length: 14 }, (_, i) => i + 1);

  function getSectores() {
    fetch("http://localhost:3001/listar/sectores", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSectores(data.result);
        } else {
          console.error(data.message);
        }
      });
  }

  const handleClick = (sector) => {
    setSelectedSector(sector);
    setIsOpenDetalle(true);
  };

  // Buscar el nombre del sector a partir del número seleccionado
  const getSectorName = () => {
    const sectorObj = sectores.find((item) => item.sec_path === selectedSector);
    return sectorObj ? sectorObj.sec_nombre : "Sector desconocido";
  };

  useEffect(() => {
    getSectores();
  }, []);

  return (
    <div className="fondo-mapa-seccionado">
      <div className="titulo-mapa">
        <h1>Seleccione los sectores</h1>
      </div>
      <div className="mapa-seccionado">
        <img
          src={BlancoNegro}
          alt="Mapa del Campus"
          className="mapa-blanco-negro"
        />
        {sectors.map((sector) => (
          <React.Fragment key={sector}>
            {sector === 11 ? (
              <>
                <div
                  className="section-active-infosec"
                  id={`sector${sector}-active`}
                  onClick={() => handleClick(sector)}
                ></div>
                <div
                  className="section-active-infosec"
                  id={`sector${sector}sec-active`}
                  onClick={() => handleClick(sector)}
                ></div>
              </>
            ) : (
              <div
                className="section-active-infosec"
                id={`sector${sector}-active`}
                onClick={() => handleClick(sector)}
              ></div>
            )}
            <img
              src={sectorImages[`Sector${sector}`]}
              alt={`Sector${sector}-img-infosec`}
              id={`sector${sector}-img-infosec`}
              className="imagen-sectores-infosec"
            />
          </React.Fragment>
        ))}
      </div>
      {/* Popup Detalle Sector */}
      {isOpenDetalle && (
        <div className="pert-form-popup open">
          <div className="popup-content">
            <PanelSector sector={getSectorName()} />
            <button id="close-popup-info-sector" onClick={() => setIsOpenDetalle(false)}> Cerrar </button>
          </div>
        </div>
      )}
    </div>
  );
}
