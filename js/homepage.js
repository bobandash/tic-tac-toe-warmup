(function() {
   const versusOption = document.getElementById("opponent-type");
   const startGameBtn = document.getElementById("start-game")

   versusOption.addEventListener('change', addDifficultyText);
   startGameBtn.addEventListener('click', function () {
        recordSelections();
        changeToCharacterScreen();
   })

   function recordSelections() {
        const opponentType = document.getElementById('opponent-type').value;
        localStorage.setItem("opponent-type", opponentType);
        if (opponentType === "ai") {
            const aiDifficulty = document.getElementById("ai-difficulty").value;
            window.localStorage.setItem("ai-difficulty", aiDifficulty);
        }
   }

   function changeToCharacterScreen() {
       window.location.href = "character-select.html"
   }

   function addDifficultyText() {
        const aiDifficultySelect = document.getElementById("ai-difficulty")
        const aiDifficultyLabel = document.querySelector('label[for="ai-difficulty"]');
        if(this.value === "player") {
            aiDifficultySelect.classList.add('hidden');
            aiDifficultyLabel.classList.add('hidden');
        } else {
            aiDifficultySelect.classList.remove('hidden');
            aiDifficultyLabel.classList.remove('hidden');
        }
   }
})();




