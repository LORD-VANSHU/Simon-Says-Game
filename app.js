let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    let allBtns = document.querySelectorAll(".btn");
    for (let btn of allBtns) {
      btn.addEventListener("click", btnPress);
    }

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

//random Color is generated here
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIndx = Math.floor(Math.random() * 4);
  let randColor = btns[randIndx];
  randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randbtn);
}

function checkAns(idx) {
  //   console.log("Current Level", level);
  //   let idx = level - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over, Your Score was ${level} <br> Press Any Key To Restart Again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    if (highestScore < level) {
      highestScore = level;
    }
    h3.innerHTML = `Highest Score : ${highestScore}`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  //the value of level is always equal to the length of gameSeq and userSeq
  checkAns(userSeq.length - 1);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

//track the highest score
