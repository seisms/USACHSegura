import { useState, useEffect } from "react";
//import InicioSesion from "./components/InicioSesion.jsx"

function RegistrarReporte(nvreporte){
  //El promise retorna la id del reporte
  return new Promise((resolve, reject) => {
    //Mientras que el fetch consulta a la base con direccion registro, para saber si se agrego el nuevo reporte
    //Devolviendo un json con la respuesta del backend y en su interior 'result' con el id del reporte
	  fetch('http://localhost:3001/registrar-reporte', {
		  method: 'POST',
		  headers: { 'Content-type': 'application/json' },
		  body: JSON.stringify(nvreporte),
	  })
	  .then((response) => {
      if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
      }
      return response.json(); // Procesa la respuesta como JSON
    })
    .then((result) => {
      console.log('Respuesta del servidor:', result); // Log de la respuesta
      alert(`Reporte registrado con éxito. ID: ${result.rep_id}`); // Accede a rep_id del backend
      resolve(result.rep_id);
    })
    .catch((error) => {
      console.error('Error registrando el reporte:', error);
      alert('Hubo un error registrando el reporte.');
      reject(error);
    });
  })
}


function GenerarReporte() {
  const [p_nvreporte, setp_nvreporte] = useState({
	correo: '',
	sector: '',
	tipo: '',
	fecha: '',
	hora: '',
  })

  const handleGenerateReport = () => {
    const correo = prompt('Enter correo');
    const sector = prompt('Enter sector');
    const tipo = prompt('Enter tipo');
    const fecha = prompt('Enter fecha');
    const hora = prompt('Enter hora');
    const confirmation = prompt('Los datos son correctos?');

    if (confirmation.toLowerCase() === 'yes') {
      setp_nvreporte({ correo, sector, tipo, fecha, hora});
      alert('Reporte generado con éxito');
    } else {
      alert('Por favor, ingrese los datos nuevamente.');
    }
  };

  const handleRegisterReport = () => {
    if (!p_nvreporte) {
      alert('No hay datos para registrar.');
      return;
    }

    RegistrarReporte(p_nvreporte)
    .then((p_rid) => {
      console.log('ID del reporte registrado:', p_rid);
      // Usa repID aquí según sea necesario
    })
    .catch((error) => {
      console.error('Error al registrar el reporte:', error);
    });
  };

  return (
    <div>
      <button onClick={handleGenerateReport}>Generar Reporte</button>
      {p_nvreporte && (
        <div>
          <h3>Datos del reporte:</h3>
          <p>Correo: {p_nvreporte.correo}</p>
          <p>Sector: {p_nvreporte.sector}</p>
          <p>Fecha: {p_nvreporte.fecha}</p>
          <p>Hora: {p_nvreporte.hora}</p>
          <p>Tipo: {p_nvreporte.tipo}</p>
          <button onClick={handleRegisterReport}>Registrar Reporte</button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [users, setUsers] = useState(false);

  function getUsers() {
    fetch("http://localhost:3001")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setUsers(data);
      });
  }

  function maintainSector() {
    let name = prompt("Enter sector name");
    let image = prompt("Enter sector image");

    fetch("http://localhost:3001/sector-maintain", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, image }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        maintainSector();
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
	  <GenerarReporte/>
      <button>{users ? users : "There are no users"}</button>
      <br />
      <button onClick={maintainSector}> Add sector </button>
    </div>
  );
}
//export default InicioSesion;
export default App;
