const express = require('express');

const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();


// HTTP requests ---------------------------------------

router.post('/', validateUser, (req, res) => {
  const newUser = req.body
  users.insert(newUser)
  .then((user => res.status(200).json(user)))
  .catch(() => res.status(400).json({ message: 'Error adding the user to the database.' }))
});


router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body
  posts.insert(newPost)
  .then(post => res.status(200).json(post))
  .catch(() => res.status(400).json({ mesage: 'Error adding the post to the database.'}))
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



//custom middlewares -----------------------------------

// Validate user 'id' parameter.
// If valid, store user obj as 'req.user'.
// If parameter doesn't match, cancel req and 400 w/ message 'invalid user id'
function validateUserId(req, res, next) {
  const { id } = req.params
  users.getById(id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    }
    res.status(400).json({ message: 'Invalid user id.' });
  })
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
