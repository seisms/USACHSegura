import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../userContext.jsx'
import './css/ReporteDeIncidentes.css';

const ReporteDeIncidentes = ({ onClose, onSubmit }) => {
	const [tincidentes, setTIncidentes] = useState([]);
	const [sectores, setSectores] = useState([]);
	const [pertenencias, setPertencias] =  useState([]);
	const { user } = useContext(UserContext);
	const { email, userType } = user;

	//Solicito los tipos de incidentes existentes en la base
	function getTIncidentes() {
		fetch('http://localhost:3001/tipo-incidentes')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if(data.success) {
					setTIncidentes(data.data)
				} else {
					console.error(data.message)
				};
			});
	}

	function getPertenencias() {
		fetch('http://localhost:3001/pertenencias',
			{
				method: "PUT",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email,
				}),
			})
		.then((response) => {
				return response.json();
			})
		.then((data) => {
				if(data.success) {
					setPertencias(data.data);
				} else {
					console.error(data.message);
				}
			})
	}


	//solitico los sectores existentes en la base
	function getSectores() {
		fetch('http://localhost:3001/sectores')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const mapped = data.map((item) => item.sec_nombre); //mapeo los datos, ya que vienen en formato json
				setSectores(mapped); //guardo el arreglo de sectores en 'sectores'
			});
	}



	function generar_reporte() {
		const type = selectedOptions.tipo;
		const sector = selectedOptions.sector;
		const date = selectedOptions.fecha;
		const hour = selectedOptions.hora;
		const pusurpada = selectedOptions.perts;
		const reporte = JSON.stringify({email, type, sector, date, hour});
		const list_pusurpada = JSON.stringify({pusurpada});
		fetch('http://localhost:3001/report',
			{
				method: "POST",
				headers: {
					"content-type":	"application/json",
				},
				body: JSON.stringify({ reporte, list_pusurpada }),
			})
	}

	const [selectedOptions, setSelectedOptions] = useState({
		tipo: [],
		perts: [],
		sector: '',
		fecha: '',
		hora: '',
	});

	const handleRadioChange = (field, value) => {
		setSelectedOptions((prevState) => ({
			...prevState,
			[field]: value,
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
		generar_reporte();
	};

	useEffect(() => {
		getTIncidentes();
		getSectores();
		getPertenencias();
	},[]);


	return (
		<div className="incident-report-modal">\
			<form className="report-form" onSubmit={handleSubmit}>
				<h2>Reporte de Incidentes</h2>
				<section>
					<h3>Tipo De Incidente</h3>
					<div className="scrollable-container tipo-de-incidente">
						{tincidentes.map((item) => (
							<div key={item.tin_tid}>
								<label>
									<input
										type="radio"
										name="tipo"
										checked={selectedOptions.tipo === item.tin_tid}
										onChange={() => handleRadioChange('tipo', item.tin_tid)}
									/>
									{item.tin_tnombre}
								</label>
							</div>
						))}
					</div>
				</section>
				<section>
					<h3>Pertenencia Perdida</h3>
					<div className="scrollable-container pertenencia-perdida">
						{pertenencias.map((item) => (
							<div key={item.per_id}>
								<label>
									<input
										type="checkbox"
										checked={selectedOptions.perts.includes(item.per_id)}
										onChange={() => handleCheckboxChange('perts', item.per_id)}
									/>
									{item.per_nombre}
								</label>
							</div>
						))}
					</div>
				</section>
				<section>
					<h3>Sector Del Incidente</h3>
					<div className="scrollable-container sector-del-incidente">
						{sectores.map((option) => (
							<div key={option}>
								<label>
									<input
										type="radio"
										name="sector"
										checked={selectedOptions.sector === option}
										onChange={() => handleRadioChange('sector', option)}
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
