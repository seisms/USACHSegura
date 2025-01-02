import MapI from "../../assets/MapaU/map.png";

function defaultMap() {
  return (
    <div className="fondo_mapa">
      <div className="map-container">
        <img src={MapI} alt="Mapa del Campus" className="map-image" />
      </div>
    </div>
  );
}

export default defaultMap;
