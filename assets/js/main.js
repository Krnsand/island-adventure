window.addEventListener("DOMContentLoaded", main);

function main() {
  updateScene();
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
    text: "Welcome to the virtual Island Adventure! Click Start to begin your adventure!",
    buttonText1: "Start",
    isStart: true,
    nextSceneButton1: 1,
    image: "assets/images/start-beach.jpg",
  },
  // 1
  {
    text: "You have just washed ashore on a beach somewhere out in the ocean.\n You look around to see if you can find anyone else here. You see no one. You find a water bottle that must have washed ashore along with you. It's empty. You know you need to find fresh water and food in order to survive. You can't see anything else on the beach so you look ahead and see a dense jungle. You realize you will need to enter the jungle in order to find food, water and shelter, but there could be dangers in there....",
    buttonText1: "Enter Jungle",
    buttonText2: "Stay on the Beach",
    nextSceneButton1: 4,
    nextSceneButton2: 2,
    items: ["water bottle"],
    image: "assets/images/beach.jpg",
  },
  // 2
  {
    text: "You decide to sit on the beach and hope to be rescued soon....",
    buttonText1: "Hope for the best...",
    nextSceneButton1: 3,
    image: "assets/images/sit.jpg",
  },
  // 3
  {
    text: "OH NO! You get stung by something venomous in the sand!!!! You died.....",
    buttonText1: "Play Again?",
    buttonText2: "No More please....",
    nextSceneButton1: 0,
    nextSceneButton2: 15,
    image: "assets/images/sand.jpg",
  },
  // 4
  {
    text: "You are walking in the jungle in search for water and food and you are met with a HUUUUUUGE tree! You will have to go around it. Do you take the right path around? Or the left?",
    buttonText1: "Take the left path",
    buttonText2: "Take the right path",
    nextSceneButton1: 6,
    nextSceneButton2: 5,
    image: "assets/images/jungle.jpg",
  },
  // 5
  {
    text: "OH NO! You come face to face with a scary looking snake! You try to scare it away but it bites you instead. You died.....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 15,
    image: "assets/images/snake.jpg",
  },
  // 6
  {
    text: "You see a friendly looking monkey sitting in a tree and decide to talk to it. Who knows, it might be able to talk!",
    buttonText1: "Ask monkey for directions",
    buttonText2: "Monkeys can't talk, I'll find my own way",
    nextSceneButton1: 7,
    nextSceneButton2: 16,
    image: "assets/images/monkey1.jpg",
  },
  // 7
  {
    text: "You arrive at a beautiful waterfall that runs into a river where you can fill your water bottle! NICE! You shall not die of thirst today! Now you just need some food and shelter as well.....",
    buttonText1: "Look for food",
    buttonText2: "Shelter is more important right now",
    nextSceneButton1: 8,
    nextSceneButton2: 12,
    image: "assets/images/fresh-water.jpg",
  },
  // 8
  {
    text: "You see two pretty parrots and think about asking them where you can find some food",
    buttonText1: "Parrot 1 says left",
    buttonText2: "Parrot 2 says right",
    buttonText3: "I'll just eat the parrots...",
    nextSceneButton1: 17,
    nextSceneButton2: 9,
    nextSceneButton3: 10,
    image: "assets/images/parrots.png",
    size: { width: "100%", height: "auto" },
  },

  // 9
  {
    text: "You see some coconuts in a tree! Perfect! Now you just need to get them..... ",
    buttonText1: "Climb up and get them",
    buttonText2: "Not risking a fall... look for shelter",
    nextSceneButton1: 11,
    nextSceneButton2: 12,
    items: ["coconut"],
    image: "assets/images/coconuts.jpg",
    allowPutDown: true,
  },
  // 10
  {
    text: "OH NO!! The parrots friends knows you want to eat them so they all take flight and attack you!!!! You died....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 15,
    image: "assets/images/many-birds.jpg",
  },
  // 11
  {
    text: "You now have food and water, time to look for shelter!",
    buttonText1: "Head back to beach",
    nextSceneButton1: 12,
    image: "assets/images/jungle.jpg",
  },
  // 12
  {
    text: "You found a hidden cave by the beach!! NICE!! You shall have shelter for the night!",
    buttonText1: "Build a fire to stay warm",
    buttonText2: "Not risking drawing too much attention at night....",
    nextSceneButton1: 13,
    nextSceneButton2: 14,
    image: "assets/images/cave.jpg",
  },
  // 13
  {
    text: "You have survived the night! And what is that you see on the horizon? A SHIP!!! They are coming to save you! YOU SURVIVED!!!!! Congratz! ",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/ship.jpg",
  },
  // 14
  {
    text: "OH NO!!! You froze to death during the night..... underestimating temperature drops is no joke.... you dead....",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 15,
    image: "assets/images/cold.jpg",
  },
  // 15
  {
    text: "Sad to see you go! Maybe you will get washed up again and make better choices :)",
    buttonText1: "You sure you don't want to play again?",
    nextSceneButton1: 0,
    image: "assets/images/end.jpg",
  },
  // 16
  {
    text: "OH NO!!! You run into a HUUUUGE gorilla with babies!!! He kills you..... you dead..",
    buttonText1: "Play again?",
    buttonText2: "No more please....",
    nextSceneButton1: 0,
    nextSceneButton2: 15,
    image: "assets/images/gorilla.jpg",
  },
  // 17
  {
    text: "You see some coconuts in a tree! Perfect! Now you just need to get them..... ",
    buttonText1: "Climb up and get them",
    buttonText2: "Not risking a fall... look for shelter",
    nextSceneButton1: 11,
    nextSceneButton2: 12,
    image: "assets/images/coconuts2.jpg",
  },
  // // 18
  // {
  //   text: "Sad to see you go! Maybe you will get washed up again and make better choices :)",
  //   buttonText1: "Play again?",
  //   nextSceneButton1: 0,
  //   image: "assets/images/end.jpg",
  // },
  // // 19
  // {
  //   text: "Sad to see you go! Maybe you will get washed up again and make better choices :)",
  //   buttonText1: "Play again?",
  //   nextSceneButton1: 0,
  //   image: "assets/images/end.jpg",
  // },
];

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
    button3.style.display = "none"; // Hide button if not needed
  }

  // Show "Pick up" button only if items are available in the scene
  const pickupButton = document.getElementById("pickupButton");
  if (scene.items && scene.items.length > 0) {
    pickupButton.style.display = "inline-block";
    pickupButton.onclick = function () {
      scene.items.forEach((item) => pickUpItem(item));
      scene.items = []; // Clear items in scene after picking up
      saveGameState();
      updateScene(); // Refresh to hide "Pick up" button
    };
  } else {
    pickupButton.style.display = "none";
  }

  // Show "Put down" button only if the scene allows it and there are items in the inventory
  const putDownButton = document.getElementById("putDownButton");
  if (scene.allowPutDown && inventory.length > 0) {
    putDownButton.style.display = "inline-block";
    putDownButton.onclick = function () {
      const itemToDrop = prompt(
        `Which item would you like to put down? Your inventory: ${inventory.join(
          ", "
        )}`
      );
      if (itemToDrop && inventory.includes(itemToDrop)) {
        dropItem(itemToDrop);
        scene.items.push(itemToDrop); // Return item to the scene
        saveGameState();
        updateScene(); // Refresh to show changes
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
}

// Drop an item and remove from inventory
function dropItem(item) {
  const itemIndex = inventory.indexOf(item);
  if (itemIndex > -1) {
    inventory.splice(itemIndex, 1); // Remove item from inventory
  }
  updateInventoryDisplay(); // Refresh inventory display immediately
}

// Display inventory items
function updateInventoryDisplay() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.textContent = `Inventory: ${
    inventory.length > 0 ? inventory.join(", ") : "(empty)"
  }`;
}

function handleButtonClick(buttonNumber) {
  const scene = scenes[currentScene];

  if (buttonNumber === 1) {
    currentScene = scene.nextSceneButton1;
  } else if (buttonNumber === 2 && scene.nextSceneButton2 !== undefined) {
    currentScene = scene.nextSceneButton2;
  } else if (buttonNumber === 3 && scene.nextSceneButton3 !== undefined) {
    currentScene = scene.nextSceneButton3;
  }

  updateScene();
}

document.getElementById("actionButton1").addEventListener("click", function () {
  handleButtonClick(1);
});
document.getElementById("actionButton2").addEventListener("click", function () {
  handleButtonClick(2);
});
document.getElementById("actionButton3").addEventListener("click", function () {
  handleButtonClick(3);
});

updateScene();
