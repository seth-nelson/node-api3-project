const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});


// custom middleware --------------------------------------

function validatePostId(req, res, next) {
  // do your magic!
  console.log(req.method);
  next();
}

module.exports = router;
