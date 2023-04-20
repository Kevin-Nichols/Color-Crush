const gameContainer = document.getElementById("game");  

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink"
];


function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(color);

    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let cardCounter = 0;
let attemptCounter = 1;
let allowClick = false;
let card1 = null;
let card2 = null;
let complete = document.querySelector('p');
let lowScore = localStorage.getItem("low-score");
if(lowScore === null){
  lowScore = "Low score has not been set"
} else{
  lowScore = localStorage.getItem("low-score");
};

function handleCardClick(e) {
  let targetCard = e.target;
  if(targetCard.classList.contains('blank')) return;
  if(allowClick) return;
  targetCard.style.backgroundColor = targetCard.classList[0];

  if(!card1 || !card2){
    targetCard.classList.add('blank');
    card1 = card1 ||targetCard;
    card2 = targetCard === card1 ? null :targetCard;
  }

  if(card1 && card2){
    allowClick = true;

    if(card1.className === card2.className){
      cardCounter += 2;
      allowClick = false;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      document.getElementById('guessCounter').innerHTML = "Number of guesses: " + (attemptCounter++);
      card1 = null;
      card2 = null;
    } else {
      setTimeout(function(){
        card1.classList.remove('blank');
        card2.classList.remove('blank');
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        document.getElementById('guessCounter').innerHTML = "Number of guesses: " + (attemptCounter++);
        card1 = null;
        card2 = null;
        allowClick = false;
      }, 1000);
    }
  }
  
    function gameOver(){
      let lastScore = document.getElementById('score');
      let lowScoreDisplay = document.getElementById('lowScore');
      lastScore.innerText = "Your score: " + (attemptCounter -1);
      let lowScore = +localStorage.getItem('low-score') || Infinity;
      if((attemptCounter-1) < lowScore){
        lowScoreDisplay.innerText += "   New Low Score!";
        localStorage.setItem('low-score', (attemptCounter-1));
      }
    }
  if(cardCounter === COLORS.length) complete.classList.add('complete1'), gameOver();
}

// when the DOM loads
createDivsForColors(shuffledColors);
document.getElementById('currentHighScore').innerHTML = 'Current Low Score: ' + (lowScore);

const startPage = document.getElementById('startPage');
const startBtn = document.getElementById('fadeBtn');
const gamePage = document.getElementById('gamePage');
startBtn.addEventListener('click', function(){
  gamePage.classList.remove('gamePageClass');
  gamePage.classList.add('gamePageFade');
  startPage.classList.remove('startPageClass');
  startPage.classList.add('startPageFade');
  setTimeout(function(){
    startPage.remove();
  }, 1000)
});

function restartFade(){
  gamePage.classList.remove('gamePageClass');
  gamePage.classList.add('gamePageFade');
  startPage.classList.remove('startPageClass');
  startPage.classList.add('startPageFade');
  setTimeout(function(){
    startPage.remove();
  }, 1000)
};

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', function(){
  window.location.reload();
});

const scoreReset = document.getElementById('scoreReset');
scoreReset.addEventListener('click', function(){
  localStorage.clear();
  window.location.reload();
});

