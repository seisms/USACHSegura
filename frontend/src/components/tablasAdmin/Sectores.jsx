import { useState } from "react";

function Sectores() {

  const [selectedTab, setSelectedTab] = useState(null); // Controla la pestaña seleccionada
  const [name, setName] = useState(""); // Controla el valor del nombre del sector
  const [image, setImage] = useState(null); // Controla el valor del archivo de imagen
  const [op, setOP] = useState(""); // Define la operación a realizar
  const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario

  function mantenerSector() { // Funcion similar al del App.jsx
    fetch(`http://localhost:3001/sector-maintain/${op}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, image }),
    }).then((response) => { //Mensaje de éxito, no se como hacerlo pal error, no caxo cmo hacerl
      setFeedback("Operación realizada con éxito.");
      setName("");
      setImage(null);
    });
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Agregar":
      case "Modificar":
        return <div className="f_AM">
          <h3>{selectedTab === "Agregar" ? "Agregar Sector" : "Modificar Sector"}</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            setOP(selectedTab === "Agregar" ? "c" : "m");
            mantenerSector();
          }} className="fAM">
            <label htmlFor=""> Nombre: </label>
            <input type="text" value={name} />
            onChange={(e) => setName(e.target.value)}
            <label htmlFor=""> Imagen: </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button type="submit"> Confirmar </button>
          </form>
        </div>

      case "Eliminar":
        return <div className="fE">
          <h3>Eliminar Sector</h3>
          <form
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
    <div className="f_form">
      <div className="titulo">
        <h2>Tabla Sectores</h2>
      </div>
      <div className="opciones">
        <button className="botones" onClick={() => { setSelectedTab("Agregar"); }}> <h2> Agregar </h2> </button>
        <button className="botones" onClick={() => { setSelectedTab("Modificar"); }}> <h2> Modificar </h2> </button>
        <button className="botones" onClick={() => { setSelectedTab("Eliminar"); }}> <h2> Eliminar </h2></button>
      </div>

      {feedback && <div className="feedback">{feedback}</div>}

      <div className="f_tabla">
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Sectores;
