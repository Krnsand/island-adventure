window.addEventListener("DOMContentLoaded", main);

// Skriv funtions för knapparna och texten här inne, koppla id så som i övningen vi gjorde

function main() {
  //   loadStartingScene();
  updateScene();
  handleButtonClick();
}

// function loadStartingScene() {
//   //...  onclick.
// }

// Initial scene index to track where we are in the story
let currentScene = 0;

// Scenes array with different scenes, each with text and button options
const scenes = [
  {
    text: "Welcome to the virtual island adventure! Click Start to begin exploring.",
    buttonText: "Start",
    isStart: true, // This marks it as the special "start scene"
  },
  {
    text: "You have just washed ashore on a beach somewhere out in the ocean. You look around to see if you can find anyone else here. You no one. You find a water bottle that must have washed ashore along with you. You know you need to find mer water and food in order to survive. You can't see anything else on the beach so you look ahead and see a dense jungle. You realize you will need to enter the jungle in order to find food, water and shelter, but there could be dangers in there....",
    buttonText: "Enter the Jungle",
  },
  {
    text: "You walk into a lush forest filled with tropical plants and chirping birds.",
    buttonText: "Ask the monkey",
  },
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText: "Return to the beach",
  },
  {
    text: "You enter a magical cave with glowing crystals and a calm pool.",
    buttonText: "Return to the forest",
  },
];

function updateScene() {
  const scene = scenes[currentScene];
  document.getElementById("sceneText").innerText = scene.text;
  document.getElementById("actionButton").innerText = scene.buttonText;
}

function handleButtonClick() {
  if (scenes[currentScene].isStart) {
    currentScene = 1;
  } else {
    currentScene = (currentScene + 1) % scenes.length;
  }

  updateScene();
}

document
  .getElementById("actionButton")
  .addEventListener("click", handleButtonClick);

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
