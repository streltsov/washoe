const server = require('http').createServer();
const {createUser, fetchUser, getScheduledWord, addWord, updateStage} = require('./dbQueries');
const jwt = require('jsonwebtoken');
const socketioJwt = require('socketio-jwt');
const io = require('socket.io')(server);
require('dotenv').config();

io.sockets
  .on('connection', onConnection )
  .on('connection', socketioJwt.authorize({secret: process.env.SECRETKEY, timeout: 3000 }) )
  .on('authenticated', onAuthenticated)

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

function onSignUp(client) {
  return async function(userDataJson) {
    const userData = JSON.parse(userDataJson);
    const token = jwt.sign({email: userData.email}, process.env.SECRETKEY)
    const sentToken = () => io.to(client.id).emit('token', token);
    createUser(sentToken)(userData);
  }
};

function onConnection (client) {
  console.log('Connected!');
  client
    .on('login', onLogIn(client))
    .on('signup', onSignUp(client))
};

function onAddWord(email) {
  return function(data) {
    console.log('Word: ', data);
    addWord(console.log)({...JSON.parse(data), email});
  }
}

function onAuthenticated(socket) {
  console.log('Auth socket: ', socket.decoded_token.email);

  const { email } = socket.decoded_token;

  socket
    .on('add word', onAddWord(email))
    .on('notification-response', res => {
      const { type, ...word } = JSON.parse(res);
      console.log('Type: ', type);
      console.log('Word: ', word);
      console.log('Updating word...');
      type == 'stageup' ? updateStage(word) : console.log('on reset word')
    });

  const sendWord = wordData => io.to(socket.id).emit('word', JSON.stringify(wordData[0]));
  const loop = setInterval(() => {
    console.count('Check words');
    getScheduledWord(email).then(res => {
      if(res.length != 0) {
        sendWord(res)
        console.count(`Pushed to ${email}`);
      }
    });
  }, 120000);

  socket.on('disconnect', () => clearInterval(loop))
}

server.listen(3000);
