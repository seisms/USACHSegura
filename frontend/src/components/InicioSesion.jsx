import { useState } from "react";
import Cabecera from "./Cabecera.jsx";
import "./css/InicioSesion.css";
import seguraLogo from "../assets/LogoSF.png";

export default function Formulario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*
    // Aquí va la lógica para validar datos en el backend
    // si es válido, pasar a principal.jsx, si no, funar a dino.
  };
  */
  return (
    <div className="fondo">
      <Cabecera />
      <div className="f_doble">
        <div className="f_formulario">
          <form className="f_ingreso_datos">
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
