(function() {
   const versusOption = document.getElementById("opponent-type");
   const labelsContainer = document.getElementById("labels");
   const selectsContainer = document.getElementById("selects");
   const startGameBtn = document.getElementById("start-game")

   versusOption.addEventListener('change', addDifficultyText);
   startGameBtn.addEventListener('click', function () {
        recordSelections();
        changeToCharacterScreen();
   })

   function recordSelections() {
        const opponentType = document.getElementById('opponent-type').value;
        window.localStorage.setItem("opponent-type", opponentType);
        if (opponentType === "ai") {
            const aiDifficulty = document.getElementById("ai-difficulty").value;
            window.localStorage.setItem("ai-difficulty", aiDifficulty);
        }
   }

   function changeToCharacterScreen() {
       window.location.href = "character-select.html"
   }

   function addDifficultyText() {
        let aiDifficultySelect = document.getElementById("ai-difficulty")
        let aiDifficultyLabel = document.querySelector('label[for="ai-difficulty"]');
        if(this.value === "player") {
            if(aiDifficultyLabel !== null){
                aiDifficultyLabel.remove();
                aiDifficultySelect.remove();
            }
        } else {
            aiDifficultySelect = createAiDifficultySelect();
            aiDifficultyLabel = createAiDifficultyLabel();
            labelsContainer.appendChild(aiDifficultyLabel);
            selectsContainer.appendChild(aiDifficultySelect);
        }
   }

    function createAiDifficultySelect() {
        let aiDifficultySelect = document.createElement('select');
        aiDifficultySelect.setAttribute("name", "ai-difficulty");
        aiDifficultySelect.setAttribute("id", "ai-difficulty");

        let option1 = document.createElement('option');
        option1.innerText = "Easy";
        option1.setAttribute('value','Easy');

        let option2 = document.createElement('option');
        option2.innerText = "Medium";
        option2.setAttribute('value','Medium');

        let option3 = document.createElement('option');
        option3.innerText = "Hard";
        option3.setAttribute('value','Hard');

        aiDifficultySelect.appendChild(option1);
        aiDifficultySelect.appendChild(option2);
        aiDifficultySelect.appendChild(option3);

        return aiDifficultySelect;
    }

    function createAiDifficultyLabel() {
        let aiDifficultyLabel = document.createElement('label');
        aiDifficultyLabel.setAttribute('for', 'ai-difficulty');
        aiDifficultyLabel.innerText = "Difficulty";
        return aiDifficultyLabel;
    }
})();




