const server = require('http').createServer();
const io = require('socket.io')(server);
const {createUser} = require('./dbQueries');
const jwt = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
require('dotenv').config();

io.sockets
  .on('connection', client => {
    client.on('signup', userDataJson => {
      const userData = JSON.parse(userDataJson);
      const token = jwt.sign({email: userData.email}, process.env.SECRETKEY)
      const sentToken = () => io.to(client.id).emit('token', token);
      createUser(sentToken)(userData);
    });

    socketioJwt.authorize({secret: process.env.SECRETKEY})(client);

  })
  .on('authenticated', (socket) => {
    console.log(`Users Email: ${JSON.stringify(socket.decoded_token.email)}`);
  });

server.listen(3000);
