import { useState, useEffect } from "react";

function TIncidente() {

    const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
    const [rows, setRows] = useState([]);
    const [Tin_tid, setTin_tid] = useState(0); // Controla el valor del archivo de imagen
    const [Tin_tnombre, setTin_tnombre] = useState(""); // Controla el valor del nombre del sector
    const [op, setOP] = useState(""); // Define la operación a realizar
    const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario

    function consultarTIncidente() { //Funcion para mostrar las filas
        fetch("http://localhost:3001/listar-tincidentes", {
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

    function mantenerTIncidente() { // Funcion similar al del App.jsx

        if (!Tin_tid && !Tin_tnombre) {
            setFeedback("Ingrese el Tipo de Incidente");
            return;
        }

        fetch(`http://localhost:3001/tincidente-maintain/${op}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ Tin_tid, Tin_tnombre }),
        })
            .then((response) => { //Mensaje de éxito, no se como hacerlo pal error, no caxo cmo hacerl
                return response.json();
            })
            .then((data) => {
                setFeedback(data.result);
                consultarTIncidente();
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
                return <div className="fAM">
                <div className="subtitulo"><h3>Agregar Tipo de Incidente</h3></div>
                <form className="fo"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setOP("a");
                        mantenerTIncidente();
                    }}
                >
                    <label htmlFor="name">Nombre del Tipo de Incidente a agregar:</label>
                    <input
                        type="text"
                        id="name"
                        value={Tin_tnombre}
                        onChange={(e) => setTin_tnombre(e.target.value)}
                        required
                    />
                    <button type="submit">Confirmar</button>
                </form>
            </div>

            case "Modificar":
                return <div className="f_fAM">
                    <div className="subtitulo"><h3>Modificar Tipo de Incidente</h3> </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setOP("m");
                        mantenerTIncidente();
                    }} className="fAM">
                        <div className="fila">
                            <label htmlFor=""> Id: </label>
                            <input type="text" value={Tin_tid} onChange={(e) => setTin_tid(e.target.value)}/>
                        </div>
                        <div className="fila">
                            <label htmlFor=""> Tipo de Incidente: </label>
                            <input type="text" value={Tin_tnombre} onChange={(e) => setTin_tnombre(e.target.value)} />
                        </div>
                        <button type="submit"> Confirmar </button>
                    </form>
                </div>

            case "Eliminar":
                return <div className="fAM">
                    <div className="subtitulo"><h3>Eliminar Tipo de Incidente</h3></div>
                    <form className="fo"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setOP("d");
                            mantenerTIncidente();
                        }}
                    >
                        <label htmlFor="name">Id del Tipo de Incidente a eliminar:</label>
                        <input
                            type="text"
                            id="name"
                            value={Tin_tid}
                            onChange={(e) => setTin_tid(e.target.value)}
                            required
                        />
                        <button type="submit">Confirmar</button>
                    </form>
                </div>

            default: return null;
        }
    }

    useEffect(() => {
        consultarTIncidente();
    },[]);
    return (
        <div className="datos_tabla">
            <div className="titulo">
                <h2>Tabla Tipo de Incidentes</h2>
            </div>
            <div className="f_filas">
                <h4>Filas de la tabla Tipo de Incidentes:</h4>
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

export default TIncidente;