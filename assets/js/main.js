window.addEventListener("DOMContentLoaded", main);

function main() {
  restartGame();
  saveGameState();
  loadGameState();
  removeGameState();
  updateScene();
  pickUpItem();
  dropItem();
  handleButtonClick();
  updateInventoryDisplay();
}

// Initial scene index to track where we are in the story
let currentScene = 0;
let inventory = [];

// Scenes array with different scenes, each with text and button options
const scenes = [
  // 0
  {
    text: "Welcome to your very own little Island Adventure! Safe from harm on your device. Click Start to begin your adventure!",
    buttonText1: "Start",
    isStart: true,
    nextSceneButton1: 1,
    image: "assets/images/start-scene.png",
  },
  // 1
  {
    text: "You have just washed ashore on a beach somewhere out in the ocean. You look around to see if you can find anyone else here. You see no one. Just beach and dense jungle ahead...",
    buttonText1: "Look around a bit",
    buttonText2: "Break down and cry",
    nextSceneButton1: 2,
    nextSceneButton2: 3,
    image: "assets/images/beach.jpg",
  },
  // 2
  {
    text: "You find a water bottle that must have washed ashore along with you! It's empty. You realize you will need to enter the jungle in order to find food, water and shelter to survive, but there could be dangers in there....",
    buttonText1: "Go to Jungle",
    buttonText2: "Stay on the Beach",
    nextSceneButton1: 5,
    nextSceneButton2: 3,
    items: ["Water bottle"],
    image: "assets/images/bottle.png",
  },
  // 3
  {
    text: "You decide to sit on the beach and hope to be rescued soon....",
    buttonText1: "Hope for the best...",
    nextSceneButton1: 4,
    image: "assets/images/sit.jpg",
  },
  // 4
  {
    text: "OH NO! You get stung by something venomous in the sand!!!! You died.....",
    buttonText1: "Play Again?",
    buttonText2: "No More please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/sand.jpg",
  },
  // 5
  {
    text: "Just as you turn to the jungle you see something sparkle by your feet. A beautiful pearl! You pick it up. Who knows, it might come in handy....",
    buttonText1: "Continue to jungle",
    buttonText2: "Stay on the Beach",
    nextSceneButton1: 6,
    nextSceneButton2: 3,
    items: ["Pearl"],
    image: "assets/images/pearl.png",
  },
  // 6
  {
    text: "You are walking in the jungle in search for water and food and you are met with a HUUUUUUGE tree! You will have to go around it. Do you take the right path around? Or the left?",
    buttonText1: "Take the left path",
    buttonText2: "Take the right path",
    nextSceneButton1: 8,
    nextSceneButton2: 7,
    image: "assets/images/jungle.jpg",
  },
  // 7
  {
    text: "OH NO! You come face to face with a scary looking snake! You try to scare it away but it bites you instead. You died.....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/snake.jpg",
  },
  // 8
  {
    text: "You see a friendly looking monkey sitting on a log on the ground and decide to talk to it. Who knows, it might be able to talk!",
    buttonText1: "Ask monkey for directions",
    buttonText2: "Monkeys can't talk, I'll find my own way",
    nextSceneButton1: 9,
    nextSceneButton2: 10,
    image: "assets/images/monkey.jpg",
  },
  // 9
  {
    text: "You arrive at a beautiful waterfall that runs into a river where you can fill your water bottle! NICE! You shall not die of thirst today! Now you just need some food and shelter.....",
    buttonText1: "Look for food",
    buttonText2: "Shelter is more important right now",
    nextSceneButton1: 11,
    nextSceneButton2: 16,
    image: "assets/images/fresh-water.jpg",
  },
  // 10
  {
    text: "OH NO!!! You run into a HUUUUGE gorilla with babies!!! He kills you..... you died..",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 17,
    image: "assets/images/gorilla.jpg",
  },
  // 11
  {
    text: "You see two pretty parrots and think about asking them where you can find some food. The monkey could talk, so why not the parrots too, right...?",
    buttonText1: "Parrot 1 says left",
    buttonText2: "Parrot 2 says right",
    buttonText3: "I'll just eat the parrots...",
    nextSceneButton1: 13,
    nextSceneButton2: 13,
    nextSceneButton3: 12,
    image: "assets/images/parrots.png",
    size: { width: "100%", height: "auto" },
  },

  // 12
  {
    text: "OH NO!! The parrots friends knows you want to eat them so they all take flight and attack you!!!! You died....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 17,
    image: "assets/images/many-birds.png",
  },
  // 13
  {
    text: "You see some coconuts in a tree! NICE! Now you just need to get them..... ",
    buttonText1: "Climb up and get them",
    buttonText2: "Not risking a fall... look for shelter",
    nextSceneButton1: 14,
    nextSceneButton2: 16,
    image: "assets/images/climb.jpg",
    // allowPutDown: true,
    showPutDownButton: false, // Do not show the "Put Down" button here
  },
  // 14
  {
    text: "NICE! Coconuts! Pick one and carefully climb down",
    buttonText1: "Carefully climb down",
    buttonText2: "I got this jungle shit, I feel like Tarzan!",
    nextSceneButton1: 15,
    nextSceneButton2: 17,
    items: ["coconut"],
    image: "assets/images/coconuts.jpg",
    // allowPutDown: true,
    showPutDownButton: false, // Do not show the "Put Down" button here
  },
  // 15
  {
    text: "You now have food and water, time to look for shelter!",
    buttonText1: "Head back to beach",
    buttonText2: "Head back to waterfall",
    nextSceneButton1: 18,
    nextSceneButton2: 20,
    image: "assets/images/jungle.jpg",
  },
  // 16
  {
    text: "You now have water but no food.... time to look for shelter!",
    buttonText1: "Head back to beach",
    buttonText2: "Look around by the waterfall",
    nextSceneButton1: 18,
    nextSceneButton2: 19,
    image: "assets/images/jungle.jpg",
  },
  // 17
  {
    text: "You slip and fall aaaaall the way down and hit your head.... you died....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/fall.jpg",
  },
  // 18
  {
    text: "You found a hidden cave by the beach!! But whats that at the entrance...? A crab??? ",
    buttonText1: "Walk past crab",
    buttonText2: "I'll just eat the crab....",
    nextSceneButton1: 20,
    nextSceneButton2: 21,
    image: "assets/images/cave.jpg",
  },
  // 19
  {
    text: "OH NO!!!!! You stepped in a sticky mud hole by the waterfall river and can't get out! You are sinking, SINKIIIIING!!!! Your died.....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/mud.png",
  },
  // 20
  {
    text: "The crab does not want to let you into it's cave! How rude. Maybe you have something pretty to give the crab to buy your way into it's cave.....",
    buttonText1: "Give pearl to crab",
    buttonText2: "The pearl is mine!!!!",
    nextSceneButton1: 22,
    nextSceneButton2: 23,
    image: "assets/images/crab.jpg",
    showPutDownButton: true, // Show the "Put Down" button in this scene
  },
  // 21
  {
    text: "OH NO!!!!! The crab turns into a HUGE crab and EATS YOU INSTEAD!!!! You died....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/mud.png",
  },
  // 22
  {
    text: "The crab happily takes the pearl as payment for the cave!  NICE!! You shall have shelter for the night!",
    buttonText1: "Build a fire to stay warm",
    buttonText2: "Not risking drawing too much attention at night....",
    nextSceneButton1: 24,
    nextSceneButton2: 25,
    image: "assets/images/cave.jpg",
  },
  // 23
  {
    text: "The crab is SO offended by your greed and selfishness that it CHOMPS off your foot!!!! You bleed out and die......",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/cave.jpg",
  },
  // 24
  {
    text: "You have survived the night! And what is that you see on the horizon? A SHIP!!! They are coming to save you! YOU SURVIVED!!!!! Congratz! ",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/ship.jpg",
  },
  // 25
  {
    text: "OH NO!!! You froze to death during the night..... underestimating temperature drops is no joke.... you died....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/cold.jpg",
  },
  // 26
  {
    text: "Sad to see you go! Maybe you will get washed up again and make better choices that time :)",
    buttonText1: "You sure you don't want to play again?",
    nextSceneButton1: 0,
    image: "assets/images/end.jpg",
  },
];

function restartGame() {
  // Reset core variables
  currentScene = 0; // Reset to the starting scene
  inventory = []; // Clear the inventory array

  // Clear saved data in local storage
  removeGameState();

  // Refresh displays to show initial empty state
  updateInventoryDisplay(); // Update inventory display to show it's empty
  updateScene(); // Refresh to display the first scene
}

// Clear specific game state keys from localStorage
function removeGameState() {
  localStorage.removeItem("currentScene");
  localStorage.removeItem("inventory");
}

// Reset function for saving game state to localStorage
function saveGameState() {
  localStorage.setItem("currentScene", currentScene);
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

// Initialize game state from localStorage
function loadGameState() {
  const savedScene = localStorage.getItem("currentScene");
  const savedInventory = localStorage.getItem("inventory");

  if (savedScene !== null) {
    currentScene = parseInt(savedScene, 10);
  }
  if (savedInventory !== null) {
    inventory = JSON.parse(savedInventory);
  }
}

// Update the scene based on the current scene
function updateScene() {
  const scene = scenes[currentScene];

  // Update scene text and image
  document.getElementById("sceneText").innerText = scene.text;
  document.getElementById("sceneImage").src = scene.image || "";
  document.getElementById("sceneImage").style.display = scene.image
    ? "block"
    : "none";

  // Apply custom size if it exists, otherwise default size
  if (scene.size) {
    sceneImage.style.width = scene.size.width;
    sceneImage.style.height = scene.size.height;
  } else {
    sceneImage.style.width = "100%"; // or any default size you want
    sceneImage.style.height = "auto";
  }

  // Update button 1 (primary button)
  document.getElementById("actionButton1").innerText = scene.buttonText1;

  // Update Button 2 text and visibility
  const button2 = document.getElementById("actionButton2");
  if (scene.buttonText2) {
    button2.innerText = scene.buttonText2;
    button2.style.display = "inline-block";
  } else {
    button2.style.display = "none";
  }

  // Update Button 3 text and visibility
  const button3 = document.getElementById("actionButton3");
  if (scene.buttonText3) {
    button3.innerText = scene.buttonText3;
    button3.style.display = "inline-block";
  } else {
    button3.style.display = "none";
  }

  // Show "Pick up" button only if items are available in the scene
  const pickupButton = document.getElementById("pickupButton");
  if (scene.items && scene.items.length > 0) {
    pickupButton.style.display = "inline-block";
    pickupButton.onclick = function () {
      scene.items.forEach((item) => pickUpItem(item));
      scene.items = []; // Clear items in scene after picking up
      saveGameState(); // Save updated game state
      updateScene(); // Refresh to hide "Pick up" button
    };
  } else {
    pickupButton.style.display = "none";
  }

  // Show "Put Down" button if needed
  const putDownButton = document.getElementById("putDownButton");
  if (scene.showPutDownButton && inventory.length > 0) {
    putDownButton.style.display = "inline-block";
    putDownButton.onclick = function () {
      const itemToDrop = prompt(
        `Which item would you like to put down? Your inventory: ${inventory.join(
          ", "
        )}`
      );
      if (itemToDrop && inventory.includes(itemToDrop)) {
        dropItem(itemToDrop);
        scene.items.push(itemToDrop); // Place the item in the scene
        saveGameState(); // Save updated game state
        updateScene();
      } else {
        alert("Item not found in inventory.");
      }
    };
  } else {
    putDownButton.style.display = "none";
  }

  // Update inventory display after changes
  updateInventoryDisplay();
}

// Pick up an item and add to inventory
function pickUpItem(item) {
  inventory.push(item);
  updateInventoryDisplay(); // Refresh inventory display immediately
  saveGameState(); // Save the new inventory to local storage
}

// Drop an item and remove from inventory
function dropItem(item) {
  const itemIndex = inventory.indexOf(item);
  if (itemIndex > -1) {
    inventory.splice(itemIndex, 1); // Remove item from inventory
  }
  updateInventoryDisplay(); // Refresh inventory display immediately
  saveGameState(); // Save the updated inventory to local storage
}

// Display inventory items
function updateInventoryDisplay() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.textContent = `Inventory: ${
    inventory.length > 0 ? inventory.join(", ") : "(empty)"
  }`;
}

// Handle button click for scene navigation and restart
function handleButtonClick(buttonNumber) {
  const scene = scenes[currentScene];

  // Check if the button clicked is "Play Again?"
  if (buttonNumber === 1 && scene.buttonText1 === "Play Again?") {
    restartGame();
    return; // Stop further processing as game is restarted
  } else if (buttonNumber === 2 && scene.buttonText2 === "Play Again?") {
    restartGame();
    return; // Stop further processing as game is restarted
  } else if (buttonNumber === 3 && scene.buttonText3 === "Play Again?") {
    restartGame();
    return; // Stop further processing as game is restarted
  }

  // Otherwise, proceed with normal scene navigation
  if (buttonNumber === 1) {
    currentScene = scene.nextSceneButton1;
  } else if (buttonNumber === 2 && scene.nextSceneButton2 !== undefined) {
    currentScene = scene.nextSceneButton2;
  } else if (buttonNumber === 3 && scene.nextSceneButton3 !== undefined) {
    currentScene = scene.nextSceneButton3;
  }

  saveGameState(); // Save the updated current scene
  updateScene();
}

// Attach event listeners for the main action buttons
document.getElementById("actionButton1").addEventListener("click", function () {
  handleButtonClick(1);
});
document.getElementById("actionButton2").addEventListener("click", function () {
  handleButtonClick(2);
});
document.getElementById("actionButton3").addEventListener("click", function () {
  handleButtonClick(3);
});

// Load the saved game state on page load
loadGameState();
updateScene();
