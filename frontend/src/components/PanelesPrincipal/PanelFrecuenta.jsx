import { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import "../css/Paneles/PanelFrecuenta.css";

export default function PanelFrecuenta({ handleSelect, email, setFrecuenta }) {
    const [frecuentados, setFrecuentados] = useState([]);
    const [rows, setRows] = useState([]);
    const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario
    const [frec_has_changed, setChanged] = useState(true)
    const [isOpenPopup, setIsOpenPopup] = useState("");

    function listar_sectores_frecuentados() {
        fetch(`http://localhost:3001/listar/sectores_frecuentados/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setFrecuentados(data.result); //info local
                    setFrecuenta(data.result); //info para PanelReportes
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function consultarSector() {
        // Funcion para mostrar las filas
        fetch("http://localhost:3001/listar/sectores", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRows(data.result || []);
                } else {
                    setFeedback("No hay sectores para listar");
                }
            })
            .catch((error) => {
                console.error(error);
                setFeedback("No se pudo cargar la tabla.");
            });
    }

    useEffect(() => {
        if (frec_has_changed === true) {
            listar_sectores_frecuentados();
            setChanged(false)
        }
        consultarSector();
    }, [email, frec_has_changed]);

    function addFrecuenta() {
        setIsOpenPopup(!isOpenPopup);
    }

    function verificarBox() {
        rows.forEach((row) => {
            const checkbox = document.getElementById(row.sec_nombre);
            const isChecked = checkbox.checked;

            const isFrequented = frecuentados.some(
                (frecuentado) => frecuentado.frec_sector === row.sec_nombre
            );

            if (isChecked && !isFrequented) {
                gestion_frecuenta(row.sec_nombre, "LFC"); // Llamar a Registrar si está activada pero no estaba frecuentada
            }

            if (!isChecked && isFrequented) {
                gestion_frecuenta(row.sec_nombre, "LFD"); // Llamar a Eliminar si estaba frecuentada pero ahora está desactivada
            }
        });
    }

    function gestion_frecuenta(sec_nombre, op) {
        if (op === "LFC") { console.log(`Registrar: ${sec_nombre}`); }
        else if (op === "LFD") { console.log(`Eliminar: ${sec_nombre}`); }

        const payload = {
            correo: email,
            sector: sec_nombre,
        };

        fetch(`http://localhost:3001/gestion-de-perfil/${op}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setChanged(true)
                    setFeedback("Sector frecuentado registrado con éxito.");
                } else {
                    setFeedback(data.message || "Error al registrar el usuario.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setFeedback(error.message || "Error interno del servidor.");
            });
    }

    return (
        <div className="fondo-panel-frecuenta">
            <Cabecera />
            <h1 className="titulo">Sectores frecuentados</h1>
            <div className="contenido-frecuenta">
                <div className="lista-frecuentados">
                    {frecuentados.length > 0 ? (
                        <ul>
                            {frecuentados.map((frecuentado, index) => (
                                <li key={index}>{frecuentado.frec_sector}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron sectores frecuentados.</p>
                    )}
                </div>
            </div>
            <div className="perfil-little-buttons">
                <button onClick={() => addFrecuenta()}> Modificar </button>
            </div>
            <div className="perfil-little-buttons">
                <button onClick={() => handleSelect("Frecuenta")}> Atras </button>
            </div>
            <div className={`frecuenta-popup ${isOpenPopup ? "open" : ""}`}>
                <div className="titulo">
                    <h2>Tabla Sectores</h2>
                </div>
                <form className="seleccion-frecuenta">
                    {rows.length > 0 ? (
                        <>
                            {rows.map((row, index) => {
                                // Comprobar si el sector está en el arreglo 'frecuentados'
                                const isChecked = frecuentados.some(
                                    (frecuentado) => frecuentado.frec_sector === row.sec_nombre
                                );
                                return (
                                    <div key={index} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            id={row.sec_nombre} // Establecer un id único por sector
                                            defaultChecked={isChecked} // Establecer el valor 'checked' por defecto
                                        />
                                        <label>{row.sec_nombre}</label>
                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <p>No hay datos disponibles</p>
                    )}
                    <button
                        className="popup-buttons"
                        type="button"
                        onClick={() => { verificarBox(), addFrecuenta() }} // Llamar a verificarBox al hacer clic
                    >
                        Confirmar
                    </button>
                </form>
                <button className="popup-buttons" onClick={() => addFrecuenta()}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
