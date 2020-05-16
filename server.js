const express = require('express');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);
server.use(logger);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


//custom middleware
function logger(req, res, next) {
  // Write custom function
  console.log(req.method);
  next();
}


module.exports = server;
