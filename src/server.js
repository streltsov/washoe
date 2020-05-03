const server = require('http').createServer();
const {createUser, fetchUser, getScheduledWord, addWord} = require('./dbQueries');
const jwt = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
const io = require('socket.io')(server);
require('dotenv').config();

let clients = [];

//setInterval(() => clients.forEach(email => getScheduledWord(email).then(console.log)), 3000);

io.sockets
  .on('connection', onConnection )
  .on('connection', socketioJwt.authorize({secret: process.env.SECRETKEY, timeout: 15000 }) )
  .on('authenticated', onAuthenticated)

//io.clients((error, clients) => {
//  if (error) throw error;
//  console.log(clients);
//});

function onLogIn(client) {
  return async function(userDataJson) {
    const { email, password } = JSON.parse(userDataJson);
    const user = await fetchUser(email);
    if(!user) io.to(client.id).emit('login-error', 'Email doesn\'t exists');
    const isPasswordCorrect = password == user.password;
    if(!isPasswordCorrect) {
      io.to(client.id).emit('login-error', 'Wrong password');
      return;
    }
    const token = jwt.sign({email: user.email}, process.env.SECRETKEY)
    io.to(client.id).emit('token', token);
  }
};

function onSignUp(userDataJson) {
  const userData = JSON.parse(userDataJson);
  const token = jwt.sign({email: userData.email}, process.env.SECRETKEY)
  const sentToken = () => io.to(client.id).emit('token', token);
  createUser(sentToken)(userData);
};

function onConnection (client) {
  console.log('Connected!');
  client
    .on('login', onLogIn(client))
    .on('signup', onSignUp)
};

function onAddWord(email) {
  return function(data) {
    addWord(console.log)({...JSON.parse(data), email});
    console.log('Word: ', data);
  }
}

function onAuthenticated(socket) {
  const { email } = socket.decoded_token;
  clients.push(email);
  socket.on('add word', onAddWord(email));
  socket.on('disconnect', () => {
    clients = clients.filter(el => el != email);
  });
  const sendWord = wordData => io.to(socket.id).emit('word', JSON.stringify(wordData[0]));
  setInterval(() => getScheduledWord('helluva@mail.me').then(sendWord), 3000);
}

function onDisconnect(socket) {
  console.log(`Users Email: ${JSON.stringify(socket.decoded_token.email)}`);
}

server.listen(3000);
