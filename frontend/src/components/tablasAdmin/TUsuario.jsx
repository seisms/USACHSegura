import { useState, useEffect } from "react";

function TUsuario() {

    const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
    const [rows, setRows] = useState([]);
    const [Tu_tid, setTu_tid] = useState(null); // Controla el valor del archivo de imagen
    const [Tu_tnombre, setTu_tunombre] = useState(""); // Controla el valor del nombre del sector
    const [op, setOP] = useState(""); // Define la operación a realizar
    const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario

    function consultarTUsuario() { //Funcion para mostrar las filas
        fetch("http://localhost:3001/listar-tusuarios", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.success) {
                    console.log(data.result);
                    setRows(data.result || []);
                } else {
                    setFeedback("No hay sectores para listar");
                }
            })
            .catch((error) => {
                console.error(error);
                setFeedback("No se pudo cargar la tabla.");
            });
    };

    function mantenerTUsuario() { // Funcion similar al del App.jsx

        if (!name ) {
            setFeedback("Ingrese el tipo de usuario");
            return;
        }

        fetch(`http://localhost:3001/tusuario-maintain/${op}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ Tu_tid, Tu_tnombre }),
        })
            .then((response) => { //Mensaje de éxito, no se como hacerlo pal error, no caxo cmo hacerl
                return response.text();
            })
            .then((data) => {
                console.log(data);
                setFeedback(data);
                consultarTUsuario();
            });
    }

    //const handleImageChange = (e) => {
    //	setImage(e.target.files[0]);
    //};
    //const handleImageChange = (e) => {
    //	setImage(e.target.files[0]);
    //};

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Agregar":
            case "Modificar":
                return <div className="f_fAM">
                    <div className="subtitulo"><h3>{selectedTab === "Agregar" ? "Agregar Tipo de Usuario" : "Modificar Tipo de Usuario"}</h3> </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setOP(selectedTab === "Agregar" ? "c" : "m");
                        mantenerTUsuario();
                    }} className="fAM">
                        <div className="fila">
                            <label htmlFor=""> Nueva id: </label>
                            <input type="text" value={Tu_tid} onChange={(e) => setTu_tid(e.target.value)}/>
                        </div>
                        <div className="fila">
                            <label htmlFor=""> Tipo de Usuario: </label>
                            <input type="text" value={Tu_tnombre} onChange={(e) => setTu_tunombre(e.target.value)} />
                        </div>
                        <button type="submit"> Confirmar </button>
                    </form>
                </div>

            case "Eliminar":
                return <div className="fAM">
                    <div className="subtitulo"><h3>Eliminar Tipo de Usuario</h3></div>
                    <form className="fo"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setOP("d");
                            mantenerTUsuario();
                        }}
                    >
                        <label htmlFor="name">Nombre del Tipo de Usuario a eliminar:</label>
                        <input
                            type="text"
                            id="name"
                            value={Tu_tid}
                            onChange={(e) => setTu_tid(e.target.value)}
                            required
                        />
                        <button type="submit">Confirmar</button>
                    </form>
                </div>

            default: return null;
        }
    }

    useEffect(() => {
        consultarTUsuario();
    },[]);
    return (
        <div className="datos_tabla">
            <div className="titulo">
                <h2>Tabla Tipo de Usuarios</h2>
            </div>
            <div className="f_filas">
                <h4>Filas de la tabla Tipo de Usuarios:</h4>
                {rows.length > 0 ? (
                    <table>
                        <thead>
                            {Object.keys(rows[0]).map((col) => (
                                <th key={col}>{col}</th>
                            ))}
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
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
                <button className="botones" onClick={() => { setSelectedTab("Agregar"); setOP("a"); }}> <h2> Agregar </h2> </button>
                <button className="botones" onClick={() => { setSelectedTab("Modificar"); setOP("m");}}> <h2> Modificar </h2> </button>
                <button className="botones" onClick={() => { setSelectedTab("Eliminar"); setOP("e");}}> <h2> Eliminar </h2></button>
            </div>

            {feedback && <div className="feedback">{feedback}</div>}

            <div className="f_tabla">
                {renderTabContent()}
            </div>
        </div>
    );
}

export default TUsuario;