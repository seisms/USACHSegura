import Cabecera from "../Cabecera";

function PanelPertenencias({ handleSelect }) {
  return (
    <div className="fondo-panel-perfil">
      <Cabecera />
      <h1 className="titulo">Perfil</h1>

      <button onClick={() => handleSelect("Perfil")}> Atras </button>
    </div>
  );
}

export default PanelPertenencias;
