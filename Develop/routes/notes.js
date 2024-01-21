// create notes router
const notes = require('express').Router();
// acquire fsUtilities helper file for reading/writing to file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


// GET route for retrieving all notes
notes.get('/', (req, res) => {
  console.log(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST route for posting new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, body } = req.body;

  if (req.body) {
    const newNote = {
      title,
      body,
      note_id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;