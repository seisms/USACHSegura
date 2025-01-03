import Cabecera from "../Cabecera";

function PanelPertenencias({ handleSelect }) {
  return (
    <div className="fondods">
      <Cabecera />
      <h1 className="titulo">Pertenencias</h1>

      <button onClick={() => handleSelect("Pertenencias")}> Atras </button>
    </div>
  );
}

export default PanelPertenencias;
