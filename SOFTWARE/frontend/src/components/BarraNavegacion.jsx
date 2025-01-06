import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/BarraNavegacion.css";
import logo from "../assets/LogoSF.png"; // Importar la imagen desde la carpeta assets
import Cabecera from "./Cabecera.jsx";
import PanelPertenencias from "./PanelesPrincipal/PanelPertenencias.jsx";
import PanelPerfil from "./PanelesPrincipal/PanelPerfil.jsx";
import PanelFrecuenta from "./PanelesPrincipal/PanelFrecuenta.jsx";
import Cookies from "js-cookie"
import PanelReportes from "./PanelesPrincipal/PanelReportes.jsx";

export default function Navbar({mapSwitch, secSelected, setSecSelected}) {
    const [isOpenMain, setIsOpenMain] = useState(false);
    const [isOpenPert, setIsOpenPert] = useState(false);
    const [isOpenPerf, setIsOpenPerf] = useState(false);
    const [isOpenRep, setIsOpenRep] = useState(false);
    const [isOpenFre, setIsOpenFre] = useState(false);
    const [frecuenta, setFrecuenta] = useState([]); //Pasar info a PanelReportes
    const email = Cookies.get("username")
    const userType = Cookies.get("usertype")
    const navigate = useNavigate()

    function cerrar_sesion() {
        Cookies.remove("username")
        Cookies.remove("usertype")
        navigate("/")
    }

    const handleSelect = (option) => {
        if (option === "Frecuenta") {
            setIsOpenFre(!isOpenFre);
        } else if (option === "Pertenencias") {
            setIsOpenPert(!isOpenPert);
        } else if (option === "Perfil") {
            setIsOpenPerf(!isOpenPerf);
        } else if (option === "Reportes") {
            setIsOpenRep(!isOpenRep);
        } else if (option === "Logout") {
            cerrar_sesion();
        }
    };

    const toggleMenu = () => {
        setIsOpenMain(!isOpenMain);
    };

    return (
        <div className={`navbar ${isOpenMain ? "open" : ""}`}>
            <div className="panel_lateral">
                <Cabecera />
                <div className={`panel_frecuenta ${isOpenFre ? "open" : ""}`}>
                    <PanelFrecuenta
                        handleSelect={handleSelect}
                        email={email}
                        setFrecuenta={setFrecuenta}
                        mapSwitch = {mapSwitch}
                        setSecSelected = {setSecSelected}
                        secSelected = {secSelected}
                    />
                </div>
                <div className={`panel_pertenencias ${isOpenPert ? "open" : ""}`}>
                    <PanelPertenencias handleSelect={handleSelect} />
                </div>
                <div className={`panel_perfil ${isOpenPerf ? "open" : ""}`}>
                    <PanelPerfil handleSelect={handleSelect} email={email} />
                </div>
                <div className={`panel_reportes ${isOpenRep ? "open" : ""}`}>
                    <PanelReportes handleSelect={handleSelect} frecuentados={frecuenta} />
                </div>
                <h1 className="titulo">Usach Segura</h1>
                <ul className="opcionesss">
                    <li onClick={() => handleSelect("Frecuenta")}>
                        Lugares Frecuentados
                    </li>
                    <li onClick={() => handleSelect("Pertenencias")}>Pertenencias</li>
                    <li onClick={() => handleSelect("Perfil")}>Perfil</li>
                    <li onClick={() => handleSelect("Reportes")}>Reportes</li>
                </ul>
                <div className="navbar-logo">
                    <img src={logo} alt="USACH" />
                </div>
            </div>
            <div className="caja_boton_panel">
                <button className={`boton-toggle`} onClick={toggleMenu}>
                    &#9776;
                </button>
            </div>
        </div>
    );
}
