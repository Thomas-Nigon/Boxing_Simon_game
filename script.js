// My variables
const start = document.querySelector('.startButton')
const sequence = document.querySelector('#prompt')
const playerInput = document.querySelectorAll('.punchBtn')
const menu = document.querySelector('.menuIcon')
const menuBar = document.querySelector('.menuBar')
const nameForm = document.querySelector('input')

let activeMenu = 0
let seqCntr = 0
let level = 3
let punchSequence = []
let playerSequence = []
let randomPunches = []
const punchList = ["jab", "cross", "lead hook", "rear hook"]

// My functions
function startGame(){
  sequence.textContent = "let's go, you have 4 seconds to memorize the punch sequence and reproduce it";
  setTimeout(() => {  console.log("timer "); randomizePunches() }, 5);
  
}
function randomizePunches(){
  punchSequence = []
  console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
  for (let i = 0; i < level; i++){
  randomPunches = punchList[Math.floor(Math.random() * 4)]
  punchSequence.push(randomPunches)
  console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
  }  
  sequence.textContent = punchSequence
}
function resetGameOver(){
  seqCntr = 0
  level = 3 
  punchSequence = []
  playerSequence = []
  randomPunches = []
  sequence.textContent = "let's go, you have 4 seconds to memorize the punch sequence and reproduce it";
}

function lvlUpReset(){
  console.log("entering level function")
  seqCntr=0
  punchSequence = []
  playerSequence = []
  randomPunches = []
  randomizePunches()
}

function matchingCheck(){
  console.log("entering matching check function")
  console.log(`Sequence: ${seqCntr}/${level-1}, I clicked: ${playerSequence[seqCntr]}, expected: ${punchSequence[seqCntr]}`)
  if (playerSequence[seqCntr] !== punchSequence[seqCntr]){
  console.log("gameOver")
  resetGameOver()
  
  } else if (seqCntr === (punchSequence.length-1) ){
    console.log("goodJob combo done")
    lvlUpReset()

    } else {
      console.log("owiii")
      seqCntr++
    }
}

function playerInputSequence(e){
  console.log("entering player inputSequence")
  console.log(e)
  console.log(`${e.srcElement.name}`)
  sequence.textContent= ""
  playerSequence.push(e.srcElement.name)
  console.log(`I clicked ${playerSequence} button`)
  matchingCheck()
} 
function menuSlide() {
 if(activeMenu) {
  menuBar.classList.remove('active')
  activeMenu = 0
 } else {
  menuBar.classList.add('active')
  activeMenu = 1
 }
}

function fillName(e){
console.log(e)
nameForm.value = ''
}

// My event listener
start.addEventListener('click', startGame)
playerInput.forEach(button => button.addEventListener('click', playerInputSequence))
menu.addEventListener('click', menuSlide )
nameForm.addEventListener('click', fillName)
