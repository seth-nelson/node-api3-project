const express = require('express');
const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);
server.use(logger);
server.use(validateUserId);
server.use(validateUser);
server.use(validatePost);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom logger middleware
function logger(req, res, next) {
  console.log(req.method);
  next();
}

function validateUserId(req, res, next) {
  console.log(req.method);
  next()
}

function validateUser(req, res, next) {
  console.log(req.method);
  next();
}

function validatePost(req, res, next) {
  console.log(req.method);
}


module.exports = server;
