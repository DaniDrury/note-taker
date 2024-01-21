const router = require('express').Router();

// import modular router for notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;