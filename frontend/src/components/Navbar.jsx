import React, { useState } from 'react';
import './css/Navbar.css';
import logo from '../assets/LogoSF.png'; // Importar la imagen desde la carpeta assets
import Cabecera from "./Cabecera";

export default function Navbar({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false); // Cerrar el menú al seleccionar una opción
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      </div>
    </div>
  );
}
