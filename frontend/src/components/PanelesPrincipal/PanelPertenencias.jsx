import React, { useState, useEffect } from "react";
import Cabecera from "../Cabecera";
import Cookies from "js-cookie"
import "../css/Paneles/PanelPertenencias.css";

function PanelPertenencias({ handleSelect }) {

	const email = Cookies.get("username");
	const userType = Cookies.get("usertype");
	const [pertenencias, setPertenencias] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [detalleVisible, setDetalleVisible] = useState(null);

	function getPertenencias() {
		fetch(`http://localhost:3001/listar/pertenencias/${email}`,
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
				},
			})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data)
				if(data.success) {
					console.log(data.result)
					setPertenencias(data.result);
				} else {
					console.error(data.message);
				}
			})
	}

	const toggleDetalle = (index) => {
		setDetalleVisible(detalleVisible === index ? null : index);
	};

	useEffect(() => {
		getPertenencias()
	}, [email])
	
	return (
		<div className="fondo-panel-pertenencias">
			<Cabecera />
			<h1 className="titulo">Pertenencias</h1>
			{loading && <p>Cargando...</p>}
			{error && <p className="error">{error}</p>}
			<div className="lista-pertenencias">
				{pertenencias.map((pertenencia, index) => (
					<div key={index} className="pertenencia">
						<button
							className="pertenencia-boton"
							onClick={() => toggleDetalle(index)}
						>
							{`Pertenencia ${index + 1} ${pertenencia.per_nombre}`}
						</button>
						{detalleVisible === index && (
							<div className="detalle-pertenencia">
								<p>Tipo: {pertenencia.tper_tnombre}</p>
								<img
									src={pertenencia.per_img}
									alt={`Imagen de ${pertenencia.per_img}`}
									className="imagen-pertenencia"
								/>
							</div>
						)}
					</div>
				))}
			</div>
			<button
				onClick={() => handleSelect("Pertenencias")}
				className="boton-atras"
			>
				Atrás
			</button>
		</div>
	);
}

export default PanelPertenencias;
