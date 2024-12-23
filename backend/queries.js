const Pool = require('pg').Pool
const pool = new Pool({
	user: 'usach',
	host: 'localhost',
	database: 'usach_segura',
	password: 'usach2024',
	port: 5432
})

const listar_sectores = async () => {
	try {
		return await new Promise(function(resolve, reject) {
			pool.query("SELECT * FROM SECTOR", (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else{
					reject(new Error("No results found"));
				}
			});
		});
	} catch (error_1) {
		console.error(error_1);
		throw new Error("Internal server error");
	}
};

const listar_pertenencias = async (body) => {
	try {
		console.log("PERT BODY:", body);
		const { email } = body;
		console.log("PERT EMAIL:", email);
		const result = await pool.query("SELECT * FROM PERTENENCIA WHERE PER_Correo = $1", [email]);
		if (result && result.rows) {
			console.log(result.rows);
			return result.rows;
		} else {
			throw new Error("No hay pertenencias/No existe el usuario", email);
		}
	} catch(err) {
		console.log("Error al ejecutar la consulta");
		return null;
	}
}

const getSectores = async () => {
	try {
		return await new Promise(function(resolve, reject) {
			pool.query("SELECT sec_nombre FROM SECTOR", (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else{
					reject(new Error("No results found"));
				}
			});
		});
	} catch (error_1) {
		console.error(error_1);
		throw new Error("Internal server error");
	}
};

// Obtener tipo de incidentes

const getTIncidentes = async () => {
	try {
		const result = await pool.query("SELECT * FROM TINCIDENTE");
		if(result && result.rows) {
			return result.rows;
		} else {
			throw new Error("No hay tipos de incidente");
		}
	} catch (err) {
		console.log("Error al ejecutar consulta LISTAR_TINCIDENTES");
	}
};


// BEGIN: Generación de Reportes
const generar_reporte = async (body) => {
	const {reporte, list_pusurpada} = body;
	try {
		console.log(list_pusurpada);
		const id = await registrar_reporte(reporte);
		if (id < 0) {
			throw new Error("Registrar reporte falló");
		}
		const add = await agregar_pertencia_reporte(list_pusurpada, id);
		if (add < 0) {
			throw new Error("Agregar pertenencia al reporte falló");
		}
		return true;
	} catch(error) {
		console.log('Error al generar el reporte', error);
		return false;
	}
}

const registrar_reporte = async (reporte) => {
	if (typeof reporte === "string") {
		reporte = JSON.parse(reporte);
	}
	console.log(reporte);
	const {email, type, sector, date, hour} = reporte;
	try {
		const result = await pool.query("INSERT INTO REPORTE (REP_Correo, REP_Sector, REP_Tipo, REP_Fecha, REP_Hora) VALUES ($1, $2, $3, $4, $5) RETURNING REP_ID",
			[email, sector, type, date, hour]);
		return result.rows[0].rep_id;
	} catch(err) {
		console.error('Error al ejecutar la consulta:', err);
		return -1;
	}
}

const agregar_pertencia_reporte = async (list_pusurpada, rid) => {
	try {
		if (typeof list_pusurpada === "string") {
			list_pusurpada = JSON.parse(list_pusurpada);
		}
		for (const pid of list_pusurpada.pusurpada) {
			await pool.query("INSERT INTO PUSURPADA (PU_RID, PU_PID) VALUES ($1, $2)", [rid, pid]);
		}
		console.log("Pertenencias agregadas correctamente");
		return 1;
	} catch (err) {
		console.error("Error: ", err);
		return -1;
	}
}

// END: Generación de Reportes


// BEGIN: Acceso (control y registro)

const control_de_acceso = async (body) => {
	const {email, password} = body;

	try {
		let result = await pool.query("SELECT US_Contrasenya FROM USUARIO WHERE US_Correo = $1",
			[email]);

		if (result.rows.length > 0){
			const query_password = result.rows[0].us_contrasenya

			if (query_password === password) {
				result = await pool.query("SELECT TU_TNombre " +
					"FROM USUARIO, RUSUARIO, TUSUARIO " + 
					"WHERE US_Correo = $1 " + 
					"AND TU_TID = RU_Tipo " + 
					"AND RU_Correo = US_Correo ",
					[email]);
				const query_ustype = result.rows[0].tu_tnombre;
				return {query_ustype, email};
			} else {
				console.log("wrong password")
				return null;
			}
		} else {
			console.log("No results...")
			return null;
		}
	} catch (err) {
		console.error('Error al ejecutar la consulta:', err);
		return null;
	}
}

// END: Acceso

// BEGIN: Mantención de tablas básicas.

// **** BEGIN: Mantención de SECTOR.
const mantener_sector = async (op, body) => {
	if (op === "a") {
		const result = await crear_sector(body);
		console.log(result);
		return result;
	}

	if (op === "m") {
		const result = await modifySector(body);
		return result;
	}

	if (op === "e") {
		const result = await borrar_sector(body);
		return result;
	}
};

const crear_sector =  async (body) => {
	const {name, image} = body;
	console.log("ESTOY AGREGANDO!")
	try {
		const result = await pool.query("INSERT INTO SECTOR VALUES ($1, $2, 1) RETURNING *", [name, image]);
		if (result && result.rows.length > 0) {
			console.log(result.rows);
			return `Sector agregado con éxito`;
		} else {
			return `Sector ${name} no se pudo agregar`;
		}
	} catch(err) {
		return `Hubo un error inesperado`;
	}
}

const modifySector = async (body) => {
	const {name, image} = body;
	try {
		const result = await pool.query("UPDATE SECTOR SET SEC_Img = $1 WHERE SEC_Nombre = $2 RETURNING *", [image, name]);
		if (result && result.rows.length > 0) {
			console.log(result.rows);
			return `Sector modificado con éxito`;
		} else {
			return `Sector ${name} no existe`;
		}
	} catch(err) {
		console.log(err);
		return `Hubo un error inesperado`;
	}
}

const borrar_sector = async (body) => {
	const {name} = body;
	try {
		const result = await pool.query("DELETE FROM SECTOR WHERE SEC_Nombre = $1 RETURNING *", [name]);
		if (result && result.rows.length > 0) {
			console.log(result.rows);
			return `Sector eliminado con éxito`;
		} else {
			return `Sector ${name} no existe`;
		}
	} catch (err) {
		return err;
	}
}
// **** END: Mantención de SECTOR

// END: Mantención de tablas Básicas.

module.exports = {
	getSectores,
	getTIncidentes,
	listar_pertenencias,
	listar_sectores,
	mantener_sector,
	control_de_acceso,
	generar_reporte
};
