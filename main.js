'use strict';

//awesome
//fantastic
//homemade
//portfolio
//diary
//barista

const figureContainer = document.querySelector(".figure-container");
const wrongalphabet = document.querySelector(".wrongalphabet");
const word = document.querySelector(".word");
const popup = document.querySelector(".popup");
const replayPopup = document.querySelector(".playAgainPopup");
const popupMessage = document.querySelector(".message");
const replayBtn = document.querySelector(".replayBtn");
const body = document.querySelector("body");
let sideBox = document.querySelector('.side');

const wordsArray = ["awesome", "fantastic", "homemade", "portfolio", "diary", "barista", "flower"];

let alphabetArray = [];
let wrongLetterArray = [];
let blankSpan;
let hangman;
let alphabet;
let newArray = [];

function gamestart(event) {
  if (wrongLetterArray.includes(event.key) || newArray.includes(event.key)) {
    popup.classList.add('slide');
    const popupSlide = window.setTimeout(() => {
      popup.classList.toggle('slide');
    }, 1500) } else if (alphabetArray.includes(event.key)) {
    rightLetter(event.key)
    if (newArray.length === alphabetArray.length) {
      gameFinishPopup('win');
    }
    } else {
    addWrongLetter(event.key);
    if (!document.querySelector('.wrong')) {
    gameFinishPopup('lost')
    }
  }
}

function rightLetter(key) {
  alphabet = document.querySelectorAll(".alphabet");
  alphabetArray.forEach((letter, indexNumber) => {
    if (letter === key) {
      const index = alphabetArray.indexOf(letter, indexNumber);
      alphabet[index].innerHTML = key;
      newArray.push(key);
    }
  })
  }

function addWrongLetter(key) {
  sideBox.style.visibility = 'visible';

  wrongLetterArray.push(key);
  let wrongLetter = document.createElement('span');
  wrongLetter.className = 'wrongLetters';
  wrongLetter.innerHTML = `${key}`;
  wrongalphabet.appendChild(wrongLetter);
  drawHangman();
  }

function drawHangman() {
  hangman = document.querySelector('.wrong');
  console.log(hangman)
  hangman.style.visibility = 'visible';
  hangman.classList.remove('wrong');
}

function gameFinishPopup(gameresult) {
  replayPopup.style.visibility = 'visible';
  document.removeEventListener('keypress', gamestart)
  if (gameresult === 'win') {
    popupMessage.innerHTML = 'Congratulations! You won! 😁'
  } else if (gameresult === 'lost') {
    popupMessage.innerHTML = 'Unfortunately you lost. 😥'
  }
}

function init() {
  const randomIndex = Math.floor(Math.random()*(wordsArray.length));
  const randomWord = wordsArray[randomIndex];
  alphabetArray = randomWord.split('');
  alphabetArray.forEach((letter) => {
    blankSpan = document.createElement('span');
    blankSpan.className = 'alphabet';
    word.appendChild(blankSpan);
    document.addEventListener('keypress', gamestart)
  })

}

init();

replayBtn.addEventListener('click', () => {
  const man = document.querySelectorAll('.hangman');
  console.log(man);
  man.forEach((item) => {
    item.classList.add('wrong');
    item.style.visibility = 'hidden';
  });
  hangman = document.querySelector('.wrong');
  replayPopup.style.visibility = 'hidden';
  wrongalphabet.innerHTML = '';
  sideBox.style.visibility = 'hidden';
  word.innerHTML = '';
  wrongLetterArray = [];
  newArray = [];
  init();
})