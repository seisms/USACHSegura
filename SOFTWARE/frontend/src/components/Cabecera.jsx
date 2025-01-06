import "./css/Cabecera.css";
import usachLogo from "../assets/UsachSB.png";

export default function Cabecera() {
  return (
    <div className="usach_div">
      <a href="https://www.usach.cl" className="logo_div">
        <img src={usachLogo} alt="LogoUsach" className="logo_usach" />
      </a>
    </div>
  );
}
