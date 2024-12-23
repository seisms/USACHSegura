const express = require('express')
const app = express()
const port = 3001

const list = require('./queries.js')

app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

app.get('/listar-sector', (req, res) => {
	list.listar_sectores()
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error =>	{
			res.status(500).send(error);
		})
})

app.post('/sector-maintain/:op', async (req, res) => {
	const op = req.params.op
	list.mantener_sector(op,req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/login', async (req, res) => {
	try{ 
		const response = await list.control_de_acceso(req.body)
		if (response) {
			res.status(200).json({
				success: true,
				data: response
			})
		} else {
			res.status(401).json({
				success: false,
				message: "Usuario/Contraseña equivocados"
			})
		}
	} catch(error) {
		res.status(500).json({
			success: false,
			message: "Error interno del servidor"
		})
	}
})


app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
