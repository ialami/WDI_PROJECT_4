const socketIo = require('socket.io');

let connection = null;

function connect(server) {
  const io = socketIo(server);
  const nsp = io.of('/socket');

  nsp.on('connection', socket => {
    console.log('connection started');
    socket.on('CHAT', data => socket.broadcast.emit('CHAT', data));
  });

  connection = nsp;
  return connection;
}

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
