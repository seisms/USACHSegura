const Pool = require('pg').Pool
const pool = new Pool({
	user: 'usach',
	host: 'localhost',
	database: 'usach_segura',
	password: 'usach2024',
	port: 5432
})

const getUsers = async () => {
	try {
		return await new Promise(function(resolve, reject) {
			pool.query("SELECT * FROM USUARIO", (error, results) => {
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

// END: Acceso

// BEGIN: Mantención de tablas básicas.

// **** BEGIN: Mantención de SECTOR.
const maintainSector = (op, body) => {
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

const createSector = (body) => {
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

const deleteSector = (body) => {
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
	getUsers,
	getTIncidentes,
	getSectores,
	maintainSector
};
