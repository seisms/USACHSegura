import React, { useState, useContext } from 'react';
import './css/Navbar.css';
import logo from '../assets/LogoSF.png'; // Importar la imagen desde la carpeta assets
import Cabecera from "./Cabecera";
import { UserContext } from '../userContext.jsx'

export default function Navbar({ onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
	const { user } = useContext(UserContext);
	const { email, userType } = user;

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false); // Cerrar el menú al seleccionar una opción
    };


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    function listar_sectores_frecuentados() {
        console.log(email);
        fetch('http://localhost:3001/list-sec-frec',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                })
            }
        )
        .then((response) => {
                return response.json();
            })
        .then((data) => {
                console.log("Parsing data");
                if (data.success) {
                    console.log(data.result);
                } else  {
                    console.error(data.message);
                }
            })
    }

    return (
        <div className='f_lateral'>
            <button
                className={`menu-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleMenu}
            >
                &#9776; { }
            </button>
            <div className={`navbar ${isOpen ? 'open' : ''}`}>
                <Cabecera/>
                <h1 className="titulo">Usach Segura</h1>
                <ul className='opcionesss'>
                    <li onClick={() => handleSelect('Lugares Frecuentados')}>
                        Lugares Frecuentados
                    </li>
                    <li onClick={() => handleSelect('Pertenencias')}>Pertenencias</li>
                    <li onClick={() => handleSelect('Perfil')}>Perfil</li>
                </ul>
                <div className="navbar-logo">
                    <img src={logo} alt="USACH" /> { }
                </div>
                <button onClick={listar_sectores_frecuentados}> Listar sectores frecuentados </button>
            </div>
        </div>
    );
}
