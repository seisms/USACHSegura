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

app.get('/', (req, res) => {
	list.getUsers()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error =>	{
			res.status(500).send(error);
	})
})

app.post('/sector-maintain', async (req, res) => {
	list.maintainSector(req.body)
	.then(response => {
			res.status(200).send(response);
		})
	.catch(error => {
			res.status(500).send(error);
		})
})

app.post('/registrar-reporte', async (req, res) => {
	try{
		const result = await list.addReporte(req.body); //Guardo el resultado la funcion addReporte (id del nuevo reporte)
		console.log(result);
		res.status(200).json({ rep_id: result }); //Se envia el dato como un unico elemento, ya que enviar solo 'result' produce un objeto json
	} catch{
		res.status(500).send("No results found");
	}
})

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
