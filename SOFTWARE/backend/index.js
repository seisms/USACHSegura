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

app.get('/calcular-indice', async (req, res) => {
    try {
        const response = await generic.calcular_indice_seguridad();
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo calcular el índice de seguridad."
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/listar/sectores_frecuentados/:email', async (req, res) => {
    try {
        const email = req.params.email
        const response = await list.listar_sectores_frecuentados(email);
        if (response || response == []) {
            console.log(response)
            res.status(200).json({
                success: true,
                result: response
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

app.get('/listar/sectores', async (req, res) => {
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

app.get('/listar/usuarios', async (req, res) => {
    try {
        const response = await list.listar_usuarios();
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            });
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar los usuarios"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
})

app.get('/listar/tusuarios', async (req, res) => {
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

app.get('/listar/tpertenencias', async (req, res) => {
    try {
        const response = await list.listar_tpertenencia();
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudo listar los tipos de pertenencias."
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/listar/tincidentes', async (req, res) => {
    try {
        const response = await list.listar_tincidentes();
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

app.post('/sector-maintain/:op', async (req, res) => {
    try {
        const op = req.params.op;
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

app.post('/tpertenencia-maintain/:op', async (req, res) => {
    try {
        const op = req.params.op
        const response = await maintain.mantener_tpertenencia(op, req.body)
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

app.post('/tincidente-maintain/:op', async (req, res) => {
    try {
        const op = req.params.op
        const response = await maintain.mantener_tincidente(op, req.body)
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

app.post('/usuario-maintain/:op', async (req, res) => {
    try {
        const op = req.params.op;
        const response = await maintain.mantener_usuario(op, req.body);
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
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
        if (response && response !== -1) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else if (response) {
            res.status(401).json({
                success: false,
                message: "Tu cuenta ha sido desactivada por un administrador."
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Usuario/Contraseña equivocados"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.post('/register', async (req, res) => {
    try {
        const response = await generic.registrar_nuevo_usuario(req.body)
        if (response === "OK") {
            res.status(200).json({
                success: true,
                message: "Usuario registrado con éxito"
            })
        } else {
            res.status(401).json({
                success: false,
                message: response.msg
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.post('/report', async (req, res) => {
    try {
        const response = await generic.generar_reporte(req.body);
        if (response.success === true) {
            res.status(200).json({
                success: true,
                id: response.result,
                message: "Reporte agregado con éxito"
            });
        } else {
            res.status(401).json({
                success: false,
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

app.get('/listar/pertenencias/:email', async (req, res) => {
    try {
        const email = req.params.email
        const response = await list.listar_pertenencias(email);
        if (response) {
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            console.error(`No se pudieron listar las pertenencias de ${email}`)
            res.status(401).json({
                success: false,
                message: "No se pudo listar las pertenencias."
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Error interno del servidor."
        })
    }
})

app.get('/listar/reportes/:sector?', async (req, res) => {
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

app.get('/listar/usuarios_por_sector/:sector?', async (req, res) => {
    try {
        let sector = null;
        if (req.params.sector) {
            console.log('se pudo obtener un parametro sector: ', req.params.sector);
            sector = req.params.sector;
        }
        const response = await list.listar_usuario_por_sector(sector);
        if (response) {
            console.log('obtuviste respuesta de la base de datos', response);
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: "No se pudieron obtener los usuarios"
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
            message: "Error interno del servidor"
        })
    }
})

app.get('/info/perfil/:correo', async (req, res) => {
    try {
        const correo = req.params.correo
        const response = await list.listar_info_perfil(correo)
        if (response) {
            console.log(response);
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: `Ocurrió un error al listar la información del usuario ${correo}`
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.get('/info/sector/:sector', async (req, res) => {
    try {
        const sector = req.params.sector
        const response = await list.listar_info_sector(sector)
        if (response) {
            console.log(response);
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: `Ocurrió un error al listar información del sector ${sector}`
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.get('/info/reporte/:rid', async (req, res) => {
    try {
        const rid = req.params.rid
        const response = await list.listar_info_reporte(rid)

        if (response) {
            console.log(response);
            res.status(200).json({
                success: true,
                result: response
            })
        } else {
            res.status(401).json({
                success: false,
                message: `Ocurrió un error al listar información del reporte ${rid}`
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.get('/listar/reportes_a_notificar', async (req, res) => {
    try {
        const response = await list.listar_reportes_a_notificar();
        if (response) {
            console.log(response);
            res.status(200).json({
                success: true,
                result: response
            })
        } else if(response == []) {
            res.status(404).json({
                success: true,
                result: response
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        })
    }
})

app.listen(port, () => {
    console.log(`Servidor vivo en puerto: ${port}.`)
})