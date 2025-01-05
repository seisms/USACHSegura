import { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import "../css/Paneles/PanelReportes.css";

export default function PanelReportes({ handleSelect, frecuentados }) {
    const [reportesPorSector, setReportesPorSector] = useState([]);

    function listar_reportes_por_sector() {
        const nuevosReportes = {};


        setReportesPorSector([])
        frecuentados.forEach((sector) => {
            fetch(`http://localhost:3001/listar/reportes/${sector.frec_sector}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        nuevosReportes[sector.frec_sector] = data.result;
                    } else {
                        console.error(
                            `Error obteniendo reportes para ${sector.frec_sector}: ${data.message}`
                        );
                        nuevosReportes[sector.frec_sector] = [];
                    }
                })
                .catch((error) => {
                    console.error(
                        `Error obteniendo reportes para ${sector.frec_sector}:`,
                        error
                    );
                    nuevosReportes[sector.frec_sector] = [];
                })
                .finally(() => {
                    setReportesPorSector((prevState) => ({
                        ...prevState,
                        [sector.frec_sector]: nuevosReportes[sector.frec_sector],
                    }));
                });
        });
    }

    useEffect(() => {
        listar_reportes_por_sector();
    }, [frecuentados]);

    return (
        <div className="fondo-panel-reportes">
            <Cabecera />
            <h1 className="titulo">Reportes realizados</h1>
            <div className="lista-reportes">
                {Object.keys(reportesPorSector).map((sector) => (
                    <div key={sector} className="sector-reportes">
                        <h2>{sector}</h2>
                        {reportesPorSector[sector]?.length > 0 ? (
                            <ul className="reporte-vertical">
                                {reportesPorSector[sector].map((reporte) => (
                                    <li key={reporte.rep_id} className="reporte-item">
                                        <p>
                                            <strong>ID:</strong> {reporte.rep_id}
                                        </p>
                                        <p>
                                            <strong>Correo:</strong> {reporte.rep_correo}
                                        </p>
                                        <p>
                                            <strong>Fecha:</strong>{" "}
                                            {new Date(reporte.rep_fecha).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Hora:</strong> {reporte.rep_hora}
                                        </p>
                                        <p>
                                            <strong>Tipo:</strong> {reporte.rep_tipo}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No se encontraron reportes para este sector.</p>
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
