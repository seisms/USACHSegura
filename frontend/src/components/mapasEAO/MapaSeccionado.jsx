import BlancoNegro from "../../assets/MapaU/BlancoNegro.png";
import Sector1 from "../../assets/MapaU/Sector2_1.png";
import Sector2 from "../../assets/MapaU/Sector2_2.png";
import Sector3 from "../../assets/MapaU/Sector2_3.png";
import Sector4 from "../../assets/MapaU/Sector2_4.png";
import Sector5 from "../../assets/MapaU/Sector2_5.png";
import Sector6 from "../../assets/MapaU/Sector2_6.png";
import Sector7 from "../../assets/MapaU/Sector2_7.png";
import Sector8 from "../../assets/MapaU/Sector2_8.png";
import Sector9 from "../../assets/MapaU/Sector2_9.png";
import Sector10 from "../../assets/MapaU/Sector2_10.png";
import Sector11 from "../../assets/MapaU/Sector2_11.png";
import Sector12 from "../../assets/MapaU/Sector2_12.png";
import Sector13 from "../../assets/MapaU/Sector2_13.png";
import "../css/MapaSeccionado.css";

function SeccionedMap() {
  const handleClicks = (secNumber) => {
    switch (secNumber) {
      case "1":
        alert("Sector 1"); // Agregar / Eliminar Frecuentado, listar info,
        break;

      case "2":
        alert("Sector 2");
        break;

      case "3":
        alert("Sector 3");
        break;

      case "4":
        alert("Sector 4");
        break;

      case "5":
        alert("Sector 5");
        break;

      case "6":
        alert("Sector 6");
        break;

      case "7":
        alert("Sector 7");
        break;

      case "8":
        alert("Sector 8");
        break;

      case "9":
        alert("Sector 9");
        break;

      case "10":
        alert("Sector 10");
        break;

      case "11":
        alert("Sector 11");
        break;

      case "12":
        alert("Sector 12");
        break;

      case "13":
        alert("Sector 13");
        break;
    }
  };

  return (
    <div className="fondo-mapa-seccionado">
      <div className="titulo-mapa">
        <h1> Escuela de Artes y Oficios </h1>
        <h4>Sector 2</h4>
      </div>
      <img
        src={BlancoNegro}
        alt="Mapa del Campus"
        className="mapa-blanco-negro"
      />
      <div className="sector1-active" onClick={() => handleClicks("1")}></div>
      <img src={Sector1} alt="Sector1-img" className="sector1-img" />

      <div className="sector2-active" onClick={() => handleClicks("2")}></div>
      <img src={Sector2} alt="Sector2-img" className="sector2-img" />

      <div className="sector3-active" onClick={() => handleClicks("3")}></div>
      <img src={Sector3} alt="Sector3-img" className="sector3-img" />

      <div className="sector4-active" onClick={() => handleClicks("4")}></div>
      <img src={Sector4} alt="Sector4-img" className="sector4-img" />

      <div className="sector5-active" onClick={() => handleClicks("5")}></div>
      <img src={Sector5} alt="Sector5-img" className="sector5-img" />

      <div className="sector6-active" onClick={() => handleClicks("6")}></div>
      <img src={Sector6} alt="Sector6-img" className="sector6-img" />

      <div className="sector7-active" onClick={() => handleClicks("7")}></div>
      <img src={Sector7} alt="Sector7-img" className="sector7-img" />

      <div className="sector8-active" onClick={() => handleClicks("8")}></div>
      <img src={Sector8} alt="Sector8-img" className="sector8-img" />

      <div className="sector9-active" onClick={() => handleClicks("9")}></div>
      <img src={Sector9} alt="Sector9-img" className="sector9-img" />

      <div className="sector10-active" onClick={() => handleClicks("10")}></div>
      <img src={Sector10} alt="Sector10-img" className="sector10-img" />

      <div className="sector11-active" onClick={() => handleClicks("11")}></div>
      <img src={Sector11} alt="Sector11-img" className="sector11-img" />

      <div className="sector12-active" onClick={() => handleClicks("12")}></div>
      <div
        className="sector12sec-active"
        onClick={() => handleClicks("12")}
      ></div>
      <img src={Sector12} alt="Sector12-img" className="sector12-img" />

      <div className="sector13-active" onClick={() => handleClicks("13")}></div>
      <img src={Sector13} alt="Sector13-img" className="sector13-img" />
    </div>
  );
}

export default SeccionedMap;
