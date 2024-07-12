document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const model = new GameModel();
    const view = new GameView();
    const controller = new GameController(model, view, socket);
});