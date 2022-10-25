//currently the hover over doesn't work because the backgroundColor is changing the css properties inline removeButtonBackgroundcolors

const allCharacters = Array.from(document.querySelectorAll("button"));
allCharacters.forEach(character => character.addEventListener('click', changeSelection));

function changeSelection() {
    removeCurrCharacter();
    removeButtonBackgroundcolors();
    addCurrCharacter(this);
    addConfirmButton();
    addConfirmButtonFunctionality();
}

function removeCurrCharacter() {
    const allChildren = Array.from(document.querySelectorAll("#big-avatar *"))
    allChildren.forEach(child => child.remove());
}

function removeButtonBackgroundcolors() {
    const buttons = Array.from(document.querySelectorAll("button"));
    buttons.forEach(button => {
        if(button.style.backgroundColor != "gray" || button.style.backgroundColor != "white")
            button.style.backgroundColor = "white";
    })
}

function revertBackgroundColor(button) {
    button.style.backgroundColor = "white";
}


function addCurrCharacter(button) {
    const imageId = button.id;
    const parentElem = document.getElementById("big-avatar");
    const avatarImg = document.createElement('img');
    const avatarName = document.createElement('h1');
    switch(imageId) {
        case 'watson':
            avatarName.innerText = "Amelia Watson";
            button.style.backgroundColor = "yellow";
            break;
        case 'gura':
            avatarName.innerText = "Gawr Gura";
            button.style.backgroundColor = "blue";
            break;
        case 'mori':
            avatarName.innerText = "Calliope Mori";
            button.style.backgroundColor = "pink";
            break;
        case 'kiara':
            avatarName.innerText = "Kiara Takanashi";
            button.style.backgroundColor = "red";
            break;
        case 'ina':
            avatarName.innerText = "Ninomae Ina'nis";
            button.style.backgroundColor = "purple";
            break;
    }
    avatarImg.src = "hololive-assets/big/" + imageId + ".png"
    avatarImg.setAttribute('id', "character-image");
    avatarName.setAttribute('id', "character-name-text");
    parentElem.appendChild(avatarName);
    parentElem.appendChild(avatarImg);
}


function addConfirmButton() {
    const body = document.querySelector("body");
    let confirmButtonDiv = document.getElementById("confirm-selection-div");
    if(confirmButtonDiv === null)
    {
        confirmButtonDiv = document.createElement('div');
        confirmButtonDiv.id = "confirm-selection-div";
        confirmButton = document.createElement('button');
        confirmButton.id = "confirm-selection-button";
        confirmButton.innerText = "Confirm"

        confirmButtonDiv.appendChild(confirmButton);
        body.appendChild(confirmButtonDiv);
    }
}

function addConfirmButtonFunctionality () {
    const confirmButton = document.getElementById('confirm-selection-button');
    confirmButton.addEventListener('click', confirmPlayer)
}

function confirmPlayer() {
    window.location.href = "game.html"
}