const Pool = require('pg').Pool
const pool = new Pool({
    user: 'usach',
    host: 'localhost',
    database: 'usach_segura',
    password: 'usach2024',
    port: 5432
})

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
        const result = await pool.query("INSERT INTO SECTOR VALUES ($1, $2, 1) RETURNING *", [name, image]);
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
        const result = await pool.query("DELETE FROM SECTOR WHERE SEC_Nombre = $1 RETURNING *", [name]);
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
    const { Tu_tid, Tu_tnombre } = tusuario;
    try {
        const result = await pool.query("INSERT INTO TUSUARIO (tu_tnombre) VALUES ($1) RETURNING *", [Tu_tnombre]);
        if (result && result.rows.length > 0) {
            return `Sector agregado con éxito`;
        } else {
			throw new Error(`No se pudo agregar sector ${tnombre}`);
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
            return `Sector modificado con éxito`;
        } else {
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
        const result = await pool.query("DELETE FROM TUSUARIO WHERE tu_tid = $1 RETURNING *", [Tu_tid]);
        if (result && result.rows.length > 0) {
            return `Sector eliminado con éxito`;
        } else {
			throw new Error(`No se pudo eliminar sector ${Tu_tid}`);
        }
    } catch (err) {
        console.error(err);
		return err.message;
    }
}

// END: Mantención de tablas Básicas.
//
module.exports = {
    mantener_sector,
    mantener_tusuario
}
