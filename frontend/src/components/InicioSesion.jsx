import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecera from "./Cabecera.jsx";
import Cookies from "js-cookie";
import "./css/InicioSesion.css";
import seguraLogo from "../assets/LogoSF.png";

export default function InicioSesion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // Función para manejar el control de acceso
    function control_de_acceso(event) {
        // Evita que el formulario realice su acción predeterminada (recargar la página)
        event.preventDefault();

        if (!email.endsWith("@usach.cl")) {
            setError("Debe ingresar un correo institucional")
            return
        }

        // Envía una solicitud POST al servidor con las credenciales del usuario
        fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const { query_ustype, email } = data.result;
                    alert(`Bienvenido ${email}. Tipo de usuario: ${query_ustype}`);

					Cookies.set("username", email)
					Cookies.set("usertype", query_ustype, {expires: 7, path: "/"});

                    if (query_ustype === "Administrador") {
                        // Si es administrador, navega a la página de mantenimiento de tablas
                        navigate("/adminspacework");
                    } else {
                        // Si no es administrador, navega a la página principal
                        navigate("/pagp");
                    }
                } else {
                    // Muestra un mensaje de error si las credenciales son incorrectas
                    setError(data.message);
                }
            });
    }

    return (
        <div className="fondo_inicio_sesion">
            <Cabecera />
            <div className="fondo_login_interface">
                <div className="fondo_form_and_logo">
                    <div className="fondo_form_login">
                        <form className="form_login" onSubmit={control_de_acceso}>
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
                            {error && <p className="error_feedback">{error}</p>}
                            <button type="submit"> Ingresar </button>
                            <a href="#">
                                <h3>Registrarse</h3>
                            </a>
                        </form>
                    </div>
                    <div className="fondo_logo_USegura">
                        <img src={seguraLogo} alt="S" className="logo_USegura" />
                    </div>
                </div>
            </div>
        </div>
    );
}
