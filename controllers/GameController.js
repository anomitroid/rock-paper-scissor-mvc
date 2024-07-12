const GameModel = require('../models/GameModel');

class GameController {
    constructor(io) {
        this.io = io;
        this.gameModel = new GameModel();
    }

    createRoom(socket, nickname) {
        const roomId = this.generateRoomId();
        this.gameModel.createRoom(roomId, { id: socket.id, nickname, move: null });
        socket.join(roomId);
        socket.emit('roomCreated', { roomId, nickname });
    }

    joinRoom(socket, { roomId, nickname }) {
        if (this.gameModel.joinRoom(roomId, { id: socket.id, nickname, move: null })) {
        socket.join(roomId);
        const room = this.gameModel.getRoom(roomId);
        const [player1, player2] = room;
        this.io.to(roomId).emit('gameStart', { roomId, player1: player1.nickname, player2: player2.nickname });
        } else {
        socket.emit('roomNotFound');
        }
    }

    makeMove(socket, { roomId, move }) {
        const room = this.gameModel.getRoom(roomId);
        if (room) {
        const player = room.find(p => p.id === socket.id);
        if (player) {
            player.move = move;

            if (room[0].move && room[1].move) {
            const result = this.gameModel.determineWinner(room[0].move, room[1].move);
            this.io.to(roomId).emit('gameResult', {
                result,
                moves: {
                [room[0].nickname]: room[0].move,
                [room[1].nickname]: room[1].move
                }
            });
            room[0].move = null;
            room[1].move = null;
            }
        }
        }
    }

    handleDisconnect(socket) {
        for (const [roomId, players] of this.gameModel.rooms) {
        if (this.gameModel.removePlayerFromRoom(roomId, socket.id)) {
            this.io.to(roomId).emit('opponentLeft');
            break;
        }
        }
    }

    generateRoomId() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }
}

module.exports = GameController;