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

const maintainSector = (body) => {
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
					resolve(
						`Nuevo sector: ${JSON.stringify(results.rows[0])}`
					);
				} else {
					reject(new Error("No results found"));
				}
			}
		);
	});
};


module.exports = {
	getUsers,
	maintainSector
};

// Mantenedor de sectores
