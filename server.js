const io = require('socket.io')(server);
const app = require('express')();
const server = require('http').Server(app);

server.listen(8080);

app.get('/', (req, res) => {
    res.sendFile('index.html');
})