const board = document.getElementById("game-board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

let cardValues, firstCard, secondCard, lockBoard, matchedPairs, time, attempts, timer;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
  cardValues = [...cardValues, ...cardValues];
  shuffle(cardValues);

  board.innerHTML = "";
  statusText.textContent = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  time = 0;
  attempts = 0;
  updateStats();
  clearInterval(timer);
  showBestScore();

  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.value = value;
    card.textContent = value;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains("matched") || this === firstCard) return;

  if (time === 0) startTimer();

  this.classList.remove("hidden");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  attempts++;
  updateStats();
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    resetTurn();

    if (matchedPairs === 8) {
    let gameContainer = document.getElementById("game")
      statusText.textContent = "🎉 All pairs matched! Well done!";
    gameContainer.style.backgroundColor="#d2ffe5ff";
     clearInterval(timer);
      updateBestScore();
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.add("hidden");
      secondCard.classList.add("hidden");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startTimer() {
  timer = setInterval(() => {
    time++;
    updateStats();
  }, 1000);
}

function updateStats() {
  document.getElementById("time").textContent = time;
  document.getElementById("attempts").textContent = attempts;
}

function updateBestScore() {
  const best = JSON.parse(localStorage.getItem("bestScore"));
  if (!best || time < best.time || (time === best.time && attempts < best.attempts)) {
    localStorage.setItem("bestScore", JSON.stringify({ time, attempts }));
    showBestScore();
  }
}

function showBestScore() {
  const best = JSON.parse(localStorage.getItem("bestScore"));
  if (best) {
    document.getElementById("bestTime").textContent = best.time;
    document.getElementById("bestAttempts").textContent = best.attempts;
  }
}

restartBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    let gameContainer = document.getElementById("game")
    gameContainer.style.backgroundColor="#ebf1ff";

});

startGame();
