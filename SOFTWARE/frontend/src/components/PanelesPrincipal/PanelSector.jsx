import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/Paneles/PanelSector.css";

function PanelSector({ sector }) {
    const email = Cookies.get("username");
    const userType = Cookies.get("usertype");
    const [infoSector, setInfoSector] = useState(null);
    const [detalleReporte, setDetalleReporte] = useState({}); // Estado para almacenar detalles de los reportes

    function InfoReporte(rep_id) {
        fetch(`http://localhost:3001/info/reporte/${rep_id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setDetalleReporte((prev) => ({
                        ...prev,
                        [rep_id]: data.result, // Almacena el detalle del reporte usando su rep_id
                    }));
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function InformacionSector() {
        fetch(`http://localhost:3001/info/sector/${sector}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setInfoSector(data.result);
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        InformacionSector();
    }, [sector]);

    const toggleDetails = (rep_id) => {
        if (!detalleReporte[rep_id]) {
            InfoReporte(rep_id); // Si no está cargado, lo cargamos
        } else {
            setDetalleReporte((prev) => {
                const updated = { ...prev };
                delete updated[rep_id]; // Si ya está cargado, lo eliminamos para colapsar
                return updated;
            });
        }
    };

    return (
        <div className="info-sector">
            <h1>Reportes del Sector</h1>
            <h2>{sector}</h2>
            {infoSector ? (
                <div className="tabla-info-sector">
                    <table className="info-sector-general">
                        <tbody>
                            <tr>
                                <th>Total:</th>
                                <td>{infoSector.total}</td>
                            </tr>
                            <tr>
                                <th>Reportes Recientes:</th>
                                <td>{infoSector.recent_count}</td>
                            </tr>
                            <tr>
                                <th>Nivel de seguridad:</th>
                                <td>{infoSector.security}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Reportes recientes:</h3>
                    {infoSector.recent_reports && infoSector.recent_reports.length > 0 ? (
                        infoSector.recent_reports.map((report) => (
                            <div key={report.rep_id} className="reporte-item">
                                <div
                                    className="reporte-header"
                                    onClick={() => toggleDetails(report.rep_id)}
                                >
                                    <p>Fecha: {new Date(report.rep_fecha).toLocaleDateString()}</p>
                                </div>
                                {detalleReporte[report.rep_id] && (
                                    <div className="reporte-detalles">
                                        <table className="tabla-detalles">
                                            <tbody>
                                                <tr>
                                                    <th>Correo:</th>
                                                    <td>{detalleReporte[report.rep_id].reporte.rep_correo}</td>
                                                </tr>
                                                <tr>
                                                    <th>Sector:</th>
                                                    <td>{detalleReporte[report.rep_id].reporte.rep_sector}</td>
                                                </tr>
                                                <tr>
                                                    <th>Tipo de Incidente:</th>
                                                    <td>{detalleReporte[report.rep_id].reporte.tin_tnombre}</td>
                                                </tr>
                                                <tr>
                                                    <th>Hora:</th>
                                                    <td>{detalleReporte[report.rep_id].reporte.rep_hora}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No hay reportes recientes disponibles.</p>
                    )}
                </div>
            ) : (
                <p>No hay información disponible.</p>
            )}
        </div>
    );
}

export default PanelSector;
