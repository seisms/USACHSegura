const Pool = require('pg').Pool
const pool = new Pool({
    user: 'usach',
    host: 'localhost',
    database: 'usach_segura',
    password: 'usach2024',
    port: 5432
})

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
        return true;
    } catch (error) {
        console.log('Error al generar el reporte', error);
        return false;
    }
}

const registrar_reporte = async (reporte) => {
    if (typeof reporte === "string") {
        reporte = JSON.parse(reporte);
    }
    const { email, type, sector, date, hour } = reporte;
    try {
        const result = await pool.query("INSERT INTO REPORTE (REP_Correo, REP_Sector, REP_Tipo, REP_Fecha, REP_Hora) VALUES ($1, $2, $3, $4, $5) RETURNING REP_ID",
            [email, sector, type, date, hour]);
        return result.rows[0].rep_id;
    } catch (err) {
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
        let result = await pool.query("SELECT US_Contrasenya FROM USUARIO WHERE US_Correo = $1",
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
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error al ejecutar la consulta:', err);
        return null;
    }
}

// END: Acceso

// BEGIN:Administración tablas del usuario
// **** BEGIN: Gestionar Pertenencias
const gestion_de_perfil = async (body, op) => {
    if(op === 'PC') {
        const result = await resgistrar_pertenencia(body, 'C');
        return result;
    }

    if(op === "PM") {
        const result = await resgistrar_pertenencia(body, 'M');
        return result;
    }

    if(op === "PE") {
        const result = await resgistrar_pertenencia(body, 'E');
        return result;
    }
};

const resgistrar_pertenencia = async (pertusuario, op) => {
    try {
        if (op === 'C') {
            const {correo, tipo, img, nombre} = pertusuario;
            const result = await pool.query("INSERT INTO PERTENENCIA " + 
                "(PER_Correo, PER_Tipo, PER_Img, PER_Nombre) " +
                "VALUES ($1, $2, $3, $4) RETURNING *",
            [correo, tipo, img, nombre]);
            console.log("Pertenencia creada", result.rows[0]);
            return result.rows[0];
        }

        if (op === 'M') {
            const {id, tipo, img, nombre} = pertusuario;
            const result = await pool.query(
                "UPDATE PERTENENCIA " +
                "SET " +
                "PER_Nombre = $1, PER_Tipo = $2, PER_Img = $3 " +
                "WHERE PER_ID = $4 RETURNING *", [nombre, tipo, img, id]
            );
            if (result && result.rows.length > 0) {
                console.log("Pertenencia actualizada:", result.rows[0]);
                return result.rows[0];
            } else {
                console.log("Fallo actualizar pertenencia");
                return null;
            }
        }

        if (op === 'D') {
            const {id, nombre} = pertusuario;
            const result = await pool.query(
                "DELETE FROM PERTENENCIA " +
                "WHERE PER_ID = $1 RETURNING *", [id]
            );
            if (result && result.rows.length > 0) {
                console.log(result.rows[0]);
                return `Pertenencia ${nombre} eliminada`;
            } else {
                console.log("No existe pertenencia", nombre);
                return null;
            }
        }
    } catch(err) {
        console.error(err);
        return null;
    }
}

// **** END: Gestionar Pertenencias

// END: Administración tablas del usuario

module.exports = {
    generar_reporte,
    control_de_acceso,
    gestion_de_perfil
}