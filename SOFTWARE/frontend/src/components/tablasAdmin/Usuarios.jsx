import { useState, useEffect } from "react";

function Usuario() {

    const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
    const [rows, setRows] = useState([]);
    const [Us_correo, setUs_correo] = useState(""); // Controla el id/correo del usuario
    const [Us_contrasenya, setUs_contrasenya] = useState(""); // Controla la contraseña del usuario
    const [Us_fono, setUs_fono] = useState(""); // Controla el fono del usuario
    const [op, setOP] = useState(""); // Define la operación a realizar
    const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario

    function consultarUsuario() { //Funcion para mostrar las filas
        fetch("http://localhost:3001/listar/usuarios", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log(data.result);
                    setRows(data.result || []);
                } else {
                    setFeedback("No hay usuarios para listar");
                }
            })
            .catch((error) => {
                console.error(error);
                setFeedback("No se pudo cargar la tabla.");
            });
    };

    function mantenerUsuario() { // Funcion similar al del App.jsx

        if (!Us_contrasenya && !Us_correo) {
            setFeedback("Ingrese el Usuario");
            return;
        }

        fetch(`http://localhost:3001/usuario-maintain/${op}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ Us_correo, Us_fono, Us_contrasenya }),
        })
            .then((response) => { //Mensaje de éxito, no se como hacerlo pal error, no caxo cmo hacerl
                return response.json();
            })
            .then((data) => {
                setFeedback(data.result);
                consultarUsuario();
            });
    }

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Agregar":
                return <div className="fAM">
                    <div className="subtitulo"><h3>Agregar Usuario</h3></div>
                    <form className="fo"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setOP("a");
                            mantenerUsuario();
                        }}>

                        <label htmlFor="name">Correo del Usuario a reestablecer:</label>
                        <input
                            type="email"
                            id="email"
                            value={Us_correo}
                            onChange={(e) => setUs_correo(e.target.value)}
                            required
                        />
                        <button type="submit">Confirmar</button>
                    </form>
                </div>

            case "Eliminar":
                return <div className="fAM">
                    <div className="subtitulo"><h3>Eliminar Usuario</h3></div>
                    <form className="fo"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setOP("d");
                            mantenerUsuario();
                        }}
                    >
                        <label htmlFor="name">Correo del Usuario a desactivar:</label>
                        <input
                            type="email"
                            id="email"
                            value={Us_correo}
                            onChange={(e) => setUs_correo(e.target.value)}
                            required
                        />
                        <button type="submit">Confirmar</button>
                    </form>
                </div>

            default: return null;
        }
    }

    useEffect(() => {
        consultarUsuario();
    }, []);
    return (
        <div className="datos_tabla">
            <div className="titulo">
                <h2>Tabla Usuarios</h2>
            </div>
            <div className="f_filas">
                <h4>Filas de la tabla Usuario:</h4>
                {rows.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(rows[0]).map((col) => (
                                    <th key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {Object.keys(row).map((key, idx) => (
                                        <td key={idx}>
                                            {typeof row[key] === "object"
                                                ? JSON.stringify(row[key]) // Mostrar objetos anidados como string
                                                : row[key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos disponibles.</p>
                )}
            </div>
            <div className="opciones">
                <button className="botones" onClick={() => { setSelectedTab("Agregar"); setOP("a"); }}> <h2> Reestablecer </h2> </button>
                <button className="botones" onClick={() => { setSelectedTab("Eliminar"); setOP("e"); }}> <h2> Desactivar </h2></button>
            </div>

            {feedback && <div className="feedback">{feedback}</div>}

            <div className="f_tabla">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default Usuario;
