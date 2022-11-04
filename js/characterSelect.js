//currently the hover over doesn't work because the backgroundColor is changing the css properties inline removeButtonBackgroundcolors
(function() {
    let currPlayer = 1;
    const allCharacterIds = ["watson","gura","mori","kiara","ina"];
    renderCharacterSelect();
    const allCharacters = Array.from(document.querySelectorAll("button"));
    allCharacters.forEach(character => character.addEventListener('click', changeCharacterSelection));

    function renderCharacterSelect() {
        removeCurrCharacterDOM();
        const bigAvatarDiv = document.getElementById("big-avatar");
        const displayText = document.createElement('h1');
        displayText.setAttribute('id','default-big-avatar');
        if(currPlayer === 1) {
            displayText.innerText = `Player 1
            Choose Your Oshi`;
        }
        else if (window.localStorage.getItem("opponent-type") === "ai") {
            displayText.innerText = `AI
            Choose Your Oshi`;           
        }
        else
        {
            displayText.innerText = `Player 2
            Choose Your Oshi`;
        }
        bigAvatarDiv.appendChild(displayText);
    }

    function changeCharacterSelection() {
        if(allCharacterIds.includes(this.id)){
            const currCharacterObj = characterSelectObj(this.id);
            removeCurrCharacterDOM();
            removeButtonBackgroundColor();
            addCurrCharacterDOM(currCharacterObj);
            colorCharacterButtonDOM(currCharacterObj);
            addConfirmButtonDOM();
            addConfirmButtonFunctionality(currCharacterObj);
        }
    }

    function removeCurrCharacterDOM() {
        const allChildren = Array.from(document.querySelectorAll("#big-avatar *"))
        const body = document.querySelector('body');
        allChildren.forEach(child => child.remove());

        //don't know if there's a better way to do
        body.classList = '';
    }

    const characterSelectObj = (id) => {
        let characterName = "";
        let bigAvatarImgSrc =  "hololive-assets/big/" + id + ".png"
        let characterColorClass = id + "-color";
        let backgroundClass = id + "-background";
        switch(id) {
            case "watson":
                characterName = "Amelia Watson";
                break;
            case "gura":
                characterName = "Gawr Gura";
                break;
            case "mori":
                characterName = "Mori Calliope";
                break;
            case "kiara":
                characterName = "Takanashi Kiara";
                break;
            case "ina":
                characterName = "Ninomae Ina'nis";
                break;
        }
        return {id, characterName, bigAvatarImgSrc, characterColorClass, backgroundClass}
    }

    function removeButtonBackgroundColor() {
        const buttons = Array.from(document.querySelectorAll("button"));
        buttons.forEach(button => {
            const characterObj = characterSelectObj(button.id)
            button.classList.remove(characterObj.characterColorClass);
        })
    }

    function addCurrCharacterDOM(currCharacterObj) {
        const body = document.querySelector('body');
        const parentElem = document.getElementById("big-avatar");
        const avatarImg = document.createElement('img');
        const avatarName = document.createElement('h1');

        body.classList.add(currCharacterObj.backgroundClass);
        avatarName.innerText = currCharacterObj.characterName;
        avatarName.setAttribute('id','character-name-text');
        avatarImg.src = currCharacterObj.bigAvatarImgSrc;
        avatarImg.setAttribute('id', 'character-image');
        parentElem.appendChild(avatarName);
        parentElem.appendChild(avatarImg);
    }
    
    function colorCharacterButtonDOM(currCharacterObj) {
        const button = document.getElementById(currCharacterObj.id);
        button.classList.add(currCharacterObj.characterColorClass);
    }

    function addConfirmButtonDOM() {
        const body = document.querySelector("body");
        let confirmButtonDiv = document.getElementById("confirm-selection-div");
        const confirmButton = document.createElement('button');
        if(confirmButtonDiv === null)
        {
            confirmButtonDiv = document.createElement('div');
            confirmButtonDiv.id = "confirm-selection-div";
            confirmButton.id = "confirm-selection-button";
            confirmButton.innerText = "Confirm"
    
            confirmButtonDiv.appendChild(confirmButton);
            body.appendChild(confirmButtonDiv);
        }
    }
    
    function addConfirmButtonFunctionality (currCharacterObj) {
        const confirmButton = document.getElementById('confirm-selection-button');
        confirmButton.addEventListener('click', function () {
            if(currPlayer === 1){
                window.localStorage.setItem("p1name", currCharacterObj.characterName);
                currPlayer = currPlayer + 1;
                grayOutCharacterDOM(currCharacterObj);
                //prevents character from being chosen again
                disableCharacter(currCharacterObj);
                renderCharacterSelect();
            }
            else if(currPlayer === 2) {
                if (currCharacterObj.characterName !== window.localStorage.getItem("p1name")){
                    window.localStorage.setItem("p2name", currCharacterObj.characterName);
                    window.location.href = "game.html"
                }
            }
        })
    }

    //grays out the char select
    function grayOutCharacterDOM(currCharacterObj) {
        let characterButton = document.getElementById(currCharacterObj.id);
        characterButton.setAttribute('id','selected-color');
    }

    function disableCharacter(currCharacterObj) {
        allCharacterIds.splice(currCharacterObj.id, 1);
    }
})();
