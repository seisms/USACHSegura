import React, { useEffect } from "react";
import BlancoNegro from "../../assets/MapaU/BlancoNegro.png";
import sectorImages from "../../assets/MapaU/sectors"; // Archivo que exporta todas las imágenes de sectores
import PanelSector from "../PanelesPrincipal/PanelSector";
import "../css/MapaFrecuenta.css";

export default function SeccionedMap({ secSelected, setSecSelected }) {
  const [selectedSector, setSelectedSector] = React.useState(0);
  const [sectores, setSectores] = React.useState([]);
  const sectors = Array.from({ length: 14 }, (_, i) => i + 1); // Crear una lista de sectores [1, 2, ..., 14]

  // Diccionario con los nombres de los sectores
  const sectorNames = {
    1: "Escuela de Artes y Oficios",
    2: "FEUSACH",
    3: "Vicerrectoria de Apoyo Estudiantil",
    4: "Gimnasio EAO",
    5: "Aula Magna",
    6: "Departamento de Ingeneria Informática",
    7: "Departamento de Ingenieria Metalurgica",
    8: "Departamento de Ingenieria Mecánica",
    9: "Facultad Tecnológica",
    10: "Departamento de Ingenieria Industrial",
    11: "Patio EAO",
    12: "Patio Mecánica - Informática",
    13: "Estacionamientos 1",
    14: "Casino EAO",
  };

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
    // Obtener el nombre completo del sector usando el número
    const sectorName = sectorNames[sector];

    // Si el sector ya está seleccionado, lo eliminamos del array
    if (secSelected.includes(sectorName)) {
      setSecSelected(secSelected.filter((item) => item !== sectorName));
    } else {
      // Si no está seleccionado, lo agregamos al array
      setSecSelected([...secSelected, sectorName]);
    }
    console.log("Sectores seleccionados actualmente:", secSelected);
  };

  useEffect(() => {
    getSectores();
  }, []);

  useEffect(() => {
    console.log("secSelected ha cambiado:", secSelected);

    // Recorremos el array secSelected para marcar las imágenes con la clase 'selected'
    const sectorElements = document.querySelectorAll(".imagen-sectores");

    // Primero, eliminamos la clase 'selected' de todas las imágenes
    sectorElements.forEach((imgElement) => {
      imgElement.classList.remove("selected");
    });

    // Ahora recorremos secSelected y le agregamos la clase 'selected' a las imágenes correspondientes
    secSelected.forEach((sectorName) => {
      // Buscar el sector en el diccionario y obtener el número correspondiente
      for (let sectorId in sectorNames) {
        if (sectorNames[sectorId] === sectorName) {
          // Encontramos el sector y agregamos la clase 'selected'
          const imgElement = document.getElementById(`sector${sectorId}-img`);
          if (imgElement) {
            imgElement.classList.add("selected");
          }
          break;
        }
      }
    });
  }, [secSelected]); // Solo se ejecutará cuando secSelected cambie

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
            <div
              className="section-active"
              id={`sector${sector}-active`}
              onClick={() => handleClick(sector)}
            ></div>
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
      {selectedSector !== 0 && <PanelSector sector={selectedSector} />}
    </div>
  );
}
