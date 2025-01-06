import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../css/Paneles/PanelSector.css";

function PanelSector({ sector }) {
    const email = Cookies.get("username");
    const userType = Cookies.get("usertype");
    const [infoSector, setInfoSector] = useState(null);

    function InformacionSector() {
        console.log("Obteniendo información del sector:", sector);
        fetch(`http://localhost:3001/info/sector/${sector}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log("Data recibida:", data.result);
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

    return (
        <div className="info-sector" >
            <h1>Reportes del Sector </h1>
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

                    <h3>Detalles de Reportes:</h3>
                    {infoSector.recent_reports && infoSector.recent_reports.length > 0 ? (
                        infoSector.recent_reports.map((report, index) => (
                            <table key={index} className="info-sector-detalles">
                                <tbody>
                                    <tr>
                                        <th>Tipo de Incidente:</th>
                                        <td>{report.tin_tnombre}</td>
                                    </tr>
                                    <tr>
                                        <th>Fecha:</th>
                                        <td>{new Date(report.rep_fecha).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Hora:</th>
                                        <td>{report.rep_hora}</td>
                                    </tr>
                                </tbody>
                            </table>
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
