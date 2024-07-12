class GameView {
    constructor() {
        this.nicknameSelection = document.getElementById('nickname-selection');
        this.nicknameInput = document.getElementById('nickname-input');
        this.setNicknameBtn = document.getElementById('set-nickname');
        this.roomSelection = document.getElementById('room-selection');
        this.waitingScreen = document.getElementById('waiting-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultDiv = document.getElementById('result');
        this.scoreDiv = document.getElementById('score');
        this.choices = document.querySelectorAll('.choice');
        this.createRoomBtn = document.getElementById('create-room');
        this.joinRoomBtn = document.getElementById('join-room-btn');
        this.roomIdInput = document.getElementById('room-id');
        this.roomIdDisplay = document.getElementById('room-id-display');
    }
  
    showRoomSelection() {
        this.nicknameSelection.style.display = 'none';
        this.roomSelection.style.display = 'block';
    }
  
    showWaitingScreen(roomId) {
        this.roomSelection.style.display = 'none';
        this.waitingScreen.style.display = 'block';
        this.roomIdDisplay.textContent = roomId;
    }
  
    showGameScreen() {
        this.waitingScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.roomSelection.style.display = 'none';
    }
  
    updateResult(resultText) {
        this.resultDiv.textContent = resultText;
    }
  
    updateScore(playerNickname, playerScore, opponentNickname, opponentScore) {
        this.scoreDiv.textContent = `Score - ${playerNickname}: ${playerScore}, ${opponentNickname}: ${opponentScore}`;
    }
  
    disableChoices() {
        this.choices.forEach(choice => choice.disabled = true);
    }
  
    enableChoices() {
        this.choices.forEach(choice => choice.disabled = false);
    }
}