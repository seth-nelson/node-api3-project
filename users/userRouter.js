const express = require('express');

const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();


// HTTP requests ---------------------------------------

// POST new user using the .insert() db function
router.post('/', validateUser, (req, res) => {
  const newUser = req.body
  users.insert(newUser)
  .then((user => res.status(200).json(user)))
  .catch(() => res.status(400).json({ message: 'Error adding the user to the database.' }))
});


// Post a new post by user id using the .insert(user) db function
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body
  posts.insert(newPost)
  .then(post => res.status(200).json(post))
  .catch(() => res.status(400).json({ mesage: 'Error adding the post to the database.'}))
});


// GET users using .get() db function
router.get('/', (req, res) => {
  users.get()
  .then(users => res.status(200).json(users))
  .catch(() => res.status(400).json({ message: 'The users could not be retrieved from the database.' }))
});


// Get users by id using the .getById(id) db function
router.get('/:id', validateUserId, (req, res) => {
  if (req.user) res.status(200).json(req.user)
  else {
    res.status(400).json({ message: 'The users could not be retrieved from the database.' })}
});


// GET posts by user id using the .getUserPosts(userId) db function
router.get('/:id/posts', validateUserId, (req, res) => {
  const user = req.body
  user.getUserPosts(user.id)
  .then(userPosts => res.status(200).json(userPosts))
  .catch(() => res.status(400).json({message: 'The user posts could not be retrieved.'}))
});


// DELETE user by id using the .remove(id) db function
router.delete('/:id', (req, res) => {
  const user = req.body
  user.remove(user)
  .then(userId => {
    if (userId.length === 0) res.status(400).json({message: 'The user could not be deleted from the database.' })
    else res.status(200).json({message: 'The user had been deleted from the database.' })
  })
});


// PUT changes to a user by id using .update(id, changes) db function
router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id } = req.params
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
