const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usach_segura',
    password: 'meme',
    port: 5432
})

const listar_sectores_frecuentados = async (body) => {
    try {
        const {email} = body;
        const result = await pool.query("SELECT FREC_Sector FROM FRECUENTA WHERE FREC_Correo = $1", [email]);
        if(result && result.rows.length > 0) {
            console.log(result.rows);
            return result.rows;
        }
    } catch(err) {
        console.error(err);
        return null;
    }
}

const listar_sectores = async () => {
    try {
        const result = await pool.query("SELECT * FROM SECTOR;");
        if (result && result.rows.length > 0) {
            console.log(result.rows);
            return result.rows;
        } else {
            return `No hay sectores para listar`;
        }
    } catch (err) {
        console.error(err);
        return `Ocurrió un error inesperado`;
    }
};

const listar_pertenencias = async (body) => {
    try {
        const { email } = body;
        const result = await pool.query("SELECT * FROM PERTENENCIA WHERE PER_Correo = $1", [email]);
        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            console.error("No hay pertenencias/No existe el usuario", email);
            return null;
        }
    } catch (err) {
        console.error("error");
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
                } else {
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

const listar_TIncidentes = async () => {
    try {
        const result = await pool.query("SELECT * FROM TINCIDENTE");
        if (result && result.rows) {
            return result.rows;
        } else {
            throw new Error("No hay tipos de incidente");
        }
    } catch (err) {
        console.log("Error al ejecutar consulta LISTAR_TINCIDENTES");
    }
};

module.exports = {
    listar_sectores,
    listar_TIncidentes,
    listar_pertenencias,
    listar_sectores_frecuentados,
    getSectores
}
