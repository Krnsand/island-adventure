window.addEventListener("DOMContentLoaded", main);

function main() {
  updateScene();
  handleButtonClick();
}

// let pickedUpItems = ["bird", "pen", "key"];
// const index = pickedUpItems.indexOf("pen");
// pickedUpItems.splice(index, 1);

// splice = välja items i arrayer via index nummer

// Initial scene index to track where we are in the story
let currentScene = 0;

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
    text: "You have just washed ashore on a beach somewhere out in the ocean.\n\n You look around to see if you can find anyone else here. You see no one. You find a water bottle that must have washed ashore along with you. You know you need to find fresh water and food in order to survive. You can't see anything else on the beach so you look ahead and see a dense jungle. You realize you will need to enter the jungle in order to find food, water and shelter, but there could be dangers in there....",
    buttonText1: "Enter Jungle",
    buttonText2: "Stay on the Beach",
    nextSceneButton1: 4,
    nextSceneButton2: 2,
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
    text: "Oh No! You get stung by something venomous in the sand!!!! You died.....",
    buttonText1: "Play Again?",
    buttonText2: "No More please....",
    buttonText3: "Test",
    nextSceneButton1: 0,
    nextSceneButton2: 0,
    nextSceneButton3: 5,
    image: "assets/images/sand.jpg",
  },
  // 4
  {
    text: "You are walking in the jungle in search for water and food and you are met with a huuuuuge tree! You will have to go around it. Do you take the right path around? Or the left?",
    buttonText1: "Take the right path",
    buttonText2: "Take the left path",
    nextSceneButton1: 5,
    nextSceneButton2: 6,
    image: "assets/images/jungle.jpg",
  },
  // 5
  {
    text: "OH NO! You come face to face with a scary looking snake! You died.....",
    buttonText1: "Return to the beach",
    nextSceneButton1: 0,
    image: "assets/images/snake.jpg",
  },
  // 6
  {
    text: "You see a friendly looking monkey sitting in a tree and decide to talk to it. Who knows, it might be able to talk!",
    buttonText1: "Ask monkey for directions",
    buttonText2: "Monkeys can't talk, I'll find my own way",
    nextSceneButton1: 7,
    nextSceneButton2: 6,
    image: "assets/images/monkey1.jpg",
  },
  // 7
  {
    text: "You arrive at a beautiful waterfall that runs into a river where you can fill your water bottle! NICE! You shall not die of thirst today! Now you just need some food as well.....",
    buttonText1: "Look for food",
    buttonText2: "Go back to the beach",
    nextSceneButton1: 8,
    nextSceneButton2: 2,
    image: "assets/images/fresh-water.jpg",
  },
  // 8
  {
    text: "You see a two pretty parrots and think about asking them where you can find some food",
    buttonText1: "Food where?",
    buttonText2: "I'll just eat the parrot...",
    nextSceneButton1: 9,
    nextSceneButton2: 10,
    image: "assets/images/parrot-right.jpg",
  },
  // 9
  // {
  //   text: "You see a two pretty parrots and think about asking them where you can find some food",
  //   buttonText1: "Go Right",
  //   buttonText2: "I'll just eat the parrot...",
  //   nextSceneButton1: 9,
  //   nextSceneButton2: 10,
  //   image: "assets/images/parrot.jpg",
  // },
  // 10
  {
    text: "You see some coconuts in a tree! Perfect! Now you just need to get them..... ",
    buttonText1: "start to climb",
    buttonText2: "try to hit or shake tree",
    nextSceneButton1: 9,
    nextSceneButton2: 10,
    image: "assets/images/coconuts.jpg",
  },
  // 11
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/start-beach.jpg",
  },
  // 12
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/start-beach.jpg",
  },
  // 13
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/start-beach.jpg",
  },
  // 14
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/start-beach.jpg",
  },
  // 15
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText1: "Play again?",
    nextSceneButton1: 0,
    image: "assets/images/start-beach.jpg",
  },
];

function updateScene() {
  const scene = scenes[currentScene];

  // Update scene text and image
  document.getElementById("sceneText").innerText = scene.text;
  document.getElementById("sceneImage").src = scene.image || "";
  document.getElementById("sceneImage").style.display = scene.image
    ? "block"
    : "none";

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
}

function handleButtonClick(buttonNumber) {
  const scene = scenes[currentScene];

  if (buttonNumber === 1) {
    currentScene = scene.nextSceneButton1; // Go to the scene specified for Button 1
  } else if (buttonNumber === 2 && scene.nextSceneButton2 !== undefined) {
    currentScene = scene.nextSceneButton2; // Go to the scene specified for Button 2
  } else if (buttonNumber === 3 && scene.nextSceneButton3 !== undefined) {
    currentScene = scene.nextSceneButton2; // Go to the scene specified for Button 3
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

// function loadButton1(toScene, text) {
//   const buttonOne = document.getElementById("button1");
//   button1.onclick = toScene;
//   button1.textContent = text
// }

/*Kod innan function loadSceneContent och loadLeftButton och loadRightButton:
function scene2WatchingTv() {
 
    function loadSceneContent(img, headline, paragraph) {
    const image = document.getElementById("background-img");
    image.src = img;
 
    const h2 = document.getElementById("scene-headline");
    h2.textContent = headline;
 
    const p = document.getElementById("scene-paragraph");
    p.textContent = paragraph;
 
    const buttonLeft = document.getElementById("buttonLeft");
    buttonLeft.onclick = function enterScene4Collapse() {
        scene4Collapse();
    };
 
    const buttonRight = document.getElementById("buttonRight");
    buttonRight.onclick = function enterScene3Rabbithole() {
        scene3Rabbithole();
    };



    function loadLeftButton(toScene, text) {
    const buttonLeft = document.getElementById("buttonLeft");
    buttonLeft.onclick = toScene;
    buttonLeft.textContent = text
}
 
    */
