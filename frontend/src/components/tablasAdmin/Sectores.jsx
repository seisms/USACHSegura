import { useState } from "react";

function Sectores() {

	const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
  const [rows, setRows] = useState([]);
	const [name, setName] = useState(""); // Controla el valor del nombre del sector
	const [image, setImage] = useState(""); // Controla el valor del archivo de imagen
	const [op, setOP] = useState(""); // Define la operación a realizar
	const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario

  function consultarSector() { //Funcion para mostrar las filas
    fetch("https://localhost:3001/sector-view", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    })
    .then((response) => {
      if (!response.ok) {
        setFeedback("Error al consultar la tabla.");
      }
      return response.json();
    })
    .then((data) => {
      setRows(data.rows || []);
      setFeedback("Datos cargados correctamente.");
    })
    .catch((error) => {
      console.error(error);
      setFeedback("No se pudo cargar la tabla.");
    });
  };

	function mantenerSector() { // Funcion similar al del App.jsx

		if (!name ) {
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
			.then((response) => { //Mensaje de éxito, no se como hacerlo pal error, no caxo cmo hacerl
				return response.text();
			})
			.then((data) => {
				console.log(data);
				setFeedback(data);
			});
	}

	//const handleImageChange = (e) => {
	//	setImage(e.target.files[0]);
	//};

	const renderTabContent = () => {
		switch (selectedTab) {
			case "Agregar":
			case "Modificar":
				return <div className="f_fAM">
					<div className="subtitulo"><h3>{selectedTab === "Agregar" ? "Agregar Sector" : "Modificar Sector"}</h3> </div>
					<form onSubmit={(e) => {
						e.preventDefault();
						setOP(selectedTab === "Agregar" ? "c" : "m");
						mantenerSector();
					}} className="fAM">
						<div className="fila">
							<label htmlFor=""> Nombre: </label>
							<input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
						</div>
						<div className="fila">
							<label htmlFor=""> Imagen: </label>
							<input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
						</div>
						<button type="submit"> Confirmar </button>
					</form>
				</div>

			case "Eliminar":
				return <div className="fAM">
					<div className="subtitulo"><h3>Eliminar Sector</h3></div>
					<form className="fo"
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
						<button type="submit">Eliminar</button>
					</form>
				</div>

			default: return null;
		}
	}

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
                {Object.keys(rows[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
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
        <button onClick={consultarSector}>Recargar Datos</button>
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

export default Sectores;
