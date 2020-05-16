const express = require('express');

const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();



router.post('/', (req, res) => {
  try {
    userDb.insert(req.user)
    .then(() => res.status(201).json(req.user));
  } catch {
    res.status(500).json({ errorMessage: 'There was an error saving the user to the database.' });
  }
});


router.post('/:id/posts', (req, res) => {
  // do your magic!
});


router.get('/', (req, res) => {
  // do your magic!
});


router.get('/:id', (req, res) => {
  // do your magic!
});


router.get('/:id/posts', (req, res) => {
  // do your magic!
});


router.delete('/:id', (req, res) => {
  // do your magic!
});


router.put('/:id', (req, res) => {
  // do your magic!
});



//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

// Validate user 'body'.
// If missing user 'body', 400 status with message: 'missing user data'
// If missing user 'name' parameter, 400 status with message: 'missing required name field'
function validateUser(req, res, next) {
  const user = req.body
  if (user === '') res.status(400).json({ message: 'Missing user data.' });
  else if (user.name === '') res.status(400).json({ message: 'Missing required name field.' });
  else {
    req.user = { ...req.user, ...user }
    next();
  }
}

// Validate post 'body'.
// If missing post 'body', 400 status with message: 'missing post data'
// If missing post 'text' parameter, 400 status with message: 'missing required text field
function validatePost(req, res, next) {
  const post = req.body
  if (post === '') res.status(400).json({ message: 'Missing post data.' })
  else if (post.text === '') res.status(400).json({ message: 'Missing required text field.' })
  else {
    req.user = {...req.post, ...post}
    next();
  }
}



module.exports = router;
module.exports = validateUser;
module.exports = validatePost;
