import React, { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
/*import "../css/Paneles/PanelReportes.css";*/

function PanelReportes({ handleSelect }) {
  const email = "vicente.torres@usach.cl"; // Correo para pruebas
  const [reportes, setreportes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detalleVisible, setDetalleVisible] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3001/listar_reportes", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (data.success) {
          setreportes(data.result);
        } else {
          setError(data.message || "No se pudieron cargar los reportes .");
        }
      } catch (err) {
        setError("Error al conectar con el servidor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportes();
  }, [email]);

  const toggleDetalle = (index) => {
    setDetalleVisible(detalleVisible === index ? null : index);
  };

  return (
    <div className="fondo-panel-reportes">
      <Cabecera />
      <h1 className="titulo">Reportes realizados</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      <div className="lista-reportes">
        {reportes.map((reporte, index) => (
          <div key={index} className="reporte">
            <button
              className="reporte-boton"
              onClick={() => toggleDetalle(index)}
            >
              {`Reporte ${index + 1}`}
            </button>
            {detalleVisible === index && (
              <div className="detalle-Reporte">
                <p>Sector: {reporte.REP_SECTOR}</p>
                <p>Tipo: {reporte.REP_DTIPO}</p>
                <p>
                  Fecha: {reporte.REP_FECHA} {reporte.REP_HORA}
                </p>
                <p>Reportado por: {reporte.REP_USU}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => handleSelect("Reportes")} className="boton-atras">
        Atrás
      </button>
    </div>
  );
}

export default PanelReportes;
