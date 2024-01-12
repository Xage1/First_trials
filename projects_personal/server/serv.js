const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/products', (req, res) => {

	const db = new sqlite3.Database(':memory:');


	db.all('SELECT * FROM products', (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}

		res.join({ products: rows });
	});

	db.close();
});

app.listen(port, () => {
	console.log('Server is runnig on http://localhost:@{port}');
});
