class GameModel {
    constructor() {
        this.roomId = null;
        this.nickname = null;
        this.opponentNickname = null;
        this.playerScore = 0;
        this.opponentScore = 0;
    }
  
    setRoomId(roomId) {
        this.roomId = roomId;
    }
  
    setNickname(nickname) {
        this.nickname = nickname;
    }
  
    setOpponentNickname(nickname) {
        this.opponentNickname = nickname;
    }
  
    updateScore(winner) {
        if (winner === this.nickname) {
            this.playerScore++;
        } else if (winner === this.opponentNickname) {
            this.opponentScore++;
        }
    }
  
    resetScore() {
        this.playerScore = 0;
        this.opponentScore = 0;
    }
}