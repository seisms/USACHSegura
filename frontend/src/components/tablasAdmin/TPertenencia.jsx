import { useState, useEffect } from "react";

function TPertenencia() {

    const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
    const [rows, setRows] = useState([]);
    const [Tper_tid, setTper_tid] = useState(0); // Controla el valor del archivo de imagen
    const [Tper_tnombre, setTper_tnombre] = useState(""); // Controla el valor del nombre del sector
    const [op, setOP] = useState(""); // Define la operación a realizar
    const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario

    function consultarTPertenencia() { //Funcion para mostrar las filas
        fetch("http://localhost:3001/listar-tpertenencias", {
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
                    setFeedback("No hay tipo de pertenencias para listar");
                }
            })
            .catch((error) => {
                console.error(error);
                setFeedback("No se pudo cargar la tabla tipo de pertenencias.");
            });
    };

    function mantenerTPertenencia() { // Funcion similar al del App.jsx

        if (!Tper_tid && !Tper_tnombre) {
            setFeedback("Ingrese el tipo de usuario");
            return;
        }

        fetch(`http://localhost:3001/tpertenencia-maintain/${op}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ Tper_tid, Tper_tnombre }),
        })
            .then((response) => { //Mensaje de éxito, no se como hacerlo pal error, no caxo cmo hacerl
                return response.json();
            })
            .then((data) => {
                setFeedback(data.result);
                consultarTPertenencia();
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
                <div className="subtitulo"><h3>Agregar Tipo de Pertenencia</h3></div>
                <form className="fo"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setOP("a");
                        mantenerTPertenencia();
                    }}
                >
                    <label htmlFor="name">Nombre del Tipo de Pertenenecia:</label>
                    <input
                        type="text"
                        id="name"
                        value={Tper_tnombre}
                        onChange={(e) => setTper_tnombre(e.target.value)}
                        required
                    />
                    <button type="submit">Confirmar</button>
                </form>
            </div>

            case "Modificar":
                return <div className="f_fAM">
                    <div className="subtitulo"><h3>Modificar Tipo de Pertenencia</h3> </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setOP("m");
                        mantenerTPertenencia();
                    }} className="fAM">
                        <div className="fila">
                            <label htmlFor=""> Id: </label>
                            <input type="text" value={Tper_tid} onChange={(e) => setTper_tid(e.target.value)}/>
                        </div>
                        <div className="fila">
                            <label htmlFor=""> Tipo de Pertenencias: </label>
                            <input type="text" value={Tper_tnombre} onChange={(e) => setTper_tnombre(e.target.value)} />
                        </div>
                        <button type="submit"> Confirmar </button>
                    </form>
                </div>

            case "Eliminar":
                return <div className="fAM">
                    <div className="subtitulo"><h3>Eliminar Tipo de Pertenencia</h3></div>
                    <form className="fo"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setOP("d");
                            mantenerTPertenencia();
                        }}
                    >
                        <label htmlFor="name">Id del Tipo de Pertenencia a eliminar:</label>
                        <input
                            type="text"
                            id="name"
                            value={Tper_tid}
                            onChange={(e) => setTper_tid(e.target.value)}
                            required
                        />
                        <button type="submit">Confirmar</button>
                    </form>
                </div>

            default: return null;
        }
    }

    useEffect(() => {
        consultarTPertenencia();
    },[]);
    return (
        <div className="datos_tabla">
            <div className="titulo">
                <h2>Tabla Tipo de Pertenencias</h2>
            </div>
            <div className="f_filas">
                <h4>Filas de la tabla Tipo de Pertenencia:</h4>
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

export default TPertenencia;