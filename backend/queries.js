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

module.exports = {
	getUsers
};
