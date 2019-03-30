const io = require('socket.io')(server);
const app = require('express')();
const server = require('http').Server(app);

server.listen(8080);

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

io.on('connection', function (socket) {
    socket.emit('FACK', { hello: 'friends' });
    socket.on('SCRAP', function (data) {
        console.log(data);
    });

    socket.on('fromClient', function (data) {
        console.log('data from client', data);
        socket.broadcast.emit('FACK', data);
    });
});