const server = require('http').createServer();
const {pool} = require('./db');
const io = require('socket.io')(server);
require('dotenv').config();

io.on('connection', client => {
  console.log('Connected');
  client.on('signup', msg => console.log('signup: ' + msg));
  client.on('login', msg => console.log('login: ' + msg));
  client.on('disconnect', () => console.log('Disconnected'));
});
server.listen(3000);
