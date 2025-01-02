const express = require('express')
const app = express()
const port = 3001

const list = require('./queries/listings.js')
const maintain = require('./queries/maintain.js')
const generic = require('./queries/generic.js')

app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.put('/list-sec-frec', async (req, res) => {
    try {
        const response = await list.listar_sectores_frecuentados(req.body);
        if (response) {
            res.status(200).json({
                success: true,
                data: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar los sectores frecuentados"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/listar-sectores', async (req, res) => {
    try {
        const response = await list.listar_sectores();
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar los sectores",
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/tipo-incidentes', async (req, res) => {
    try {
        const response = await list.listar_TIncidentes();
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar los tipos de incidentes."
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/sectores', (req, res) => {
    list.getSectores()
        .then((response) => {
            res.status(200).send(response); // Enviar el arreglo como JSON
        })
        .catch((error) => {
            res.status(500).send(error);
        });
})

app.get('/listar-tusuarios', async (req, res) => {
    try {
        const response = await list.listar_tusuario();
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar los tipos de usuario."
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.post('/sector-maintain/:op', async (req, res) => {
    try {
        const op = req.params.op
        const response = await maintain.mantener_sector(op, req.body)
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.post('/tusuario-maintain/:op', async (req, res) => {
    try {
        const op = req.params.op
        const response = await maintain.mantener_tusuario(op, req.body)
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const response = await generic.control_de_acceso(req.body)
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Usuario/Contraseña equivocados"
            })
        }
    } catch (error) {
    }
})

app.post('/report', async (req, res) => {
    try {
        const response = await list.generar_reporte(req.body);
        if (response) {
            res.status(200).json({
                success: response,
                message: "Reporte agregado con éxito"
            });
        } else {
            res.status(401).json({
                success: response,
                message: "No se pudo agregar el reporte"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.put('/pertenencias', async (req, res) => {
    try {
        const response = await list.listar_pertenencias(req.body);
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar las pertenencias."
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/listar_reportes/:sector?', async (req, res) => {
    try {
        let sector = null;
        if (req.params.sector) {
            sector = req.params.sector;
        }
        const response = await list.listar_reportes(sector);
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudieron obtener los reportes"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.post('/gestion-de-perfil/:op', async (req, res) => {
    try {
        const op = req.params.op;
        const response = await generic.gestion_de_perfil(req.body, op);
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Ocurrió un error al realizar la operación"
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error intero del servidor"
        })
    }
})

app.listen(port, () => {
    console.log(`Servidor vivo en puerto: ${port}.`)
})
