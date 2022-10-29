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
    let player1 = player(player1Name);
    let player2 = player(player2Name);

    displayController.renderGameDOM(player1, player2);
    allButtons.forEach(button => {
        button.addEventListener('click', addMove, {once: true});
    })


    function isValidMove() {
        return true;
    }

    function addMove() {
        let currPlayer;
        if(isPlayerOneTurn ? currPlayer = player1 : currPlayer = player2); 

        displayController.addCharacterImgToCell(this, currPlayer);
        //need to add character name to gameboardArray
        isPlayerOneTurn = !isPlayerOneTurn;

    }

    function hasWinner(playerObj) {

    }


})();