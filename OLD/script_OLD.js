// My variables
const start = document.querySelector('.startButton')
const sequence = document.querySelector('#prompt')
const playerInput = document.querySelectorAll('.punchBtn')
const menu = document.querySelector('.menuIcon')
const menuBar = document.querySelector('.menuBar')
const nameForm = document.querySelector('input')
const next = document.querySelector('input[type="submit"]')
const tysonWelcome = document.querySelector('.tysonWelcome')
const welcome = document.querySelector('.welcome')
const tutoPage = document.querySelector('.tutoPage')
const nextToCombo = document.querySelector('.nextButton')
const playerName = document.querySelector('span')
const comboPage = document.querySelector('.comboPage')
const reset = document.querySelector('.reset')

let player = {
  name: '',
  level: 3,
  bestWinStreak: 0,
  comboDone: 0,
}
let activeMenu = 0
let seqCntr = 0
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
  for (let i = 0; i < player.level; i++){
  randomPunches = punchList[Math.floor(Math.random() * 4)]
  punchSequence.push(randomPunches)
  console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
  }  
  sequence.textContent = punchSequence
}
function resetGameOver(){
  seqCntr = 0
  player.level = 1 
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
  console.log(`Sequence: ${seqCntr}/${player.level-1}, I clicked: ${playerSequence[seqCntr]}, expected: ${punchSequence[seqCntr]}`)
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
nameForm.classList.add('active')
next.classList.remove('hidden')
next.classList.add('active')
}

function toTuto(){
  console.log(nameForm.value)
  player.name = nameForm.value
  playerName.textContent = player.name
  console.log(player.name)
}

function toCombo(){
  console.log("enter to combo page")
  tutoPage.classList.remove('tutoPage')
  tutoPage.classList.add('hidden')
  comboPage.classList.remove('hidden')
  comboPage.classList.add('comboPage')
}

function resetF(){
  console.log(reset)
  tutoPage.classList.add('hidden')
  comboPage.classList.add('hidden')
  welcome.classList.remove('hidden')
}



// My event listener
start.addEventListener('click', startGame)
playerInput.forEach(button => button.addEventListener('click', playerInputSequence))
menu.addEventListener('click', menuSlide )
nameForm.addEventListener('click', fillName)
next.addEventListener('click', toTuto)
nextToCombo.addEventListener('click', toCombo)
reset.addEventListener('click', resetF)

