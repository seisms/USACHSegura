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

app.get('/tipo-incidentes', (req, res) => {
	list.getTIncidentes()
	  .then((response) => {
		res.status(200).send(response); // Enviar el arreglo como JSON
	  })
	  .catch((error) => {
		res.status(500).send(error);
	  });
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

app.post('/sector-maintain/:op', async (req, res) => {
	const op = req.params.op
	list.maintainSector(op,req.body)
	.then(response => {
			res.status(200).send(response);
		})
	.catch(error => {
			res.status(500).send(error);
		})
})

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
