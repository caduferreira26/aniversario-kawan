const startButton = document.querySelector("#start");
const target = document.querySelector("#target");
const arena = document.querySelector("#arena");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const statusMessage = document.querySelector("#status");
const rewardMessage = document.querySelector("#reward");
const rewards = ["Vale um beijo!", "Vale um abraço!", "Vale um cafuné!"];

let score = 0;
let timeLeft = 15;
let timerId;

function showReward() {
  const rewardIndex = (score / 3 - 1) % rewards.length;
  rewardMessage.hidden = false;
  rewardMessage.textContent = `Prêmio desbloqueado: ${rewards[rewardIndex]} 💙`;
  rewardMessage.style.animation = "none";
  void rewardMessage.offsetWidth;
  rewardMessage.style.animation = "";
}

function moveTarget() {
  const maxX = arena.clientWidth - target.offsetWidth;
  const maxY = arena.clientHeight - target.offsetHeight;
  target.style.left = `${Math.random() * maxX}px`;
  target.style.top = `${Math.random() * maxY}px`;
}

function endGame() {
  clearInterval(timerId);
  target.style.display = "none";
  startButton.disabled = false;
  startButton.textContent = "Jogar de novo";
  statusMessage.textContent = `Tempo! Você pegou ${score} ${score === 1 ? "aranha" : "aranhas"}!`;
}

function startGame() {
  score = 0;
  timeLeft = 15;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  rewardMessage.hidden = true;
  rewardMessage.textContent = "";
  statusMessage.textContent = "Valendo! Pegue o máximo de aranhas que conseguir.";
  startButton.disabled = true;
  target.style.display = "block";
  moveTarget();

  timerId = setInterval(() => {
    timeLeft -= 1;
    timeDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);

target.addEventListener("click", () => {
  if (startButton.disabled) {
    score += 1;
    scoreDisplay.textContent = score;
    if (score % 3 === 0) {
      showReward();
    }
    moveTarget();
  }
});
