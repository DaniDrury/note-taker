// acquire express tools
const express = require('express');
const path = require('path');

// create routes variables
const api = require('./routes/index.js');

// set defult PORT
const PORT = process.env.PORT || 3001;

// initialize express
const app = express();

// middleware
// for handling json data requests
app.use(express.json());
// for handling url requests
app.use(express.urlencoded({ extended: true }));
// for handling api requests
app.use('/api', api);
// for setting static requests
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for /notes
app.get('/notes', (req, res) =>
	res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// initiates port listening
app.listen(PORT, () =>
	console.log(`App listening at http://localhost:${PORT}`)
);