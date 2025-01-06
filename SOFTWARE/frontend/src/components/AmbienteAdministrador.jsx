import "./css/AmbienteAdministrador.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import Cabecera from "./Cabecera.jsx";
import Sectores from "./tablasAdmin/Sectores.jsx";
import TUsuario from "./tablasAdmin/TUsuario.jsx";
import TPertenencia from "./tablasAdmin/TPertenencia.jsx";
import TIncidente from "./tablasAdmin/TIncidente.jsx";
import Usuarios from "./tablasAdmin/Usuarios.jsx";

function AdminSpaceWork() {
	// Estado para el boton seleccionado
	const [selectedTab, setSelectedTab] = useState(null);
	const navigate = useNavigate()
	const usertype = Cookies.get("usertype")

	const handleTabChange = (tabName) => {
		setSelectedTab(tabName);
	};

	const handleSelect = (option) => {
		if (option === "Logout") {
			cerrar_sesion();
		}
	};

	function cerrar_sesion() {
		Cookies.remove("username")
		Cookies.remove("usertype")
		navigate("/")
	}

	const renderTabContent = () => {
		switch (selectedTab) {
			case "sectores":
				return <Sectores />;

			case "tpertenencia":
				return <TPertenencia />;

			case "tusuario":
				return <TUsuario />;

			case "tincidente":
				return <TIncidente />;

			case "usuarios":
				return <Usuarios />;

			default:
				return <h2>Selecciona una opción para ver su contenido</h2>;
		}
	};

	useEffect(() => {
		if (usertype !== "Administrador") {
			navigate("/pagp");
		}
	}, [usertype, navigate]); //
	
	return (
		<div className="fondo">
			<Cabecera />
			<div className="logout-button">
				<button onClick={() => handleSelect("Logout")}> Cerrar Sesion </button>
			</div>
			<div className="titulo">
				<h1>Tablas UsachSegura</h1>
			</div>
			<div className="opcionesTablas">
				<button className="botones" onClick={() => handleTabChange("sectores")}> <h2> Sectores </h2> </button>
				<button className="botones" onClick={() => handleTabChange("usuarios")}> <h2> Usuarios </h2> </button>
				<button className="botones" onClick={() => handleTabChange("tusuario")}> <h2> Tipo de Usuarios </h2> </button>
				<button className="botones" onClick={() => handleTabChange("tincidente")}> <h2> Tipo de Incidentes </h2> </button>
				<button className="botones" onClick={() => handleTabChange("tpertenencia")}> <h2> Tipo de Pertenencias </h2> </button>
			</div>
			<div className="datos_tabla">{renderTabContent()}</div>
		</div>
	);
}

export default AdminSpaceWork;
