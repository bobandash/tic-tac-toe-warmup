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

    function getName() {
        return name;
    }

    function getBigAvatarSrc() {
        return "hololive-assets/big/" + condensedName + ".png";
    }

    function getCharacterIconSrc() {
        return "hololive-assets/smol/" + condensedName + ".png";
    }

    return {getName, getBigAvatarSrc, getCharacterIconSrc};
}


const aiPlayer = (name, difficulty) => {
    function makeMove()
    {

    }
}

//shows the current status of the game
const displayController = (() => {
    //inital render of gameboard
    function renderGameDOM(player1, player2) {
        const player1AvatarElem = document.getElementById("player1-avatar");
        const player2AvatarElem = document.getElementById("player2-avatar");
        const gameStatusText = document.getElementById("game-status-text");
        player1AvatarElem.setAttribute('src', player1.getBigAvatarSrc());
        player2AvatarElem.setAttribute('src', player2.getBigAvatarSrc());
        gameStatusText.innerText = `${player1.getName()}'s Turn`;
    }

    //adds character image to button element
    function addCharacterImgToCell(buttonElem, playerObj) {
        const characterImg = document.createElement('img');
        characterImg.setAttribute('src', playerObj.getCharacterIconSrc());
        characterImg.classList.add('character-icon');
        buttonElem.appendChild(characterImg);
    }

    return {renderGameDOM, addCharacterImgToCell};
})();


//able to make moves, need to get the image src
//where you place the moves
const Gameboard = (() => {
    const gameboardArray = Array(9).fill('');
    const allButtons = Array.from(document.querySelectorAll('#gameboard button'));
    let isPlayerOneTurn = true;

    //all local storage variables
    const player1Name = window.localStorage.getItem("p1name");
    const player2Name = window.localStorage.getItem("p2name");
    //did not add ai features yet
    const opponentType = window.localStorage.getItem("opponent-type");
    const aiDifficulty = window.localStorage.getItem("ai-difficulty");
    const winningCombinations =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    let player1 = player(player1Name);
    let player2 = player(player2Name);

    displayController.renderGameDOM(player1, player2);
    allButtons.forEach((button, index) => {
        button.addEventListener('click', addMove.bind(button, index), {once: true});
    })

    
    function isWinner(playerObj) {

    }

    function addMove(index) {
        let currPlayer;
        if(isPlayerOneTurn ? currPlayer = player1 : currPlayer = player2); 
        gameboardArray[index] = currPlayer.getName();
        displayController.addCharacterImgToCell(this, currPlayer);
        if(isWinner(currPlayer)){

        }
        else {
            changeTurn();
        }
    }


    function changeTurn() {
        isPlayerOneTurn = !isPlayerOneTurn;
    }



})();