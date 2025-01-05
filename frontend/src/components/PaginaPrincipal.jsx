import React, { useState } from "react";
import Navbar from "./BarraNavegacion";
import MapaDefault from "./mapasEAO/MapaDefault";
import FormularioReporte from "./Reporte";
import "./css/PaginaPrincipal.css";
import Report from "../assets/Re.jpg";
import NotificarReporte from "./Genericos/NotificarReporte";

export default function PagP() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [reportID, setReportID] = useState(null);

  const toggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  const handleReportSubmit = (reportData) => {
    setSubmittedReport(reportData);
    setShowReportForm(false);
  };

  const handleReportID = (id) => {
    setReportID(id);
  }

  const closeReportPopup = () => {
    setSubmittedReport(null);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  return (
    <div className="fondo_pagp">
      <Navbar />
      <MapaDefault />
      {showReportForm && (
        <FormularioReporte
          onClose={toggleReportForm}
          onSubmit={handleReportSubmit}
          onReportID={handleReportID}
        />
      )}
      <NotificarReporte rep_id={reportID} />
      <button className="report-button" onClick={toggleReportForm}>
        <img src={Report} alt="Reporte" className="report-icon" />
      </button>
      {submittedReport && (
        <div className="report-popup">
          <button className="close-popup" onClick={closeReportPopup}>
            X
          </button>
          <h2>Reporte Generado</h2>
          <p>
            <strong>Tipo De Incidente:</strong>{" "}
            {submittedReport.tipo || "Ninguno"}
          </p>
          <p>
            <strong>Pertenencia Perdida:</strong>{" "}
            {submittedReport.perts.join(", ") || "Ninguna"}
          </p>
          <p>
            <strong>Sector Del Incidente:</strong>{" "}
            {submittedReport.sector || "Ninguno"}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {formatDate(submittedReport.fecha) || "No especificada"}
          </p>
          <p>
            <strong>Hora:</strong> {submittedReport.hora || "No especificada"}
          </p>
        </div>
      )}
    </div>
  );
}
