const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const GameController = require('./controllers/GameController');

app.use(express.static('public'));

const gameController = new GameController(io);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('createRoom', (nickname) => gameController.createRoom(socket, nickname));
    socket.on('joinRoom', (data) => gameController.joinRoom(socket, data));
    socket.on('makeMove', (data) => gameController.makeMove(socket, data));
    socket.on('disconnect', () => gameController.handleDisconnect(socket));
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});