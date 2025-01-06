const pool = require('./credentials.js')

const listar_sectores_frecuentados = async (email) => {
    try {
        const result = await pool.query("SELECT FREC_Sector \
            FROM FRECUENTA, SECTOR \
            WHERE FREC_Correo = $1 \
            AND FREC_Sector = SEC_Nombre \
            AND SEC_Disponible = 'si'", [email]);
        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            return []
        }
    } catch (err) {
        console.error(err);
    }
}

//Listado tablas basicas
const listar_sectores = async () => {
    try {
        const query = await pool.query("SELECT * FROM SECTOR \
            WHERE SEC_DISPONIBLE = 'si' \
            ORDER BY SEC_Path;");
        const result = query.rows.map((sector) => ({
            ...sector,
            sec_img: sector.sec_img ? Buffer.from(sector.sec_img).toString('base64') : null
        }));

        console.log("mostrando resultados: ", result);
        if (result && result.length > 0) {
            return result;
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
        const result = await pool.query("SELECT * FROM TUSUARIO \
            WHERE TU_DISPONIBLE = 'si' \
            ORDER BY TU_Tid;");
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
        const result = await pool.query("SELECT * FROM TPERTENENCIA \
            WHERE TPER_DISPONIBLE = 'si' \
            ORDER BY TPER_TID;");
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


//Listados del usuario y para el usuario

const listar_pertenencias = async (email) => {
    try {
        const result = await pool.query("SELECT PER_ID, PER_Nombre, PER_Correo, \
			TPER_TNombre, PER_Img \
			FROM PERTENENCIA, TPERTENENCIA WHERE PER_Correo = $1 \
            AND PER_DISPONIBLE = 'si' \
			AND PER_Tipo = TPER_TID", [email]);
        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            console.error("No hay pertenencias/No existe el usuario", email);
        }
    } catch (err) {
        console.error("error");
    }
}

// Obtener tipo de incidentes
const listar_tincidentes = async () => {
    try {
        const result = await pool.query("SELECT * FROM TINCIDENTE \
            WHERE TIN_DISPONIBLE = 'si' \
            ORDER BY TIN_TID;");
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

const listar_reportes = async (sector) => {
    try {
        let query = "SELECT REP_ID, REP_Correo, \
            REP_Sector, TIN_Tnombre REP_Tipo, \
            REP_Fecha, REP_Hora \
            FROM REPORTE, TINCIDENTE, SECTOR \
            WHERE REP_Tipo = TIN_TID \
            AND SEC_Nombre = REP_Sector \
            AND SEC_Disponible = 'si'";

        let params = []

        if (sector) {
            query += " AND REP_SECTOR = $1"
            params.push(sector);
        }

        query += " ORDER BY REP_Fecha DESC, REP_Hora DESC"

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

// Este módulo hay que agregarlo a la documentación.
const listar_info_reporte = async (report_id) => {
    try {
        const report = await pool.query("SELECT REP_ID, REP_Correo, REP_Sector, TIN_Tnombre, REP_Fecha, REP_Hora \
            FROM REPORTE, TINCIDENTE \
            WHERE REP_ID = $1 AND REP_Tipo = TIN_TID", [report_id])
        if (report && report.rows.length > 0) {
            const perts = await pool.query("SELECT PER_ID, TPER_Tnombre \
                FROM REPORTE, PERTENENCIA, PUSURPADA, TPERTENENCIA \
                WHERE REP_ID = $1 \
                AND PU_RID = REP_ID \
                AND PER_ID = PU_PID \
                AND PER_Tipo = TPER_TID"
                , [report_id])
            return {
                reporte: report.rows[0],
                pertenencias_usurpadas: perts.rows
            }
        } else {
            throw new Error(`No existe el reporte ${report_id}`)
        }
    } catch (err) {
        console.error(err)
    }
}

const listar_info_perfil = async (correo) => {
    try {
        const lperfil = await pool.query("SELECT US_CORREO, US_FONO FROM USUARIO WHERE US_Correo = $1", [correo]);
        if (lperfil && lperfil.rows.length > 0) {
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
        const recent_reports = await pool.query(`SELECT TIN_TNombre, REP_Fecha, REP_Hora \
                                                 FROM REPORTE, SECTOR, TINCIDENTe \
                                                 WHERE REP_Sector = $1 \
                                                 AND REP_Sector = SEC_Nombre AND TIN_TID = REP_Tipo \
                                                 AND ${DATEDIFF} <= 15 \
                                                 AND ${DATEDIFF} >= 0`, [sector]);

        const count_recent_reports = recent_reports.rows.length

        const rep_tot = await pool.query(`SELECT COUNT(REP_ID) as tot\
                                          FROM REPORTE \
                                          WHERE REP_Sector = $1`, [sector])
        const list = {
            recent_reports: recent_reports.rows,
            total: parseInt(rep_tot.rows[0].tot),
            recent_count: count_recent_reports
        }
        return list;
    } catch (err) {
        console.error(err)
    }
}

const listar_usuario_por_sector = async (sector) => {
    try {
        const lusector = await pool.query("SELECT FREC_Correo FROM FRECUENTA, SECTOR \
            WHERE FREC_Sector = $1 AND SEC_NOMBRE = FREC_SECTOR AND SEC_DISPONIBLE = 'si'", [sector]);
        if (lusector && lusector.rows.length > 0) {
            console.log('Usuarios que frecuentas el sector: ', lusector.rows);
            return lusector.rows;
        } else {
            throw new Error(`No hay usuarios en el sector ${sector}`)
        }
    } catch (err) {
        console.error(err)
    }
}

const listar_reportes_a_notificar = async () => {
    try {
        const SECOND_DIFF = "EXTRACT(EPOCH FROM (NOW() - (REP_Fecha + REP_Hora::interval)))"
        const result = await pool.query(`SELECT REP_ID, REP_Sector, TIN_Tnombre, REP_Fecha, REP_Hora \
                                            FROM REPORTE, TINCIDENTE \
                                                WHERE REP_Tipo = TIN_Tid \
                                                AND ${SECOND_DIFF} <= 20 \
                                                AND ${SECOND_DIFF} >= 0 \
                                                ORDER BY REP_Fecha, REP_Hora DESC`);
        if (result && result.rows.length > 0) {
            return result.rows;
        } else {
            return [];
        }
    } catch (err) {
        console.error("Error al listar reportes a notificar", err);
    }
}

module.exports = {
    listar_sectores,
    listar_tusuario,
    listar_tincidentes,
    listar_pertenencias,
    listar_usuario_por_sector,
    listar_sectores_frecuentados,
    listar_reportes_a_notificar,
    listar_reportes,
    listar_tpertenencia,
    listar_info_perfil,
    listar_info_sector,
    listar_info_reporte
}
