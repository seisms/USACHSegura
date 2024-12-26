const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'usach_segura',
    password: 'meme',
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
            return `Sector ${name} no se pudo agregar`;
        }
    } catch (err) {
        console.error(error);
        return `Hubo un error inesperado`;
    }
}

const modifySector = async (sector) => {
    const { name, image } = sector;
    try {
        const result = await pool.query("UPDATE SECTOR SET SEC_Img = $1 WHERE SEC_Nombre = $2 RETURNING *", [image, name]);
        if (result && result.rows.length > 0) {
            return `Sector modificado con éxito`;
        } else {
            return `Sector ${name} no existe`;
        }
    } catch (err) {
        console.error(err);
        return `Hubo un error inesperado`;
    }
}

const borrar_sector = async (sector) => {
    const { name } = sector;
    try {
        const result = await pool.query("DELETE FROM SECTOR WHERE SEC_Nombre = $1 RETURNING *", [name]);
        if (result && result.rows.length > 0) {
            return `Sector eliminado con éxito`;
        } else {
            return `Sector ${name} no existe`;
        }
    } catch (err) {
        console.error(err);
        return `Hubo un error inesperado`;
    }
}
// **** END: Mantención de SECTOR

// END: Mantención de tablas Básicas.
//
module.exports = {
    mantener_sector
}
