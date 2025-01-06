import { useRef, useState, useEffect } from "react";

function Sectores() {
    const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
    const [rows, setRows] = useState([]);
    const [name, setName] = useState(""); // Controla el valor del nombre del sector
    const [op, setOP] = useState(""); // Define la operación a realizar
    const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario
    // https://stackoverflow.com/questions/41453224/uploading-a-file-with-reactjs-and-dealing-with-c-fakepath-file
    const [image, setImage] = useState(null); // Controla el valor del archivo de imagen
    const inputRef = useRef()

    function consultarSector() {
        //Funcion para mostrar las filas
        fetch("http://localhost:3001/listar/sectores", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
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

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result.split(',')[1])
            }
            reader.readAsDataURL(file);
        }
    }

    function mantenerSector() {
        if (!name) {
            setFeedback("Ingrese el nombre del sector");
            return;
        }

        fetch(`http://localhost:3001/sector-maintain/${op}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name, image }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.success) {
                    console.log(data.result);
                    setFeedback(data.result);
                } else {
                    console.error(data.message);
                    setFeedback(data.message);
                }
                consultarSector();
            });
    }

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Agregar":
            case "Modificar":
                return (
                    <div className="f_fAM">
                        <div className="subtitulo">
                            <h3>
                                {selectedTab === "Agregar"
                                    ? "Agregar Sector"
                                    : "Modificar Sector"}
                            </h3>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setOP(selectedTab === "Agregar" ? "c" : "m");
                                mantenerSector();
                            }}
                            className="fAM"
                        >
                            <div className="fila">
                                <label htmlFor=""> Nombre: </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="fila">
                                <label htmlFor=""> Imagen: </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    ref={inputRef}
                                />
                            </div>
                            <button type="submit"> Confirmar </button>
                        </form>
                    </div>
                );

            case "Eliminar":
                return (
                    <div className="fAM">
                        <div className="subtitulo">
                            <h3>Eliminar Sector</h3>
                        </div>
                        <form
                            className="fo"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setOP("d");
                                mantenerSector();
                            }}
                        >
                            <label htmlFor="name">Nombre del Sector a eliminar:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <button type="submit">Confirmar</button>
                        </form>
                    </div>
                );

            default:
                return null;
        }
    };


    useEffect(() => {
        consultarSector();
    }, []);
    return (
        <div className="datos_tabla">
            <div className="titulo">
                <h2>Tabla Sectores</h2>
            </div>
            <div className="f_filas">
                <h4>Filas de la tabla Sectores:</h4>
                {rows.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Imagen</th>
                                <th>Seguridad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.sec_nombre}</td>
                                    <td>
                                        {console.log(`image for ${row.sec_nombre}`, row.sec_img)}
                                        {row.sec_img ? (
                                            <img
                                                src={`data:image/png;base64,${row.sec_img}`}
                                                alt={`Imagen de ${row.sec_nombre}`}
                                                style={{ width: "100px", height: "100px" }} // Ajusta el tamaño según sea necesario
                                            />
                                        ) : (
                                            "Sin imagen"
                                        )}
                                    </td>
                                    <td>{row.sec_seguridad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay datos disponibles</p>
                )}
            </div>
            <div className="opciones">
                <button
                    className="botones"
                    onClick={() => {
                        setSelectedTab("Agregar");
                        setOP("a");
                    }}
                >
                    {" "}
                    <h2> Agregar </h2>{" "}
                </button>
                <button
                    className="botones"
                    onClick={() => {
                        setSelectedTab("Modificar");
                        setOP("m");
                    }}
                >
                    {" "}
                    <h2> Modificar </h2>{" "}
                </button>
                <button
                    className="botones"
                    onClick={() => {
                        setSelectedTab("Eliminar");
                        setOP("e");
                    }}
                >
                    {" "}
                    <h2> Eliminar </h2>
                </button>
            </div>

            {feedback && <div className="feedback">{feedback}</div>}

            <div className="f_tabla">{renderTabContent()}</div>
        </div>
    );
}
export default Sectores;
