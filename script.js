'use strict';

const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const score0 = document.querySelector('#score-0');
const score1 = document.querySelector('#score-1');
const current0 = document.querySelector('#current-0');
const current1 = document.querySelector('#current-1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelectorAll('.new');
const btnHold = document.querySelector('.hold');

const englishBtn = document.querySelector('#englishBtn');
const spanishBtn = document.querySelector('#spanishBtn');
const english = document.querySelector('.english');
const spanish = document.querySelector('.spanish');
const start = document.querySelector('.start');
const main = document.querySelector('.main');
const currentBox = document.querySelectorAll('.current-title');

let playing, scores, currentScore, activePlayer;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove('unactive');
  player1.classList.add('unactive');

  document.querySelector('.title-0').textContent = 'Player 1';
  document.querySelector('.title-1').textContent = 'Player 2';

  if (spanish.classList.contains('active')) {
    document.querySelector('.title-0').textContent = 'Jugador 1';
    document.querySelector('.title-1').textContent = 'Jugador 2';
    btnHold.textContent = 'Guardar';
    btnNew[2].textContent = 'Nuevo Juego';
    currentBox[0].textContent = 'Actual';
    currentBox[1].textContent = 'Actual';
  }
};

init();

function rollAnimation() {
  for (let i = 1; i <= 6; i++) {
    setTimeout(() => {
      dice.src = `assets/dice-${i}.svg`;
      dice.style.transform = `translate(-50%, -50%) rotate(${i * 60}deg)`;
    }, i * 83);
  }
}

const addScore = function () {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  currentScore = 0;
  document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
};

const switchPlayer = function () {
  // Reset current score to 0
  addScore();
  // Change player color
  player0.classList.toggle('unactive');
  player1.classList.toggle('unactive');
  // Switch to next player
  activePlayer = activePlayer ? 0 : 1;
};

// Rolling dice functionality
dice.addEventListener('click', async () => {
  if (playing) {
    // 1. Generate random dice roll
    const roll = Math.trunc(Math.random() * 6) + 1;
    // 2 Roll animation
    function waitForTimeout(seconds) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
        rollAnimation();
      });
    }
    await waitForTimeout(0.5);
    // 3. display dice
    dice.src = `assets/dice-${roll}.svg`;
    // 4. Check for rolled 1
    if (roll !== 1) {
      // Add dice to current score
      currentScore += roll;
      document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
      // Check if player's score is >= 100
      if (scores[activePlayer] + currentScore >= 100) {
        playing = false;
        addScore();
        document.querySelector(`.title-${activePlayer}`).textContent = 'Winner!';
      }
    } else {
      // Switch to next player and reset current score
      currentScore = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    switchPlayer();
  }
});

btnNew.forEach(button => {
  button.addEventListener('click', () => {
    start.classList.add('hidden');
    english.classList.add('hidden');
    spanish.classList.add('hidden');
    main.classList.remove('hidden');
    init();
  });
});

englishBtn.addEventListener('click', () => {
  start.classList.add('hidden');
  english.classList.remove('hidden');
  spanish.classList.add('hidden');
  main.classList.add('hidden');
});

spanishBtn.addEventListener('click', () => {
  start.classList.add('hidden');
  english.classList.add('hidden');
  spanish.classList.remove('hidden');
  spanish.classList.add('active');
  main.classList.add('hidden');
});