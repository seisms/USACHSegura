import React, { useState } from 'react';
import './css/Navbar.css';
import logo from '../assets/LogoSF.png'; // Importar la imagen desde la carpeta assets

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
    <div>
      <button
        className={`menu-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        &#9776; { }
      </button>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleSelect('Lugares Frecuentados')}>
            Lugares Frecuentados
          </li>
          <li onClick={() => handleSelect('Pertenencias')}>Pertenencias</li>
          <li onClick={() => handleSelect('Perfil')}>Perfil</li>
        </ul>
        <div className="navbar-logo">
          <img src={logo} alt="USACH" /> { }
        </div>
      </nav>
    </div>
  );
}
