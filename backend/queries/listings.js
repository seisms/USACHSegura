const pool = require('./credentials.js')

const listar_sectores_frecuentados = async (body) => {
    try {
        const { email } = body;
        const result = await pool.query("SELECT FREC_Sector FROM FRECUENTA WHERE FREC_Correo = $1", [email]);
        if (result && result.rows.length > 0) {
            console.log(result.rows);
            return result.rows;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

//Listado tablas basicas
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

const listar_tusuario = async () => {
    try {
        const result = await pool.query("SELECT * FROM TUSUARIO;");
        if (result && result.rows.length > 0) {
            console.log(result.rows);
            return result.rows;
        } else {
            return `No hay tipos de usuario para listar`;
        }
    } catch (err) {
        console.error(err);
        return `Ocurrió un error inesperado`;
    }
}

//Listado de tipo de pertenencias
const listar_tpertenencia = async () => {
    try {
        const result = await pool.query("SELECT * FROM TPERTENENCIA;");
        if (result && result.rows.length > 0) {
            console.log(result.rows);
            return result.rows;
        } else {
            return `No hay tipos de pertenencias para listar`;
        }
    } catch (err) {
        console.error(err);
        return `Ocurrió un error inesperado`;
    }
}


//Listados del usuaris y para el usuario

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
const listar_tincidentes = async () => {
    try {
        const result = await pool.query("SELECT * FROM TINCIDENTE");
        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            throw new Error("No hay tipos de incidente");
        }
    } catch (err) {
        console.error("Error al ejecutar consulta LISTAR_TINCIDENTES", err);
        return null;
    }
};


const listar_tpertenencias = async () => {
    try {
        const result = await pool.query("SELECT * FROM TPERTENENCIA");
        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            throw new Error("No hay tipos de pertenencia");
        }
    } catch (err) {
        console.error("Error al ejecutar consulta LISTAR_TPertenencias", err);
        return null;
    }
}

const listar_reportes = async (sector) => {
    try {
        let query = "SELECT REP_ID, REP_Correo, " +
            "REP_Sector, TIN_Tnombre REP_Tipo, " +
            "REP_Fecha, REP_Hora " +
            "FROM REPORTE, TINCIDENTE " +
            "WHERE REP_Tipo = TIN_TID";

        let params = []

        if (sector) {
            query += " AND REP_SECTOR = $1"
            params.push(sector);
        }

        query += " ORDER BY REP_Fecha DESC, REP_Hora DESC"
        console.log(query);
        const result = await pool.query(query, params)

        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            throw new Error("No hay reportes")
        }

    } catch (err) {
        console.error("Error al ejecutar consulta LISTAR_REPORTES", err);
    }
}

const listar_info_perfil = async (correo) => {
    try {
        const lperfil = await pool.query("SELECT US_CORREO, US_FONO FROM USUARIO WHERE US_Correo = $1", [correo]);
        if (lperfil && lperfil.rows.length > 0) {
            console.log(lperfil.rows[0])
            return lperfil.rows[0]
        } else {
            throw new Error(`No existe el usuario ${correo}`)
        }
    } catch (err) {
        console.error(err)
    }
}

const listar_info_sector = async (sector) => {
    try {
        const DATEDIFF = "EXTRACT(DAY FROM NOW() - REP_Fecha)"
        const rep_per_sector = await pool.query(`SELECT REP_Tipo, REP_Fecha, REP_Hora \
                                                 FROM REPORTE, SECTOR \
                                                 WHERE REP_Sector = $1 \
                                                 AND REP_Sector = SEC_Nombre \
                                                 AND ${DATEDIFF} <= 15 \
                                                 AND ${DATEDIFF} >= 0`, [sector]);
        const rep_tot = await pool.query(`SELECT COUNT(REP_ID) as tot\
                                          FROM REPORTE \
                                          WHERE REP_Sector = $1`, [sector])
        const last_rep_count = await pool.query(`SELECT COUNT(REP_ID) as recent_count\
                                                FROM REPORTE \
                                                WHERE REP_Sector = $1 \
                                                AND ${DATEDIFF} <= 15 \
                                                AND ${DATEDIFF} >= 0`, [sector])
        const list = {
            per_sector: rep_per_sector.rows,
            total: rep_tot.rows[0].tot,
            recent_count: last_rep_count.rows[0].recent_count
        }
        console.log(list)
        return list;
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    listar_sectores,
    listar_tusuario,
    listar_tincidentes,
    listar_pertenencias,
    listar_sectores_frecuentados,
    getSectores,
    listar_reportes,
    listar_tpertenencia,
    listar_info_perfil,
    listar_info_sector
}
