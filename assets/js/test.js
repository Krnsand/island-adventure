window.addEventListener("DOMContentLoaded", main);

/**
 * The main function to initialize the game upon page load.
 * Calls various setup functions for the game.
 */
function main() {
  updateScene();
  updateInventoryDisplay();
  restartGame();
  pickUpItem();
  dropItem();
  handleButtonClick();
  attachEventListeners();
}

/**
 * Index representing the current scene in the game story.
 * Starts at 0 and changes as the player progresses through scenes.
 * @type {number}
 */
let currentScene = 0;

/**
 * Array holding items that the player has collected during the game.
 * This array updates as items are picked up or dropped.
 * @type {Array<string>}
 */
let inventory = [];

/**
 * An array of scene objects representing different stages of the adventure.
 * Each scene object contains text, button options, and other attributes that
 * define what the user sees and can interact with in that scene.
 *
 * @type {Array<Object>}
 * @property {string} text - The narrative text displayed to the user for this scene.
 * @property {string} buttonText1 - The text displayed on the primary button.
 * @property {string} [buttonText2] - Optional text displayed on the secondary button.
 * @property {string} [buttonText3] - Optional text displayed on the tertiary button.
 * @property {number} nextSceneButton1 - The index of the next scene when button 1 is clicked.
 * @property {number} [nextSceneButton2] - The index of the next scene when button 2 is clicked.
 * @property {number} [nextSceneButton3] - The index of the next scene when button 3 is clicked.
 * @property {Array<string>} [items] - Optional list of items available to pick up in this scene.
 * @property {string} image - The path to the image file displayed in this scene.
 * @property {Object} [size] - Optional custom dimensions for the scene image.
 * @property {string} [size.width] - Width of the image.
 * @property {string} [size.height] - Height of the image.
 * @property {boolean} [isStart=false] - Indicates if this scene is the starting scene.
 * @property {boolean} [showPutDownButton=false] - Indicates if the "Put Down" button is shown.
 */
const scenes = [
  // 0
  {
    text: "Welcome to your very own little Island Adventure game! Safe from harm on your device. Click Start to begin your adventure!",
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
    items: ["bottle"],
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
    items: ["pearl"],
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
    buttonText1: "Play Again?",
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
    buttonText1: "Play Again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
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
    buttonText1: "Play Again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
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
    showPutDownButton: false,
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
    text: "OH NO!!!!! You slip and fall aaaaall the way down and hit your head.... you died....",
    buttonText1: "Play Again?",
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
    image: "assets/images/cave1.jpg",
  },
  // 19
  {
    text: "OH NO!!!!! You stepped in a sticky mud hole by the waterfall river and can't get out! You are sinking, SINKIIIIING!!!! Your died.....",
    buttonText1: "Play Again?",
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
    showPutDownButton: true,
  },
  // 21
  {
    text: "OH NO!!!!! The crab turns into a HUGE crab and EATS YOU INSTEAD!!!! You died....",
    buttonText1: "Play Again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/crab-eat.png",
  },
  // 22
  {
    text: "The crab happily takes the pearl as payment for the cave!  NICE!! You shall have shelter for the night!",
    buttonText1: "Build a fire to stay warm",
    buttonText2: "Not risking drawing attention at night....",
    nextSceneButton1: 24,
    nextSceneButton2: 25,
    image: "assets/images/cave.jpg",
  },
  // 23
  {
    text: "OH NO!!! The crab is SO offended by your greed and selfishness that it CHOMPS off your foot!!!! You bleed out and die......",
    buttonText1: "Play Again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/crab-eat.jpg",
  },
  // 24
  {
    text: "You have survived the night! And what is that you see on the horizon? A SHIP!!! They are coming to save you! YOU SURVIVED!!!!! Congratz! ",
    buttonText1: "Play Again?",
    nextSceneButton1: 0,
    image: "assets/images/ship.jpg",
  },
  // 25
  {
    text: "OH NO!!! You froze to death during the night..... underestimating temperature drops is no joke.... you died....",
    buttonText1: "Play Again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 26,
    image: "assets/images/cold.jpg",
  },
  // 26
  {
    text: "Sad to see you go! Maybe you will get washed up again and make better choices that time :)",
    buttonText1: "Play Again?",
    nextSceneButton1: 0,
    image: "assets/images/end.jpg",
  },
];

/**
 * Attach event listeners for buttons and initialize functions that do not rely on game state.
 */
function attachEventListeners() {
  document
    .getElementById("actionButton1")
    .addEventListener("click", function () {
      handleButtonClick(1);
    });
  document
    .getElementById("actionButton2")
    .addEventListener("click", function () {
      handleButtonClick(2);
    });
  document
    .getElementById("actionButton3")
    .addEventListener("click", function () {
      handleButtonClick(3);
    });
}

/**
 * Resets the game to the initial state, including clearing inventory and scene.
 */
function restartGame() {
  // Reset core variables
  currentScene = 0;
  inventory = [];

  // Refresh displays to show initial empty state
  updateInventoryDisplay();
  updateScene();
}

/**
 * Updates the display based on the current scene information.
 */
function updateScene() {
  const scene = scenes[currentScene];
  const sceneImage = document.getElementById("sceneImage");
  const sceneImageContainer = sceneImage.parentNode;

  // Ta bort klassen för fade-in för att återställa animationen
  sceneImageContainer.classList.remove("fade-in-image");

  setTimeout(() => {
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
      sceneImage.style.width = "100%";
      sceneImage.style.height = "auto";
    }
    // Add fade-in animation
    sceneImageContainer.classList.add("fade-in-image");
  }, 10);

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

  // Show "Pick up" button if items are available in the scene
  const pickupButton = document.getElementById("pickupButton");
  if (scene.items && scene.items.length > 0) {
    pickupButton.style.display = "inline-block";
    pickupButton.onclick = function () {
      scene.items.forEach((item) => pickUpItem(item));
      //   scene.items = []; // Clear items in scene after picking up
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

/**
 * Adds an item to the player's inventory and updates the display.
 * @param {string} item - The item to add to the inventory.
 */
function pickUpItem(item) {
  inventory.push(item);
  updateInventoryDisplay();
}

/**
 * Removes an item from the player's inventory and updates the display.
 * @param {string} item - The item to remove from the inventory.
 */
function dropItem(item) {
  const itemIndex = inventory.indexOf(item);
  if (itemIndex > -1) {
    inventory.splice(itemIndex, 1);
  }
  updateInventoryDisplay();
}

/**
 * Updates the inventory display on the screen with the current items.
 */
function updateInventoryDisplay() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.textContent = `Inventory: ${
    inventory.length > 0 ? inventory.join(", ") : "(empty)"
  }`;
}

/**
 * Handles navigation between scenes based on the button clicked.
 * @param {number} buttonNumber - The button number that was clicked.
 */
function handleButtonClick(buttonNumber) {
  const scene = scenes[currentScene];

  // Check if the button clicked is "Play Again?"
  if (buttonNumber === 1 && scene.buttonText1 === "Play Again?") {
    restartGame();
    return;
  } else if (buttonNumber === 2 && scene.buttonText2 === "Play Again?") {
    restartGame();
    return;
  } else if (buttonNumber === 3 && scene.buttonText3 === "Play Again?") {
    restartGame();
    return;
  }

  if (buttonNumber === 1) {
    currentScene = scene.nextSceneButton1;
  } else if (buttonNumber === 2 && scene.nextSceneButton2 !== undefined) {
    currentScene = scene.nextSceneButton2;
  } else if (buttonNumber === 3 && scene.nextSceneButton3 !== undefined) {
    currentScene = scene.nextSceneButton3;
  }

  updateScene();
}
