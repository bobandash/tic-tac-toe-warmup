function renderGameScreen() {
    
}


//where you place the moves
const Gameboard = (() => {
    const gameboardArray = Array(9).fill('');
    let turnNumber = 1;

    function addMove() {
        gameboardArray
    }



    return {addMove};
})();

//shows the current status of the game
const displayController = (() => {

})();

//able to make moves, need to get the image src
const player = (name) => {
    function getBigAvatarSrc() {
        return "hololive-assets/big/" + name + ".png";
    }

    function getCharacterIconSrc() {
        return "hololive-assets/smol/" + name + ".png";
    }

/*     <button id = "watson"><img src = "hololive-assets/smol/amelia.png"></img></button>
    <button id = "gura"><img src = "hololive-assets/smol/gura.png"></button>
    <button id = "mori"><img src = "hololive-assets/smol/calli.png"></button>
    <button id = "kiara"><img src = "hololive-assets/smol/kiara.png"></button>
    <button id = "ina"><img src = "hololive-assets/smol/ina.png"></button> */

    function makeMove(index) {

    }

    return {getBigAvatarSrc, makeMove};
}

const aiPlayer(name, difficulty) {
    function makeMove()
    {

    }
}

