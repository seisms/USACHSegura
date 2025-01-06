import React, { useState, useEffect } from 'react';

const NotificarReporte = ({ rep_id }) => {
    //Informacion del reporte relevantes para la notificacion
    const [repSector, setRepSector] = useState("");
    const [repTipo, setRepTipo] = useState("");
    const [repUPerts, setRepUPerts] = useState([]);
    //Listado de los usuarios a notificar
    const [usuariosNotificados, setUsuariosNotificados] = useState([]);

    const [error, setError] = useState(null);
    const [reporteInfo, setReporteInfo] = useState(null);

    useEffect(() => {
        if (!rep_id) return;

        const NuevoReporte = async () => {
            try {
                const response = await fetch(`http://localhost:3001/info/reporte/${rep_id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                    },
                });

                const data = await response.json();
                const reporte = data?.result?.reporte;
                const pusurpada = data?.result?.pertenencias_usurpadas;

                if (data.success === true) {
                    setReporteInfo(data.result);
                    setRepSector(reporte.rep_sector);
                    setRepTipo(reporte.rep_tipo);
                    setRepUPerts(pusurpada);
                }
                else {
                    console.error('Error al obtener datos del reporte:', data.message);
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error en la solicitud de reporte:', error);
                setError('No se pudo obtener la información del reporte.');
            }
        };

        NuevoReporte();
    }, [rep_id]);

    useEffect(() => {
        if (!repSector) return;

        const ListadoUsuarios = async () => {
            try {
                const response = await fetch(`http://localhost:3001/listar/usuarios_por_sector/${repSector}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                    },
                });

                const data = await response.json();

                if (data.success) {
                    setUsuariosNotificados(data.result);
                }
                else {
                    console.error('Error al listar usuarios:', data.message);
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error en la solicitud de usuarios:', error);
                setError('No se pudo obtener la información de los usuarios.');
            }
        };

        ListadoUsuarios();
    }, [repSector]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!reporteInfo) {
        return <p>Cargando información del reporte...</p>;
    }

    return (
        <div>
            <h1>Reporte ID: {rep_id}</h1>
            <p><strong>Sector:</strong> {repSector}</p>
            <p><strong>Tipo de Incidente:</strong> {repTipo}</p>
            <p><strong>Pertenencias Usurpadas:</strong> {repUPerts.join(", ") || "Ninguna"}</p>
            <h2>Usuarios a Notificar:</h2>
            <ul>
                {usuariosNotificados.map((usuario, index) => (
                    <li key={index}>{usuario.frec_correo}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificarReporte;
