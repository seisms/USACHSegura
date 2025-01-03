import React, { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import "../css/Paneles/PanelPertenencias.css";

function PanelPertenencias({ handleSelect }) {
  const email = "vicente.torres@usach.cl"; // Correo para pruebas
  const [pertenencias, setPertenencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detalleVisible, setDetalleVisible] = useState(null);

  useEffect(() => {
    const fetchPertenencias = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3001/pertenencias", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (data.success) {
          setPertenencias(data.result);
        } else {
          setError(data.message || "No se pudieron cargar las pertenencias.");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPertenencias();
  }, [email]);

  const toggleDetalle = (index) => {
    setDetalleVisible(detalleVisible === index ? null : index);
  };

  return (
    <div className="fondo-panel-pertenencias">
      <Cabecera />
      <h1 className="titulo">Pertenencias</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      <div className="lista-pertenencias">
        {pertenencias.map((pertenencia, index) => (
          <div key={index} className="pertenencia">
            <button
              className="pertenencia-boton"
              onClick={() => toggleDetalle(index)}
            >
              {`Pertenencia ${index + 1}`}
            </button>
            {detalleVisible === index && (
              <div className="detalle-pertenencia">
                <p>Tipo: {pertenencia.tipo}</p>
                <img
                  src={pertenencia.imagen}
                  alt={`Imagen de ${pertenencia.tipo}`}
                  className="imagen-pertenencia"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => handleSelect("Pertenencias")}
        className="boton-atras"
      >
        Atrás
      </button>
    </div>
  );
}

export default PanelPertenencias;
