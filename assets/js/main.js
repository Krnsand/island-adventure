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
    buttonText1: "Start",
    isStart: true, // This marks it as the special "start scene"
    image: "assets/images/start-beach.jpg",
  },
  {
    text: "You have just washed ashore on a beach somewhere out in the ocean. You look around to see if you can find anyone else here. You no one. You find a water bottle that must have washed ashore along with you. You know you need to find mer water and food in order to survive. You can't see anything else on the beach so you look ahead and see a dense jungle. You realize you will need to enter the jungle in order to find food, water and shelter, but there could be dangers in there....",
    buttonText1: "Enter Jungle",
    image: "assets/images/beach.jpg",
  },
  {
    text: "You are walking in the jungle in search for water and food and you are met with a huuuuuge tree! You will have to go around it. Do you take the right way around? Or the left?",
    buttonText1: "Take the right path",
    buttonText2: "Take the left path", // Second option
    image: "assets/images/jungle.jpg",
  },
  {
    text: "You walk into a lush forest filled with tropical plants and chirping birds.",
    buttonText1: "Return to the beach",
    image: "assets/images/fresh-water.jpg",
  },
  {
    text: "You arrive at a calm pond, surrounded by lily pads and dragonflies.",
    buttonText1: "Return to the beach",
    image: "assets/images/parrot.jpg",
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

  // Update button 2 (secondary button) if it exists
  if (scene.buttonText2) {
    document.getElementById("actionButton2").innerText = scene.buttonText2;
    document.getElementById("actionButton2").style.display = "inline-block"; // Show second button
  } else {
    document.getElementById("actionButton2").style.display = "none"; // Hide second button if not needed
  }
}

function handleButtonClick(buttonNumber) {
  const scene = scenes[currentScene];

  if (scene.isStart) {
    // Start scene logic
    currentScene = 1;
  } else if (buttonNumber === 1) {
    // Logic for primary button
    currentScene = (currentScene + 1) % scenes.length;
  } else if (buttonNumber === 2 && scene.buttonText2) {
    // Logic for secondary button
    currentScene = (currentScene + 2) % scenes.length; // Example: skips to a different scene
  }

  updateScene();
}

document.getElementById("actionButton1").addEventListener("click", function () {
  handleButtonClick(1);
});
document.getElementById("actionButton2").addEventListener("click", function () {
  handleButtonClick(2);
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
