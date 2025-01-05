import React, { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import Cookies from "js-cookie";
import "../css/Paneles/PanelPertenencias.css";

export default function PanelPertenencias({ handleSelect }) {
  const email = Cookies.get("username");
  const userType = Cookies.get("usertype");
  const [pertenencias, setPertenencias] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [detalleVisible, setDetalleVisible] = useState(null);
  const [modoSeleccion, setModoSeleccion] = useState(null); // 'modificar' | 'eliminar'
  const [seleccionados, setSeleccionados] = useState([]);
  const [pertenenciaSeleccionada, setPertenenciaSeleccionada] = useState(null); // Para almacenar la pertenencia seleccionada para modificar
	const [feedback, setFeedback] = useState("");
	const [showPrimaryButtons, setShowPrimaryButtons] = useState(true);
	const [tPertenencias, setTPertenencias] = useState([]);

  function getPertenencias() {
    fetch(`http://localhost:3001/listar/pertenencias/${email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPertenencias(data.result);
        } else {
          console.error(data.message);
        }
      });
  }

	function consultarTPertenencia() { //Funcion para mostrar las filas
		fetch("http://localhost:3001/listar/tpertenencias", {
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
								setTPertenencias(data.result || []);
						} else {
								setFeedback("No hay tipo de pertenencias para listar");
						}
				})
				.catch((error) => {
						console.error(error);
						setFeedback("No se pudo cargar la tabla tipo de pertenencias.");
				});
		};

  const toggleDetalle = (index) => {
    setDetalleVisible(detalleVisible === index ? null : index);
  };

  const handleSeleccionar = (index) => {
    if (modoSeleccion === "modificar") {
      // Guardar la pertenencia seleccionada para modificar
      setPertenenciaSeleccionada(pertenencias[index]);
      setIsOpenPopup(true); // Abrir el formulario de modificación solo después de seleccionar la pertenencia
    } else if (modoSeleccion === "eliminar") {
      // Acción para eliminar
      if (seleccionados.includes(index)) {
        setSeleccionados(seleccionados.filter((i) => i !== index)); // Quitar si ya está seleccionado
      } else {
        setSeleccionados([...seleccionados, index]); // Agregar si no está seleccionado
      }
    } else {
      // Si no estamos en modo modificar o eliminar, desplegar detalles
      toggleDetalle(index);
    }
  };

  const iniciarModificar = () => {
    setModoSeleccion("modificar");
    setSeleccionados([]); // Limpiar la selección anterior
		setFeedback("Seleccione para modificar");
    setShowPrimaryButtons(false); // Ocultar los botones primarios
  };

  const iniciarEliminar = () => {
    setModoSeleccion("eliminar");
    setSeleccionados([]); // Limpiar la selección anterior
		setFeedback("Seleccione para eliminar");
    setShowPrimaryButtons(false); // Ocultar los botones primarios
  };

  const confirmarSeleccion = () => {
    if (modoSeleccion === "eliminar") {
      // Confirmar la eliminación
      const perteneciasSeleccionadas = seleccionados.reduce((acc, index) => {
        const pertenencia = pertenencias[index];
        acc[pertenencia.per_id] = {
          id: pertenencia.per_id,
          nombre: pertenencia.per_nombre,
        };
        return acc;
      }, {});

			Object.values(perteneciasSeleccionadas).forEach((pertenencia) => {
				console.log(pertenencia);
				gestion_pertenencias(pertenencia, "PD");
			});

      console.log( "Pertenencias seleccionadas para eliminar:", perteneciasSeleccionadas );
    }

    setModoSeleccion(null);
    setSeleccionados([]);
    setIsOpenPopup(false); // Cerrar el formulario después de confirmar
		setShowPrimaryButtons(true); // Mostrar nuevamente los botones primarios
  };

  const cancelarSeleccion = () => {
    setModoSeleccion(null);
    setSeleccionados([]);
    setIsOpenPopup(false); // Cerrar el formulario al cancelar
    setPertenenciaSeleccionada(null); // Reiniciar la pertenencia seleccionada
    setShowPrimaryButtons(true); // Mostrar nuevamente los botones primarios
		setFeedback("");
  };

  const cerrarPopup = () => {
    setIsOpenPopup(false);
    setPertenenciaSeleccionada(null); // Reiniciar el formulario al cerrar el popup
  };

  const handleConfirmarAgregar = (e) => {
    e.preventDefault();

		if (pertenenciaSeleccionada) {
    	const nuevaPertenencia = {	//Modificar Pertenencia
				id : pertenenciaSeleccionada.per_id,
				tipo: e.target.elements["add-pert-tipo"].value,
				img: e.target.elements["add-pert-img"].value,
				nombre: e.target.elements["add-pert-nombre"].value,
			};
			console.log("Pertenencia confirmada:", nuevaPertenencia);
			gestion_pertenencias(nuevaPertenencia, "PM");
		} else {
    	const nuevaPertenencia = { //Agregar nueva pertenencia
				correo : email,
				tipo: e.target.elements["add-pert-tipo"].value,
				img: e.target.elements["add-pert-img"].value,
				nombre: e.target.elements["add-pert-nombre"].value,
			};
			console.log("Pertenencia confirmada:", nuevaPertenencia);
			gestion_pertenencias(nuevaPertenencia, "PC");
		}
	  cerrarPopup();
		setShowPrimaryButtons(true); // Reaparecer los botones de "Nueva", "Modificar", "Eliminar"
  };

  useEffect(() => {
    getPertenencias();
		consultarTPertenencia();
  }, [email]);

	function gestion_pertenencias(payload, op) {

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
								setFeedback("Pertenencia registrada con éxito.");
						} else {
								setFeedback(data.message || "Error al registrar la pertenencia.");
						}
				})
				.catch((error) => {
						console.error("Error:", error);
						setFeedback(error.message || "Error interno del servidor.");
				});
}

  return (
    <div className="fondo-panel-pertenencias">
      <Cabecera />
      <h1 className="titulo">Pertenencias</h1>
      <div className="lista-pertenencias">
        {pertenencias.map((pertenencia, index) => (
          <div
            key={index}
            className={`pertenencia ${
              //Para dar a las pertenencias un atributo .selected para el CSS
              seleccionados.includes(index) && modoSeleccion === "eliminar"
                ? "selected"
                : ""
            }`}
          >
            <button
              className="pertenencia-boton"
              onClick={() => handleSeleccionar(index)}
            >
              {`Pertenencia ${index + 1} ${pertenencia.per_nombre}`}
            </button>
            {detalleVisible === index && !modoSeleccion && (
              <div className="detalle-pertenencia">
                <p>Tipo: {pertenencia.tper_tnombre}</p>
                <img
                  src={pertenencia.per_img}
                  alt={`Imagen de ${pertenencia.per_nombre}`}
                  className="imagen-pertenencia"
                />
              </div>
            )}
          </div>
        ))}
        <div className={`pertenencias-buttons-uno ${!showPrimaryButtons ? "hidden" : ""}`}>
          <button onClick={() => setIsOpenPopup(!isOpenPopup)}>Nueva</button>
          <button onClick={iniciarModificar}>Modificar</button>
          <button onClick={iniciarEliminar}>Eliminar</button>
        </div>
        <div className="pertenencias-buttons-dos">
          {modoSeleccion === "eliminar" && (
            <>
              <button onClick={confirmarSeleccion}>Confirmar</button>
              <button onClick={cancelarSeleccion}>Cancelar</button>
            </>
          )}
          {modoSeleccion === "modificar" && (
            <button onClick={cancelarSeleccion}>Cancelar</button>
          )}
        </div>
      </div>
			{feedback && <p className="pert-feedback">{feedback}</p>} {/* Mostrar el feedback aquí */}
      <button
        onClick={() => handleSelect("Pertenencias")}
        className="boton-atras"
      >
        Atrás
      </button>

      {/* Overlay para bloquear la interacción con el resto de la pantalla */}
      {isOpenPopup && <div className="overlay"></div>}

      <div className={`pert-form-popup ${isOpenPopup ? "open" : ""}`}>
  <form onSubmit={handleConfirmarAgregar}>
    <label htmlFor="add-pert-nombre"> Nombre: </label>
    <input
      type="text"
      name="add-pert-nombre"
      defaultValue={
        pertenenciaSeleccionada ? pertenenciaSeleccionada.per_nombre : ""
      }
      required
    />
    
    <label htmlFor="add-pert-tipo"> Tipo: </label>
    <select
      name="add-pert-tipo"
      defaultValue={
        pertenenciaSeleccionada ? pertenenciaSeleccionada.tper_tid : "" // Asegúrate de usar el ID aquí
      }
      required
    >
      <option value="">Seleccionar Tipo</option>
      {tPertenencias.map((tipo) => (
        <option key={tipo.tper_tid} value={tipo.tper_tid}>
          {tipo.tper_tnombre} {/* Aquí mostrarás el nombre, pero se guardará el ID */}
        </option>
      ))}
    </select>
    
    <label htmlFor="add-pert-img"> Imagen: </label>
    <input
      type="text"
      name="add-pert-img"
      defaultValue={
        pertenenciaSeleccionada ? pertenenciaSeleccionada.per_img : ""
      }
      required
    />
    
    <button type="submit">Confirmar</button>
    <button
      onClick={(e) => {
        e.preventDefault();
        cerrarPopup();
        cancelarSeleccion();
      }}
    >
      Cancelar
    </button>
  </form>
</div>

    </div>
  );
}
