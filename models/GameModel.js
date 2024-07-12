class GameModel {
    constructor() {
        this.rooms = new Map();
    }
  
    createRoom(roomId, player) {
        this.rooms.set(roomId, [player]);
    }
  
    joinRoom(roomId, player) {
        if (this.rooms.has(roomId)) {
            this.rooms.get(roomId).push(player);
            return true;
        }
        return false;
    }
  
    getRoom(roomId) {
        return this.rooms.get(roomId);
    }
  
    removePlayerFromRoom(roomId, playerId) {
        if (this.rooms.has(roomId)) {
            const room = this.rooms.get(roomId);
            const index = room.findIndex(p => p.id === playerId);
            if (index !== -1) {
            room.splice(index, 1);
            if (room.length === 0) {
                this.rooms.delete(roomId);
            }
            return true;
            }
        }
        return false;
    }
  
    determineWinner(move1, move2) {
        if (move1 === move2) return 'tie';
        if (
            (move1 === 'rock' && move2 === 'scissors') ||
            (move1 === 'paper' && move2 === 'rock') ||
            (move1 === 'scissors' && move2 === 'paper')
        ) {
            return 'player1';
        }
        return 'player2';
    }
}
  
module.exports = GameModel;