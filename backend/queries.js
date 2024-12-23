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

// Obtener tipo de incidentes

const getTIncidentes = async () => {
	try {
		return await new Promise(function(resolve, reject) {
			pool.query("SELECT tin_tnombre FROM TINCIDENTE", (error, results) => {
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
const mantener_sector = (op, body) => {
	if (op === "c") {
		return createSector(body);
	}

	if (op === "m") {
		return modifySector(body);
	}

	if (op === "d") {
		return deleteSector(body);
	}
};

const crear_sector = (body) => {
	return new Promise(function(resolve, reject) {
		const {name, image} = body;
		pool.query(
			"INSERT INTO SECTOR (SEC_Nombre, SEC_Img, SEC_Seguridad) VALUES ($1, $2, 1) RETURNING *",
			[name, image],
			(error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(`Nuevo sector creado con éxito!`);
				} else {
					reject(new Error("No results found"));
				}
			}
		);
	});
}

const modifySector = (body) => {
	return new Promise(function(resolve, reject) {
		const {name, image} = body;
		pool.query(
			"UPDATE SECTOR\
			 SET SEC_Img = $1\
			 WHERE SEC_Nombre = $2",
			 [image, name],
			 (error, results) => {
				if(error) {
					reject(error);
				}
				if(results && results.rows) {
					resolve(`Sector actualizado con éxito!`);
				} else {
					reject(new Error("No se pudo modificar el sector"));
				}
			 }
		);
	});
}

const borrar_sector = (body) => {
	return new Promise(function(resolve, reject) {
		const {name, image} = body;
		pool.query("DELETE FROM SECTOR WHERE SEC_Nombre = $1",
		[name],
		(error, results) => {
				if(error){
					reject(error);
				}
				if(results && results.row) {
					resolve(`Sector eliminado con éxito!`);
				} else {
					reject(new Error("No se pudo eliminar el sector"));
				}
			}
		);
	});
}
// **** END: Mantención de SECTOR

// END: Mantención de tablas Básicas.

module.exports = {
	listar_sectores,
	mantener_sector,
	control_de_acceso
};
