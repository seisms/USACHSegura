const pool = require('./credentials.js')

// BEGIN: Mantención de tablas básicas.
// **** BEGIN: Mantención de SECTOR.
const mantener_sector = async (op, sector) => {
    if (op === "a") {
        const result = await crear_sector(sector);
        return result;
    }

    if (op === "m") {
        const result = await modifySector(sector);
        return result;
    }

    if (op === "e") {
        const result = await borrar_sector(sector);
        return result;
    }
};

const crear_sector = async (sector) => {
    const { name, image } = sector;
    try {
        let result = await pool.query("SELECT * FROM SECTOR WHERE SEC_Nombre = $1", [name])

        if (result && result.rows.length > 0) {
            result = await pool.query("UPDATE SECTOR SET SEC_Disponible = 'si' WHERE SEC_NOMBRE = $1 RETURNING *", [name])
        } else {
            console.log(image)
            result = await pool.query("INSERT INTO SECTOR VALUES ($1, $2, 1, 15, 'si') RETURNING *", [name, image]);
        }

        if (result && result.rows.length > 0) {
            return `Sector agregado con éxito`;
        } else {
            throw new Error(`No se pudo agregar sector ${name}`);
        }

    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const modifySector = async (sector) => {
    const { name, image } = sector;
    try {
        const result = await pool.query("UPDATE SECTOR SET SEC_Img = $1 WHERE SEC_Nombre = $2 RETURNING *", [image, name]);
        if (result && result.rows.length > 0) {
            return `Sector modificado con éxito`;
        } else {
            console.log("here!");
            throw new Error(`No se pudo modificar sector ${name}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const borrar_sector = async (sector) => {
    const { name } = sector;
    try {
        const result = await pool.query("UPDATE SECTOR SET SEC_Disponible = 'no' WHERE SEC_Nombre = $1 RETURNING *", [name]);
        if (result && result.rows.length > 0) {
            return `Sector eliminado con éxito`;
        } else {
            throw new Error(`No se pudo eliminar sector ${name}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}
// **** END: Mantención de SECTOR
// **** BEGIN: Mantención de TUSUARIO
const mantener_tusuario = async (op, tusuario) => {
    if (op === "a") {
        const result = await crear_tusuario(tusuario);
        return result;
    }

    if (op === "m") {
        const result = await modificar_tusuario(tusuario);
        return result;
    }

    if (op === "e") {
        const result = await borrar_tusuario(tusuario);
        return result;
    }
};

const crear_tusuario = async (tusuario) => {
    const { Tu_tnombre } = tusuario;
    try {

        let result = await pool.query("SELECT * FROM TUSUARIO WHERE TU_TNOMBRE = $1", [Tu_tnombre])

        if (result && result.rows.length > 0) {
            result = await pool.query("UPDATE TUSUARIO SET TU_DISPONIBLE = 'si' WHERE TU_TNOMBRE = $1 RETURNING *", [Tu_tnombre]);
        } else {
            result = await pool.query("INSERT INTO TUSUARIO (tu_tnombre) VALUES ($1, 'si') RETURNING *", [Tu_tnombre]);
        }

        if (result && result.rows.length > 0) {
            return `Tipo de usuario agregado con éxito`;
        } else {
            throw new Error(`No se pudo agregar el tipo de usuario: ${Tu_tnombre}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const modificar_tusuario = async (tusuario) => {
    const { Tu_tid, Tu_tnombre } = tusuario;
    try {
        const result = await pool.query("UPDATE TUSUARIO SET tu_tnombre = $1 WHERE tu_tid = $2 RETURNING *", [Tu_tnombre, Tu_tid]);
        if (result && result.rows.length > 0) {
            return `Tipo de usuario modificado con éxito`;
        } else {
            console.log("here!");
            throw new Error(`No se pudo modificar el tipo de usuario: ${Tu_tid}`);
            console.log("here!");
            throw new Error(`No se pudo modificar sector ${Tu_tid}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const borrar_tusuario = async (tusuario) => {
    const { Tu_tid, Tu_tnombre } = tusuario;
    try {
        const result = await pool.query("UPDATE TUSUARIO SET TU_DISPONIBLE = 'no' WHERE tu_tid = $1 RETURNING *", [Tu_tid]);
        if (result && result.rows.length > 0) {
            return `Tipo de usuario eliminado con éxito`;
        } else {
            throw new Error(`No se pudo eliminar el tipo de usuario: ${Tu_tid}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

// **** END: Mantención de TUSUARIO
// **** BEGIN: Mantención de TINCIDENTE

const mantener_tincidente = async (op, tincidente) => {
    if (op === "a") {
        const result = await crear_tincidente(tincidente);
        return result;
    }

    if (op === "m") {
        const result = await modificar_tincidente(tincidente);
        return result;
    }

    if (op === "e") {
        const result = await borrar_tincidente(tincidente);
        return result;
    }
};

const crear_tincidente = async (tincidente) => {
    const { Tin_tid, Tin_tnombre } = tincidente;
    try {
        let result = await pool.query("SELECT * FROM TINCIDENTE WHERE TIN_TID = $1", [Tin_tid]);

        if (result && result.rows.length > 0) {
            result = await pool.query("UPDATE TINCIDENTE SET TIN_DISPONIBLE = 'si' WHERE TIN_TID = $1 RETURNING *", [Tin_tid]);
        } else {
            result = await pool.query("INSERT INTO TINCIDENTE (tin_tnombre) VALUES ($1) RETURNING *", [Tin_tnombre]);
        }

        if (result && result.rows.length > 0) {
            return `Tipo de incidente agregado con éxito`;
        } else {
            throw new Error(`No se pudo agregar el tipo de incidente ${Tin_tnombre}`);
        }

    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const modificar_tincidente = async (tincidente) => {
    const { Tin_tid, Tin_tnombre } = tincidente;
    try {
        const result = await pool.query("UPDATE TINCIDENTE SET TIN_TNOMBRE = $1 WHERE TIN_TID = $2 RETURNING *", [Tin_tnombre, Tin_tid]);
        if (result && result.rows.length > 0) {
            return `Tipo de incidente modificado con éxito`;
        } else {
            console.log("here!");
            throw new Error(`No se pudo modificar el tipo de incidente ${Tin_tid}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const borrar_tincidente = async (tincidente) => {
    const { Tin_tid, Tin_tnombre } = tincidente;
    try {
        const result = await pool.query("UPDATE TINCIDENTE SET TIN_DISPONIBLE = 'no' WHERE TIN_TID = $1 RETURNING *", [Tin_tid]);
        if (result && result.rows.length > 0) {
            return `Tipo de incidente eliminado con éxito`;
        } else {
            throw new Error(`No se pudo eliminar el tipo de incidente ${Tin_tid}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

// **** END: Mantención de TINCIDENTE
// **** BEGIN: Mantención de TPERTENENCIA

const mantener_tpertenencia = async (op, tpertenencia) => {
    if (op === "a") {
        const result = await crear_tpertenencia(tpertenencia);
        return result;
    }

    if (op === "m") {
        const result = await modificar_tpertenencia(tpertenencia);
        return result;
    }

    if (op === "e") {
        const result = await borrar_tpertenencia(tpertenencia);
        return result;
    }
}

const crear_tpertenencia = async (tpertenencia) => {
    const { Tper_tid, Tper_tnombre } = tpertenencia;
    try {

        let result = await pool.query("SELECT * FROM TPERTENENCIA WHERE TPER_TID = $1", [Tper_tid]);

        if (result && result.rows.length > 0) {
            result = await pool.query("UPDATE TPERTENENCIA SET TPER_DISPONIBLE = 'si' WHERE TPER_TID = $1 RETURNING *", [Tper_tid]);
        } else {
            result = await pool.query("INSERT INTO TPERTENENCIA (tper_tnombre) VALUES ($1) RETURNING *", [Tper_tnombre]);
        }

        if (result && result.rows.length > 0) {
            return `Tipo de pertenencia agregado con éxito`;
        } else {
            throw new Error(`No se pudo agregar el tipo de pertenencia ${Tper_tnombre}`);
        }

    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const modificar_tpertenencia = async (tpertenencia) => {
    const { Tper_tid, Tper_tnombre } = tpertenencia;
    try {
        const result = await pool.query("UPDATE TPERTENENCIA SET TPER_TNOMBRE = $1 WHERE TPER_TID = $2 RETURNING *", [Tper_tnombre, Tper_tid]);
        if (result && result.rows.length > 0) {
            return `Tipo de pertenencia modificado con éxito`;
        } else {
            console.log("here!");
            throw new Error(`No se pudo modificar el tipo de pertenencia ${Tper_tid}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const borrar_tpertenencia = async (tpertenencia) => {
    const { Tper_tid, Tper_tnombre } = tpertenencia;
    try {
        const result = await pool.query("UPDATE TPERTENENCIA SET TPER_DISPONIBLE = 'no' WHERE TPER_TID = $1 RETURNING *", [Tper_tid]);
        if (result && result.rows.length > 0) {
            return `Tipo de pertenencia eliminado con éxito`;
        } else {
            throw new Error(`No se pudo eliminar el tipo de pertenencia ${Tper_tid}`);
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

// BEGIN: Mantener USUARIO
const mantener_usuario = async (op, usuario) => {
    if (op === "a") {
        const result = await reestablecer_usuario(usuario);
        return result;
    }

    if (op === "e") {
        const result = await borrar_usuario(usuario);
        return result;
    }
}

const reestablecer_usuario = async (usuario) => {
    try {
        const { Us_correo } = usuario;
        let result = await pool.query("SELECT * FROM USUARIO \
            WHERE US_Correo = $1 AND US_Disponible = 'no'", [Us_correo]);
        if (result && result.rows.length > 0) {
            await pool.query("UPDATE USUARIO SET US_Disponible = 'si' \
                WHERE US_Correo = $1", [Us_correo])
            return `Usuario ${Us_correo} reestablecido con éxito.`
        } else {
            return `No hay usuario inactivo ${Us_correo} para reestablecer`
        }
    } catch (err) {
        console.error(err);
        return err.message;
    }
}

const borrar_usuario = async (usuario) => {
    try {
        const { Us_correo } = usuario;
        const result = await pool.query("UPDATE USUARIO SET US_DISPONIBLE = 'no' WHERE US_CORREO = $1 RETURNING *", [Us_correo]);
        if (result && result.rows.length > 0) {
            return `Usuario ${Us_correo} desactivado con éxito`;
        } else {
            throw new Error(`No se pudo desactivar el usuario ${Us_correo}`);
        }
    } catch (err) {
        console.error(err)
        return err.message;
    }
}
// END: Mantener USUARIO

// END: Mantención de tablas Básicas.

module.exports = {
    mantener_sector,
    mantener_tusuario,
    mantener_tincidente,
    mantener_tpertenencia,
    mantener_usuario
}
