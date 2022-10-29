//for player
const player = (name) => {
    let condensedName = getCondensedName(name);
    function getCondensedName(fullName) {
        let condensedName;
        switch(fullName){
            case "Amelia Watson":
                condensedName = "watson";
                break;
            case "Gawr Gura":
                condensedName = "gura";
                break;
            case "Mori Calliope":
                condensedName = "mori";
                break;
            case "Takanashi Kiara":
                condensedName = "kiara";
                break;
            case "Ninomae Ina'nis":
                condensedName = "ina";
                break;
        }
        return condensedName;
    }

    function getBigAvatarSrc() {
        return "hololive-assets/big/" + condensedName + ".png";
    }

    function getCharacterIconSrc() {
        return "hololive-assets/smol/" + condensedName + ".png";
    }

    function makeMove(index) {

    }

    return {makeMove, getBigAvatarSrc, getCharacterIconSrc};
}


const aiPlayer = (name, difficulty) => {
    function makeMove()
    {

    }
}


//shows the current status of the game
const displayController = (() => {

})();


//able to make moves, need to get the image src
//where you place the moves
const Gameboard = (() => {
    const gameboardArray = Array(9).fill('');
    let turnNumber = 1;
    //all local storage variables
    const player1Name = window.localStorage.getItem("p1name");
    const player2Name = window.localStorage.getItem("p2name");
    const opponentType = window.localStorage.getItem("opponent-type");
    const aiDifficulty = window.localStorage.getItem("ai-difficulty");

    //default symbols for array
    const player1ArrayMark = "O";
    const player2ArrayMark = "X";

    let player1 = player(player1Name);
    let player2 = player(player2Name);
/*     if(opponentType === "Player") {
        
    }
    else {
        player2 = aiPlayer(player2Name, aiDifficulty)
    } */

    renderGameDOM();
    
    //inital render of gameboard
    function renderGameDOM() {
        const player1AvatarElem = document.getElementById("player1-avatar");
        const player2AvatarElem = document.getElementById("player2-avatar");
        const gameStatusText = document.getElementById("game-status-text");
        player1AvatarElem.setAttribute('src', player1.getBigAvatarSrc());
        player2AvatarElem.setAttribute('src', player2.getBigAvatarSrc());
        gameStatusText.innerText = `${player1Name}'s Turn`;
    }

    function isValidMove() {

    }

    function addMove() {
        if(isValidMove()) {

        }
    }

    return {addMove};
})();