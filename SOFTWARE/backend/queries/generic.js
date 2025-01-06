const pool = require('./credentials.js')

// BEGIN: Generación de Reportes
const generar_reporte = async (body) => {
    const { reporte, list_pusurpada } = body;
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
        return {
            success: true,
            result: id
        };
    } catch (error) {
        console.log('Error al generar el reporte', error);
        return false;
    }
}

const registrar_reporte = async (reporte) => {
    if (typeof reporte === "string") {
        reporte = JSON.parse(reporte);
        try {
            const { email, type, sector } = reporte;
            const date = await pool.query("SELECT (NOW() at TIME ZONE 'Chile/Continental')::date as date");
            const time = await pool.query("SELECT (NOW() AT TIME ZONE 'Chile/Continental')::time(0) as time");
            const result = await pool.query("INSERT INTO REPORTE (REP_Correo, REP_Sector, REP_Tipo, REP_Fecha, REP_Hora) VALUES ($1, $2, $3, $4, $5) RETURNING REP_ID",
                [email, sector, type, date.rows[0].date, time.rows[0].time]);
            return result.rows[0].rep_id;
        } catch (err) {
            console.error('Error al ejecutar la consulta:', err);
            return -1;
        }
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
        return 1;
    } catch (err) {
        console.error("Error: ", err);
        return -1;
    }
}

// END: Generación de Reportes

// BEGIN: Acceso (control y registro)
const control_de_acceso = async (login) => {
    const { email, password } = login;
    try {
        let result = await pool.query("SELECT * FROM USUARIO WHERE US_Correo = $1 AND US_Disponible = 'no'", [email])
        if (result && result.rows.length > 0) {
            return -1;
        }
        result = await pool.query("SELECT US_Contrasenya FROM USUARIO WHERE US_Correo = $1",
            [email]);

        if (result.rows.length > 0) {
            const query_password = result.rows[0].us_contrasenya

            if (query_password === password) {
                result = await pool.query("SELECT TU_TNombre " +
                    "FROM USUARIO, RUSUARIO, TUSUARIO " +
                    "WHERE US_Correo = $1 " +
                    "AND TU_TID = RU_Tipo " +
                    "AND RU_Correo = US_Correo ",
                    [email]);
                const query_ustype = result.rows[0].tu_tnombre;
                return { query_ustype, email };
            } else {
                return null;
            }
        }

    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
    }
}

const registrar_nuevo_usuario = async (nvusuario) => {
    const { email, password, phone, usertype } = nvusuario;
    try {
        const result = await pool.query("SELECT * FROM USUARIO \
            WHERE US_Correo = $1 \
            AND US_Disponible = 'no'",
            [email])
        if (result && result.rows.length > 0) {
            throw new Error("El usuario que intenta registrar \
                ya existe y fué inhabilitado por un administrador.")
        }

        await pool.query("INSERT INTO USUARIO \
			(US_Correo, US_Fono, US_Contrasenya, US_Disponible) \
			VALUES ($1, $2, $3, 'si')", [email, phone, password])

        for (const tipo of usertype) {
            console.log(`tipo ${tipo}, email: ${email}`)
            await pool.query("INSERT INTO RUSUARIO (RU_Correo, RU_Tipo) \
                                Values ($1, $2)", [email, tipo]);
        }
        return "OK"
    } catch (err) {
        console.error(err)
        return {
            msg: err.message
        }
    }
}

// END: Acceso

// BEGIN:Administración tablas del usuario
// **** BEGIN: Gestionar Pertenencias
const gestion_de_perfil = async (body, op) => {
    if (op === "LFC") {
        const result = await registrar_lugar_frecuentado(body, 'C');
        return result;
    }

    if (op === "LFD") {
        const result = await registrar_lugar_frecuentado(body, 'D');
        return result;
    }

    if (op === "PC") {
        const result = await resgistrar_pertenencia(body, 'C');
        return result;
    }

    if (op === "PM") {
        const result = await resgistrar_pertenencia(body, 'M');
        return result;
    }

    if (op === "PD") {
        const result = await resgistrar_pertenencia(body, 'D');
        return result;
    }
};

const resgistrar_pertenencia = async (pertusuario, op) => {
    try {
        if (op === 'C') {
            const { correo, tipo, img, nombre } = pertusuario;
            const result = await pool.query("SELECT PER_ID FROM PERTENENCIA \
                WHERE PER_Correo = $1 AND PER_Nombre = $2 \
                AND PER_Tipo = $3 AND PER_Disponible = 'no'", [correo, nombre, tipo])
            if (result && result.rows.length > 0) {
                await pool.query("UPDATE PERTENENCIA \
                    SET PER_Disponible = 'si' \
                    WHERE PER_ID = $1", [result.rows[0].per_id]);
            } else {
                await pool.query("INSERT INTO PERTENENCIA " +
                    "(PER_Correo, PER_Tipo, PER_Img, PER_Nombre, PER_DISPONIBLE) " +
                    "VALUES ($1, $2, $3, $4, 'si') RETURNING *",
                    [correo, tipo, img, nombre]);
            }
            return `Pertenencia ${nombre} creada`;
        }
        if (op === 'M') {
            const { id, tipo, img, nombre } = pertusuario;
            const result = await pool.query(
                "UPDATE PERTENENCIA " +
                "SET " +
                "PER_Nombre = $1, PER_Tipo = $2, PER_Img = $3 " +
                "WHERE PER_ID = $4 RETURNING *", [nombre, tipo, img, id]
            );
            if (result && result.rows.length > 0) {
                return `Pertenencia ${nombre} actualizada`;
            } else {
                throw new Error(`Fallo actualizar pertenencia ${id}`)
            }
        }
        if (op === 'D') {
            const { id, nombre } = pertusuario;
            const result = await pool.query(
                "UPDATE  PERTENENCIA \
                SET PER_DISPONIBLE = 'no' \
                WHERE PER_ID = $1 RETURNING *", [id]
            );
            if (result && result.rows.length > 0) {
                return `Pertenencia ${nombre} eliminada`;
            } else {
                throw new Error(`No existe pertenencia ${id}`)
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// **** END: Gestionar Pertenencias

// *** BEGIN: Gestionar lugares frecuentados
const registrar_lugar_frecuentado = async (frecuentado, op) => {
    try {
        const { correo, sector } = frecuentado;
        console.log(frecuentado);
        console.log(correo, sector);
        if (op === "C") {
            // Check if entry already exists...
            let result = await pool.query("SELECT * FROM FRECUENTA " +
                "WHERE FREC_Correo = $1 AND FREC_Sector = $2", [correo, sector]);
            if (result && result.rows.length > 0) {
                return `Ya frecuentas ese sector`
            }
            result = await pool.query("INSERT INTO FRECUENTA " +
                "(FREC_Sector, FREC_Correo) VALUES ($1, $2) RETURNING *", [sector, correo]);
            if (result && result.rows.length > 0) {
                console.log(result.rows[0]);
                return `Sector frecuentado añadido`;
            } else {
                throw new Error("Insertar a tabla frecuenta falló");
            }
        }
        if (op === "D") {
            const result = await pool.query("DELETE FROM FRECUENTA " +
                "WHERE FREC_Correo = $1 AND FREC_Sector = $2 RETURNING *", [correo, sector]
            )
            if (result && result.rows.length > 0) {
                return `Sector frecuentado eliminado`;
            }
        }
    } catch (err) {
        console.error(err);
    }
}

// *** END: Gestionar lugares frecuentados

// END: Administración tablas del usuario

// Begin: Calcular indice de seguridad

const calcular_indice_seguridad = async () => {
    try {
        const DATEDIFF = "EXTRACT(DAY FROM NOW() - REP_Fecha)"
		let security;
        const total = await pool.query(`SELECT COUNT(*) FROM REPORTE \
                                        WHERE ${DATEDIFF} <= 15 \
                                        AND ${DATEDIFF} >= 0`);
        const lista_sectores = await pool.query("SELECT SEC_Nombre FROM SECTOR");

        for (const sector of lista_sectores.rows) {
            const rsector = await pool.query(`SELECT COUNT(*) FROM REPORTE WHERE REP_Sector = $1 \
                                            AND ${DATEDIFF} <= 15 \
                                            AND ${DATEDIFF} >= 0`, [sector.sec_nombre]);

            if (rsector.rows[0].count >= 0) {
				if (total.rows[0].count <= 0) {
					security = 1
				} else {
					security = total.rows[0].count
				}
                result = await pool.query("UPDATE SECTOR SET sec_seguridad = 1 - (($1 * 1.0) / $2) WHERE sec_nombre = $3", [rsector.rows[0].count, security, sector.sec_nombre]);
            }
            else if (rsector.rows[0].count === 0) {
                result = await pool.query("UPDATE SECTOR SET sec_seguridad = 1 WHERE sec_nombre = $1", [sector.sec_nombre]);
            }
            else {
                throw new Error("Error al calcular el indice de seguridad");
            }
        }

        return `Indice de seguridad calculado`;

    } catch (err) {
        console.error(err);
    }
}


// End: Calcular indice de seguridad


module.exports = {
    generar_reporte,
    control_de_acceso,
    registrar_nuevo_usuario,
    gestion_de_perfil,
    calcular_indice_seguridad
}
