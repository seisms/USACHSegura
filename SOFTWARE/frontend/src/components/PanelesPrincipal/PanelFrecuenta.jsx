import { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import "../css/Paneles/PanelFrecuenta.css";

export default function PanelFrecuenta({
  handleSelect,
  email,
  setFrecuenta,
  secSelected,
  setSecSelected,
  mapSwitch,
}) {
  const [frecuentados, setFrecuentados] = useState([]);
  const [rows, setRows] = useState([]);
  const [feedback, setFeedback] = useState(""); // Muestra retroalimentación al usuario
  const [frec_has_changed, setChanged] = useState(true);
  const [isOpenPopup, setIsOpenPopup] = useState("");
  const [checkboxState, setCheckboxState] = useState({}); // Estado para controlar las checkboxes

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
      setChanged(false);
    }
    consultarSector();
  }, [email, frec_has_changed]);

  useEffect(() => {
    if (frecuentados.length > 0) {
      // Cuando frecuentados cambie y no esté vacío, actualizamos secSelected
      setSecSelected(
        frecuentados.map((frecuentado) => frecuentado.frec_sector)
      );
    }
  }, [frecuentados]); // Este efecto se ejecuta cuando 'frecuentados' cambia

  useEffect(() => {
    // Inicializar el estado de las checkboxes según los sectores frecuentados
    const initialCheckboxState = {};
    frecuentados.forEach((frecuentado) => {
      initialCheckboxState[frecuentado.frec_sector] = true;
    });
    setCheckboxState(initialCheckboxState);
  }, [frecuentados]);

  function addFrecuenta() {
    // Vaciar y llenar setSecSelected con los sectores frecuentados
    setSecSelected(frecuentados.map((frecuentado) => frecuentado.frec_sector));

    // Abrir o cerrar el popup
    setIsOpenPopup(!isOpenPopup);
  }

  function verificarBox() {
    // Agregar elementos de secSelected que no están en frecuentados
    secSelected.forEach((sec_nombre) => {
      const isFrequented = frecuentados.some(
        (frecuentado) => frecuentado.frec_sector === sec_nombre
      );

      // Si no está frecuentado, llamar a gestion_frecuenta para agregar
      if (!isFrequented) {
        gestion_frecuenta(sec_nombre, "LFC"); // Llamar a gestion_frecuenta para agregar
      }
    });

    // Eliminar elementos de frecuentados que no están en secSelected
    frecuentados.forEach((frecuentado) => {
      const isSelected = secSelected.includes(frecuentado.frec_sector);

      // Si está frecuentado pero no está seleccionado, llamar a gestion_frecuenta para eliminar
      if (!isSelected) {
        gestion_frecuenta(frecuentado.frec_sector, "LFD"); // Llamar a gestion_frecuenta para eliminar
      }
    });
  }

  function gestion_frecuenta(sec_nombre, op) {
    if (op === "LFC") {
      console.log(`Registrar: ${sec_nombre}`);
    } else if (op === "LFD") {
      console.log(`Eliminar: ${sec_nombre}`);
    }

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
          setChanged(true);
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

  function handleCheckboxChange(event) {
    const { id, checked } = event.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
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
        <button
          onClick={() => {
            addFrecuenta();
            mapSwitch();
          }}
        >
          Modificar
        </button>
      </div>
      <div className="perfil-little-buttons">
        <button onClick={() => handleSelect("Frecuenta")}> Atras </button>
      </div>
      <div className={`frecuenta-popup ${isOpenPopup ? "open" : ""}`}>
        <form className="seleccion-frecuenta">
          {rows.length > 0 ? (
            <>
              {rows.map((row, index) => {
                // Comprobar si el sector está en el arreglo 'frecuentados'
                const isChecked = checkboxState[row.sec_nombre] || false;
                return (
                  <div key={index} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={row.sec_nombre} // Establecer un id único por sector
                      checked={isChecked} // Controlar el valor 'checked'
                      onChange={handleCheckboxChange} // Actualizar el estado cuando cambia
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
            onClick={() => {
              verificarBox();
              addFrecuenta();
              mapSwitch();
            }}
          >
            Confirmar
          </button>
        </form>

        <button
          className="popup-buttons"
          onClick={() => {
            addFrecuenta();
            mapSwitch();
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
