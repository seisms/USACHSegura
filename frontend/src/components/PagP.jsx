import React, { useState } from 'react';
import Navbar from './Navbar';
import ReporteDeIncidentes from './ReporteDeIncidentes';
import './css/PagP.css';

import MapI from '../assets/map.png'
import Report from '../assets/Re.jpg'

const App = () => {
    const [showReportForm, setShowReportForm] = useState(false);
    const [nvReporte, setnvReporte] = useState({
        tipo: '',
        perts: [],
        sector: '',
        fecha: '',
        hora: '',
    });

    const toggleReportForm = () => {
        setShowReportForm(!showReportForm);
    };

    const handleReportSubmit = (reportData) => {
        setnvReporte(reportData);
        setShowReportForm(false);
    };

    const closeReportPopup = () => {
        setnvReporte(null);
    };

    return (
        <div className="App">
            <Navbar />
            <div className="content">
                <div className="map-container">
                    <img src={MapI} alt="Mapa del Campus" className="map-image" />
                </div>
                {showReportForm && (
                    <ReporteDeIncidentes
                        onClose={toggleReportForm}
                        onSubmit={handleReportSubmit}
                    />
                )}
                <button className="report-button" onClick={toggleReportForm}>
                    <img src={Report} alt="Reporte" className="report-icon" />
                </button>
                {nvReporte && (
                    <div className="report-popup">
                        <button className="close-popup" onClick={closeReportPopup}>
                            X
                        </button>
                        <h2>Reporte Generado</h2>
                        <p><strong>Tipo De Incidente:</strong> {nvReporte.tipo || 'Ninguno'}</p>
                        <p><strong>Pertenencia Perdida:</strong> {nvReporte.perts.join(', ') || 'Ninguna'}</p>
                        <p><strong>Sector Del Incidente:</strong> {nvReporte.sector || 'Ninguno'}</p>
                        <p><strong>Fecha:</strong> {nvReporte.fecha || 'No especificada'}</p>
                        <p><strong>Hora:</strong> {nvReporte.hora || 'No especificada'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;