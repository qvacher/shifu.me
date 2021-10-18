const game = () => {
  let playerScore = 0;
  let computerScore = 0;

  let Choice = function(properties){
    this.name = properties.name;
    this.counters = properties.counters;
  }

  // Main menu init
  const initGame = () => {
    const regularGame_button = document.getElementById("regular-game");
    const computerGame_button = document.getElementById("computer-game");
    const mainMenu = document.getElementById("main-menu");
    const gameScene = document.getElementById("game-scene");

    // Scene transition to regular game
    regularGame_button.addEventListener("click", () => {
      mainMenu.classList.add("hidden");
      gameScene.classList.add("visible");
      startMatch('regular');
    });
    
    // Scene transition to computer game
    computerGame_button.addEventListener("click", () => {
      mainMenu.classList.add("hidden");
      gameScene.classList.add("visible");
      startMatch('computer');
    });
  };
  
  // Main function that handles the whole game process
  const startMatch = (type) => {
    const buttons = document.querySelectorAll(".choice");
    const startRoundScene = document.getElementById("start-round");
    const selectionScene = document.getElementById("selection-scene");
    const mainMenu = document.getElementById("main-menu");
    const gameScene = document.getElementById("game-scene");
    const nextRound_button = document.getElementById("next-round");
    const stopMatch_button = document.getElementById("stop-match");
    const backMenu_button = document.getElementById("back-menu");
    const p1Score_h4 = document.getElementById("p1");
    const p2Score_h4 = document.getElementById("p2");
    const choices = [
      new Choice ({"name": "paper", "counters" : ["scissors"]}), 
      new Choice ({"name": "scissors", "counters" : ["rock"]}), 
      new Choice ({"name": "rock", "counters" : ["paper"]})
    ];
    let playerChoice;

    if(type === 'regular') {
      // Add Event Lister on every choice button to retrieve the player's choice
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          startRoundScene.classList.add("hidden");
          selectionScene.classList.add("visible");
          stopMatch_button.style.display = 'none';
          
          // Player Choice
          inputChoice = button.getAttribute('data-choice');
          playerChoice = choices.filter(choice => choice.name === inputChoice)[0];

          // Computer choice
          const computerChoice = choices[Math.floor(Math.random() * choices.length)];

          // Here is where we compare the choices
          compareChoices(playerChoice, computerChoice);
        })
      });
    } else {
      startRoundScene.classList.add("hidden");
      selectionScene.classList.add("visible");
      nextRound_button.style.display = 'none';

      // Create an interval to simulate IA vs IA game
      var IAMATCH = setInterval(() => {
        const playerChoice = choices[Math.floor(Math.random() * choices.length)];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        compareChoices(playerChoice, computerChoice);
      }, 2000);
    }
    

    // Refresh the scene to start a new round
    nextRound_button.addEventListener("click", () => {
      startRoundScene.classList.remove("hidden");
      selectionScene.classList.remove("visible");
      startRoundScene.classList.add("visible");
    });

    // Stops an IA vs IA match
    stopMatch_button.addEventListener("click", () => {
      clearInterval(IAMATCH);
    });

    // Refresh the scene and reset the game when going back to main menu
    backMenu_button.addEventListener("click", () => {
      mainMenu.classList.remove("hidden");
      gameScene.classList.remove("visible");
      mainMenu.classList.add("visible");

      startRoundScene.classList.remove("hidden");
      selectionScene.classList.remove("visible");
      startRoundScene.classList.add("visible");

      nextRound_button.style.display = 'block';
      stopMatch_button.style.display = 'block';
      
      // Reset of the score and the scoreboard display
      playerScore = 0;
      computerScore = 0;
      p1Score_h4.innerHTML = playerScore;
      p2Score_h4.innerHTML = playerScore;
    });
  }

  // Compare function to pick a winner
  const compareChoices = (choice1, choice2) => {
    const playerSelection = document.getElementById("player-select");
    const computerSelection = document.getElementById("computer-select");
    const roundStatus = document.getElementById("status");

    // Check if the computer choice counters the player choice
    if(choice1.counters.includes(choice2.name) && choice1.name !== choice2.name){
      roundStatus.innerHTML = 'IA wins 💩';
      updateSelection(playerSelection, choice1.name);
      updateSelection(computerSelection, choice2.name);
      updateScore("p2");
    } else if (!choice1.counters.includes(choice2.name) && choice1.name === choice2.name) {
      updateSelection(playerSelection, choice1.name);
      updateSelection(computerSelection, choice2.name);
      roundStatus.innerHTML = 'Draw 🏳️';
    } else {
      updateSelection(playerSelection, choice1.name);
      updateSelection(computerSelection, choice2.name);
      roundStatus.innerHTML = 'Player wins 🔥';
      updateScore("p1");
    }
  };

  // Update player or computer score
  const updateScore = (player) => {
    const p1Score_h4 = document.getElementById("p1");
    const p2Score_h4 = document.getElementById("p2");

    switch(player) {
      case "p1":
        playerScore++;
        p1Score_h4.innerHTML = playerScore;
        break;
      case "p2":
        computerScore++;
        p2Score_h4.innerHTML = computerScore;
        break;
    }
  };

  // Display the player and computer selections graphically
  const updateSelection = (selectionElement, choice) => {
    // Reset classes
    selectionElement.classList.remove('choice--scissors');
    selectionElement.classList.remove('choice--rock');
    selectionElement.classList.remove('choice--paper');

    // Apply class based on choice
    selectionElement.classList.add(`choice--${choice}`);

    // Would have been worth using images to avoid this switch
    switch(choice) {
      case "rock":
        selectionElement.innerHTML = '✊';
        break;
      case "paper":
        selectionElement.innerHTML = '🖐';
        break;
      case "scissors":
        selectionElement.innerHTML = '✌️';
        break;
    }
  };

  initGame();
}

game();