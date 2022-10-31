//made public so both gameboard and displaycontroller can call game state
const GAME_STATE = {
    PLAYING: "Playing",
    TIE: "Tie",
    WIN: "Win"
};

const WINNING_COMBINATIONS =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//for player
const player = (name) => {
    let condensedName = getCondensedName(name);
    let score = 0;
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

    function getName() {
        return name;
    }

    function getBigAvatarSrc() {
        return "hololive-assets/big/" + condensedName + ".png";
    }

    function getCharacterIconSrc() {
        return "hololive-assets/smol/" + condensedName + ".png";
    }

    function getScore() {
        return score;
    }

    function incrementScore() {
        score = score + 1;
    }

    function isAi() {
        return false;
    }

    return {getName, getBigAvatarSrc, getCharacterIconSrc, getScore, incrementScore, isAi};
}


const aiPlayer = (name, difficulty) => {
    const prototype = player(name);
    //should just return the index of the array with the best move
    function makeMove(gameBoardArray)
    {
        switch(difficulty){
            case "Easy":
                return easyAIMove(gameBoardArray);
            case "Medium":
                return mediumAIMove(gameBoardArray);
            case "Hard":
                return hardAIMove(gameBoardArray);
        }
    }

    //easy ai is find the closest empty cell in the gameboard array
    function easyAIMove(gameBoardArray) {
        let firstEmptyIndex;
        for(let i = 0; i < gameBoardArray.length; i++) {
            if(gameBoardArray[i] === '') {
                firstEmptyIndex = i;
                break;
            }
        }
        return firstEmptyIndex;
    }

    //medium ai is:
    //if the ai is going to win, place the mark
    //if the other player is going to win, find one and block it
    //otherwise, find the closest empty cell in the gameboard array
    //use the array methods to make less confusing
    function mediumAIMove(gameboardArray) {
        let moveIndex = '';
        //check almost won for ai
        if(checkAlmostWon(true, gameboardArray)){
            moveIndex = getSuboptimalMove(true, gameboardArray);
        }
        //check almost won for player
        else if(checkAlmostWon(false, gameboardArray)) {
            moveIndex = getSuboptimalMove(false, gameboardArray);
        }
        else{
            moveIndex = easyAIMove(gameboardArray);;
        }
        return moveIndex;
    }

    function checkAlmostWon(isAiPlayer, gameboardArray){
        let almostWon = false;
        WINNING_COMBINATIONS.forEach(winningCombination => {
            let currPlayerMovesCounter = 0;
            let emptyCellsCounter = 0;
            winningCombination.forEach(cell => {
                if(gameboardArray[cell] === ''){
                    emptyCellsCounter++;
                }
                else if(gameboardArray[cell] !== '') {
                    if(isAiPlayer && gameboardArray[cell] === name)
                        currPlayerMovesCounter++;
                    else if(!isAiPlayer && gameboardArray[cell] !== name)
                        currPlayerMovesCounter++;
                }
                if(emptyCellsCounter === 1 && currPlayerMovesCounter === 2){
                    almostWon = true;
                }
            })
        })
        return almostWon;
    }

    //basically what is going on right now is that this isn't considering tiles in the middle
    //and does not consider if there's already the player avatar inside the gameboard array
    function getSuboptimalMove(isAiPlayer, gameboardArray){
        let suboptimalMoveIndex;
        WINNING_COMBINATIONS.forEach(winningCombination => {
            let currPlayerMovesCounter = 0;
            let emptyCellsCounter = 0;
            let emptyCellIndex;
            winningCombination.forEach(cell => {
                if(gameboardArray[cell] === ''){
                    emptyCellsCounter++;
                    emptyCellIndex = cell;
                }
                else if(gameboardArray[cell] !== '') {
                    if(isAiPlayer && gameboardArray[cell] === name)
                        currPlayerMovesCounter++;
                    else if(!isAiPlayer && gameboardArray[cell] !== name)
                        currPlayerMovesCounter++;
                }
            })

            if(currPlayerMovesCounter == 2 && emptyCellsCounter == 1){
                suboptimalMoveIndex = emptyCellIndex;
            }
        })  
        return suboptimalMoveIndex;
    }

    //minimax algorithm, impossible to win
    function hardAIMove(gameboardArray) {

    }

    function isAi(){
        return true;
    }

    return Object.assign({}, prototype, {makeMove, isAi});
}

//shows the current status of the game
const displayController = (() => {

    //inital render of gameboard
    function renderGameDOM(player1, player2) {
        const player1AvatarElem = document.getElementById("player1-avatar");
        const player2AvatarElem = document.getElementById("player2-avatar");
        const gameStatusText = document.getElementById("game-status-text");
        const allImgElemInCells = Array.from(document.querySelectorAll("#gameboard button img"));
        player1AvatarElem.setAttribute('src', player1.getBigAvatarSrc());
        player2AvatarElem.setAttribute('src', player2.getBigAvatarSrc());
        gameStatusText.innerText = `${player1.getName()}'s Turn`;
        //need to ensure that all images/homepage and reset button previous in tic tac toe gone
        allImgElemInCells.forEach(imgSrcElem => {
            imgSrcElem.remove();
        })
        removeHomeNewGameBtnsDOM();
    }

    function removeHomeNewGameBtnsDOM() {
        const homeBtn = document.getElementById('home-btn');
        const newGameBtn = document.getElementById('new-game-btn');
        if (homeBtn !== null && newGameBtn !== null) {
            homeBtn.remove();
            newGameBtn.remove();
        }
    }

    function addHomeNewGameBtnsDOM() {
        const parentDiv = document.getElementById('buttons-div');
        const homeBtn = document.createElement('button');
        homeBtn.setAttribute('id','home-btn');
        const newGameBtn = document.createElement('button');
        newGameBtn.setAttribute('id','new-game-btn');
        homeBtn.innerText = "Home";
        newGameBtn.innerText = "New Game";

        parentDiv.appendChild(homeBtn);
        parentDiv.appendChild(newGameBtn);
    }

    //adds character image to button element
    function addCharacterImgToCell(buttonElem, playerObj) {
        const characterImg = document.createElement('img');
        characterImg.setAttribute('src', playerObj.getCharacterIconSrc());
        characterImg.classList.add('character-icon');
        buttonElem.appendChild(characterImg);
    }

    function changeHeaderText(gameState, playerObj) {
        const gameStatusText = document.getElementById("game-status-text");
        switch(gameState){
            case GAME_STATE.PLAYING:
                gameStatusText.innerText = `${playerObj.getName()}'s Turn`;                
                break;
            case GAME_STATE.TIE:
                gameStatusText.innerText = `Tie Game`;      
                break;
            case GAME_STATE.WIN:
                gameStatusText.innerText = `${playerObj.getName()} Wins`;
                break;
        }
    }


    return {renderGameDOM, addCharacterImgToCell, changeHeaderText, addHomeNewGameBtnsDOM};
})();


//able to make moves, need to get the image src
//where you place the moves
const Gameboard = (() => {
    const gameboardArray = Array(9).fill('');
    let allButtons = Array.from(document.querySelectorAll('#gameboard button'));
    let isPlayerOneTurn = true;

    //all local storage variables
    const player1Name = window.localStorage.getItem("p1name");
    const player2Name = window.localStorage.getItem("p2name");
    //did not add ai features yet
    const opponentType = window.localStorage.getItem("opponent-type");
    const aiDifficulty = window.localStorage.getItem("ai-difficulty");

    let player1 = player(player1Name);
    let player2;
    if(opponentType === 'ai' ? player2 = aiPlayer(player2Name, aiDifficulty) : player2 = player(player2Name));

    initializeGame();

    function initializeGame() {
        displayController.renderGameDOM(player1, player2);
        //adds functionality to all cells in tic tac toe game
        isPlayerOneTurn = true;
        gameboardArray.fill('');
        allButtons = Array.from(document.querySelectorAll('#gameboard button'));
        allButtons.forEach((button, index) => {
            button.addEventListener('click', addMove.bind(button, index), {once: true});
        })
    }

    function addMove(index) {
        let currPlayer;
        let otherPlayer;

        if(isPlayerOneTurn) {
            currPlayer = player1;
            otherPlayer = player2;
        } 
        else {
            currPlayer = player2;
            otherPlayer = player1;
        }

        gameboardArray[index] = currPlayer.getName();
        displayController.addCharacterImgToCell(this, currPlayer);
        if(isWinner(currPlayer)){
            displayController.changeHeaderText(GAME_STATE.WIN, currPlayer);
            endGame();
            currPlayer.incrementScore();
        }
        else if(isTie()) {
            displayController.changeHeaderText(GAME_STATE.TIE, currPlayer);
            endGame();
        }
        else {
            changeTurn();
            displayController.changeHeaderText(GAME_STATE.PLAYING, otherPlayer);
            //issue is that you can click other buttons in the .2 seconds
            if(otherPlayer.isAi()){
                allButtons[otherPlayer.makeMove(gameboardArray)].click();
            }
        }
    }

    function isWinner(playerObj) {
        const playerName = playerObj.getName();
        let hasWon = false;
        WINNING_COMBINATIONS.forEach(winningCombination => {
            if(winningCombination.every(checkCellIndex)){
                hasWon = true;
            }
        })
        function checkCellIndex(index) {
            return gameboardArray[index] === playerName;
        }
        return hasWon;
    }

    function isTie() {
        return !(gameboardArray.includes(''));
    }

    function changeTurn() {
        isPlayerOneTurn = !isPlayerOneTurn;
    }

    function endGame() {
        removeAllButtonEventListeners();
        displayController.addHomeNewGameBtnsDOM();
        addHomeNewGameBtnsEventListeners();

    }

    function removeAllButtonEventListeners() {
        allButtons.forEach(button => {
            let new_element = button.cloneNode(true);
            button.parentNode.replaceChild(new_element, button);
        })
    }

    function addHomeNewGameBtnsEventListeners() {
        const homeBtn = document.getElementById('home-btn');
        const newGameBtn = document.getElementById('new-game-btn');
        homeBtn.addEventListener('click', navHomePage);
        newGameBtn.addEventListener('click', newGame);
    }

    function navHomePage() {
        window.location.href = "homepage.html";
    }

    function newGame() {
        initializeGame();
    }

})();