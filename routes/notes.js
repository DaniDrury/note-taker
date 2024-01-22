// create notes router
const notes = require('express').Router();
// acquire fsUtilities helper file for reading/writing to file
const { readFromFile, readAndAppend, readAndSplice } = require('../helpers/fsUtils');
// acquire uuid function for creating random ids
const uuid = require('../helpers/uuid');

// GET route for retrieving all notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json','utf8').then((data) => {
    res.json(JSON.parse(data))
  });
});

// POST route for posting new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE route for deleting notes
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to delete a note`);
  readAndSplice(req.params.id, './db/db.json');
  res.json("DELETE Request Called");
});

module.exports = notes;