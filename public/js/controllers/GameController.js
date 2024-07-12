class GameController {
    constructor(model, view, socket) {
        this.model = model;
        this.view = view;
        this.socket = socket;
    
        this.view.setNicknameBtn.addEventListener('click', () => this.setNickname());
        this.view.createRoomBtn.addEventListener('click', () => this.createRoom());
        this.view.joinRoomBtn.addEventListener('click', () => this.joinRoom());
        this.view.choices.forEach(choice => {
            choice.addEventListener('click', (e) => this.makeMove(e.target.dataset.choice));
        });
    
        this.socket.on('roomCreated', (data) => this.handleRoomCreated(data));
        this.socket.on('gameStart', (data) => this.handleGameStart(data));
        this.socket.on('gameResult', (data) => this.handleGameResult(data));
        this.socket.on('opponentLeft', () => this.handleOpponentLeft());
        this.socket.on('roomFull', () => alert('The room is full. Please try another room.'));
        this.socket.on('roomNotFound', () => alert('Room not found. Please check the room ID and try again.'));
    }
  
    setNickname() {
        const nickname = this.view.nicknameInput.value.trim();
        if (nickname) {
            this.model.setNickname(nickname);
            this.view.showRoomSelection();
        }
    }
  
    createRoom() {
        this.socket.emit('createRoom', this.model.nickname);
    }
  
    joinRoom() {
        const roomId = this.view.roomIdInput.value.trim().toUpperCase();
        if (roomId) {
            this.socket.emit('joinRoom', { roomId, nickname: this.model.nickname });
        }
    }
  
    makeMove(move) {
        this.socket.emit('makeMove', { roomId: this.model.roomId, move });
        this.view.disableChoices();
        this.view.updateResult('Waiting for opponent...');
    }
  
    handleRoomCreated(data) {
        this.model.setRoomId(data.roomId);
        this.view.showWaitingScreen(data.roomId);
    }
  
    handleGameStart(data) {
        this.model.setRoomId(data.roomId);
        this.model.setOpponentNickname(data.player1 === this.model.nickname ? data.player2 : data.player1);
        this.view.showGameScreen();
        this.view.updateResult('Game started! Make your move.');
        this.updateScore();
    }
  
    handleGameResult(data) {
        const { result, moves } = data;
        const playerMove = moves[this.model.nickname];
        const opponentMove = moves[this.model.opponentNickname];
        
        let resultText = `You (${this.model.nickname}) chose ${playerMove}. ${this.model.opponentNickname} chose ${opponentMove}. `;
        
        if (result === 'tie') {
            resultText += "It's a tie!";
        } else if ((result === 'player1' && this.model.nickname === Object.keys(moves)[0]) || 
                    (result === 'player2' && this.model.nickname === Object.keys(moves)[1])) {
            resultText += "You win!";
            this.model.updateScore(this.model.nickname);
        } else {
            resultText += `${this.model.opponentNickname} wins!`;
            this.model.updateScore(this.model.opponentNickname);
        }
        
        this.view.updateResult(resultText);
        this.updateScore();
        this.view.enableChoices();
    }
    
    handleOpponentLeft() {
        this.view.updateResult(`${this.model.opponentNickname} left the game. Waiting for a new opponent...`);
        this.view.showWaitingScreen(this.model.roomId);
        this.model.resetScore();
        this.model.setOpponentNickname(null);
    }
    
    updateScore() {
        this.view.updateScore(this.model.nickname, this.model.playerScore, this.model.opponentNickname, this.model.opponentScore);
    }
}