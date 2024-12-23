import React, { useState } from 'react';
import './css/ReporteDeIncidentes.css';

const ReporteDeIncidentes = ({ onClose, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    tipoDeIncidente: '',
    pertenenciaPerdida: [],
    sectorDelIncidente: '',
    fecha: '',
    hora: '',
  });

  const handleRadioChange = (category, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [category]: option,
    }));
  };

  const handleCheckboxChange = (category, option) => {
    setSelectedOptions((prevState) => {
      const options = prevState[category];
      return {
        ...prevState,
        [category]: options.includes(option)
          ? options.filter((item) => item !== option)
          : [...options, option],
      };
    });
  };

  const handleInputChange = (e, category) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [category]: e.target.value,
    }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedOptions);
  };

  return (
    <div className="incident-report-modal">
      <form className="report-form" onSubmit={handleSubmit}>
        <h2>Reporte de Incidentes</h2>
        <section>
          <h3>Tipo De Incidente</h3>
          <div className="scrollable-container tipo-de-incidente">
            {['Robo', 'Asalto', 'Hurto', 'Frustrado'].map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name="tipoDeIncidente"
                    checked={selectedOptions.tipoDeIncidente === option}
                    onChange={() => handleRadioChange('tipoDeIncidente', option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>Pertenencia Perdida</h3>
          <div className="scrollable-container pertenencia-perdida">
            {['Pertenencia 1', 'Pertenencia 2', 'Pertenencia 3', 'Pertenencia 4', 'Pertenencia 5'].map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedOptions.pertenenciaPerdida.includes(option)}
                    onChange={() => handleCheckboxChange('pertenenciaPerdida', option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>Sector Del Incidente</h3>
          <div className="scrollable-container sector-del-incidente">
            {['EAO', 'Casino', 'Patio de los naranjos', 'Metalurgia'].map((option) => (
              <div key={option}>
                <label>
                  <input
                    type="radio"
                    name="sectorDelIncidente"
                    checked={selectedOptions.sectorDelIncidente === option}
                    onChange={() => handleRadioChange('sectorDelIncidente', option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>Fecha y Hora del Incidente</h3>
          <div className="fecha-hora-container">
            <div className="fecha-container">
              <label>Fecha:</label>
              <input
                type="date"
                value={selectedOptions.fecha}
                onChange={(e) => handleInputChange(e, 'fecha')}
              />
            </div>
            <div className="hora-container">
              <label>Hora:</label>
              <input
                type="time"
                value={selectedOptions.hora}
                onChange={(e) => handleInputChange(e, 'hora')}
              />
            </div>
          </div>
        </section>
        <div className="button-container">
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
          <button type="submit" className="submit-button">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReporteDeIncidentes;
