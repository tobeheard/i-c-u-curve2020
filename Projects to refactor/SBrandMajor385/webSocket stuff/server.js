let express = require('express');
let app = express();
let server = app.listen(3000);

app.use(express.static('public'));
console.log('my socket is running');

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', newConnection);
function newConnection(socket){
  console.log('new connection: ' + socket.id);

  socket.on('rocks', rocksMsg);
  function rocksMsg(data){
    socket.broadcast.emit('rocks', data);
    console.log(data);
  }
}
