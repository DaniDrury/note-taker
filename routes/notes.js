// create notes router
const notes = require('express').Router();
// acquire fsUtilities helper file for reading/writing to file
const { readFromFile, readAndAppend, readAndSplice } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// GET route for retrieving all notes
notes.get('/', (req, res) => {
  console.log(`${req.method} request received for notes`);
  readFromFile('./db/db.json','utf-8').then((data) => {
    res.json(JSON.parse(data))
  });
});

// POST route for posting new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  // console.log(req.body);

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

  readAndSplice(req.params.id, './db/db.json');
  res.json("DELETE Request Called");
});

module.exports = notes;