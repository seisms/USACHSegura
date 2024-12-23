import { useState } from "react";
import Cabecera from "./Cabecera.jsx";
import "./css/InicioSesion.css";
import seguraLogo from "../assets/LogoSF.png";

export default function Formulario() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function control_de_acceso(event) {
		event.preventDefault()
		fetch('http://localhost:3001/login',
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ email, password }),

			})
		.then((response) => {
				return response.text();
			})
		.then((data) => {
				console.log("Response: ", data);
				if(data === "") {
					alert("Usuario/Contraseña equivocados");
				} else {
					alert(data);
				}
			});
	}

	return (
		<div className="fondo">
			<Cabecera />
			<div className="f_doble">
				<div className="f_formulario">
					<form className="f_ingreso_datos"
						  onSubmit={control_de_acceso}
					>
						<h2>Iniciar Sesión</h2>
						<input
							type="email"
							name="email"
							value={email}
							placeholder="Correo"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Contraseña"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<button type="submit"> Ingresar </button>
						<a href="#">
							<h3>Registrarse</h3>
						</a>
					</form>
				</div>
				<div className="f_logo_segura">
					<img src={seguraLogo} alt="S" className="logo_segura" />
				</div>
			</div>
		</div>
	);
}
