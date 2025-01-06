import React, { useEffect, useState } from "react";
import Navbar from "./BarraNavegacion";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MapaDefault from "./mapasEAO/MapaDefault";
import { CalcularSeguridad } from "./Genericos/IndiceSeguridad";
import { NotificarReporte } from "./Genericos/NotificarReporte";
import MapaFrecuenta from "./mapasEAO/MapaFrecuenta";
import FormularioReporte from "./Reporte";
import "./css/PaginaPrincipal.css";
import Report from "../assets/Re.jpg";
import { use } from "react";

export default function PagP() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [reportID, setReportID] = useState(0);
  const navigate = useNavigate();
  const email = Cookies.get("username");
  const usertype = Cookies.get("usertype");
  const [secSelected, setSecSelected] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const toggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  const handleReportSubmit = (reportData) => {
    setSubmittedReport(reportData);
    setShowReportForm(false);
  };

  const handleReportID = (id) => {
    setReportID(id);
  };

  const closeReportPopup = () => {
    setSubmittedReport(null);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-CL", options);
  };

  useEffect(() => {
    if (email === undefined) {
      navigate("/");
    }
    if (usertype === "Administrador") {
      navigate("/adminspacework");
    }
  }, [email, navigate]); //

  const mapSwitch = () => {
    setIsSelecting(!isSelecting);
  };
    useEffect(() => {
        if (email === undefined) {
            navigate("/");
        }
        if (usertype === "Administrador") {
            navigate("/adminspacework")
        }
    }, [email, navigate]); //

    useEffect(() => {
        const interval = setInterval(() => {
            NotificarReporte();
            CalcularSeguridad();
        }, 20000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="fondo_pagp">
      <Navbar
        mapSwitch={mapSwitch}
        secSelected={secSelected}
        setSecSelected={setSecSelected}
      />
      <CalcularIndiceSeguridad />

      {isSelecting ? (
        <MapaFrecuenta
          secSelected={secSelected}
          setSecSelected={setSecSelected}
        />
      ) : (
        <MapaDefault />
      )}

      {showReportForm && <div className="overlay"></div>}
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
