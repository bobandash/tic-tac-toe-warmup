const startGameBtn = document.getElementById("start-game")
startGameBtn.addEventListener('click', changeToCharacterScreen)

function changeToCharacterScreen() {
    window.location.href = "character-select.html"
}

/* const gameSettings = () => {
    let versus = document.getElementById("opponent-type");
    let difficulty = document.getElementById("ai-difficulty");
    return {versus, difficulty};
} */