import React, { useState } from 'react';
import './css/ReporteDeIncidentes.css';

const ReporteDeIncidentes = ({ onClose, onSubmit }) => {
	const [tincidentes, setTIncidentes] = useState([]);
	const [sectores, setSectores] = useState([]);

	//Solicito los tipos de incidentes existentes en la base
	function getTIncidentes() {
		fetch('http://localhost:3001/tipo-incidentes')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const mapped = data.map((item) => item.tin_tnombre); //mapeo los datos, ya que vienen en formato json
				setTIncidentes(mapped); // guardo el arreglo de tipos en 'tincidentes'
			});
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
		const reporte = JSON.stringify({type, sector, date, hour});
		const list_pusurpada = JSON.stringify({pusurpada});
		fetch('http://localhost:3001/report',
			{
				method: "POST",
				headers: {
					"content-type":	"application/json",
				},
				body: JSON.stringify({ reporte, list_pusurpada }),
			})
		console.log(list_pusurpada);
		console.log(reporte);
	}

	const [selectedOptions, setSelectedOptions] = useState({
		tipo: {
			tid: 0,
			tnombre: '',
		},
		perts: [],
		sector: '',
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

<<<<<<< HEAD
	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(selectedOptions);
		generar_reporte();
	};

	useEffect(() => {
		getTIncidentes();
		getSectores();
	}, []);


	return (
		<div className="incident-report-modal">\
			<form className="report-form" onSubmit={handleSubmit}>
				<h2>Reporte de Incidentes</h2>
				<section>
					<h3>Tipo De Incidente</h3>
					<div className="scrollable-container tipo-de-incidente">
						{tincidentes.map((option) => (
							<div key={option}>
								<label>
									<input
										type="radio"
										name="tipo"
										checked={selectedOptions.tipo === option}
										onChange={() => handleRadioChange('tipo', option)}
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
										checked={selectedOptions.perts.includes(option)}
										onChange={() => handleCheckboxChange('perts', option)}
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
