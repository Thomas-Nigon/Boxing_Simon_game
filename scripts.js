let player = {
  name: '',
  level: 1,
  bestWinStreak: 0,
  comboDone: 0,
}
let seqCntr = 0
let punchSequence = []
let playerSequence = []
let randomPunches = []
const punchList = ["jab", "cross", "lead hook", "rear hook"]

// MODAL POPUP
const modalGood = document.getElementById('good');
const modalWrong = document.getElementById('wrong');
const btnAbout = document.querySelector('.about');
const modalAbout = document.getElementById('about')

const modal = document.querySelector('dialog');
const closeModalG = document.querySelector('.good');
const closeModalW = document.querySelector('.wrong');
const closeModalAbout = document.querySelector('.btnAbout')

closeModalG.addEventListener('click', () => {
  modalGood.close()
  console.log("close modal good")
})
closeModalW.addEventListener('click', () => {
  modalWrong.close()
  console.log("close modal wrong")
})
closeModalAbout.addEventListener('click', () => {
  modalAbout.close()
  console.log("close modal about")
})

function createItem() {
  for (i = 0; i < punchSequence.length; i++) {
    // create a new Item to our list
    const newItem = document.createElement("li")
    /*   newItem.classList.add('item') */

    // add a name to that item:
    const newName = document.createTextNode(punchSequence[i])
    // add the text to the li element:
    newItem.appendChild(newName)
    // add the newly created element and its content into the DOM
    const currentDiv = document.querySelector("#prompt");
    currentDiv.appendChild(newItem)
  }
}
function clearList(){
const listItems = document.querySelectorAll('#prompt li');

// 👇️ NodeList(5) [li, li, li, li, li]
console.log(listItems);

listItems.forEach(listItem => {
  listItem.parentNode.removeChild(listItem);
});
}

//FUNCTION START GAME
const start = document.querySelector('[name="startButton"]')
const list = document.querySelector('.item')

function startGame() {
  punchSequence = []
  console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
  for (let i = 0; i < player.level; i++) {
    randomPunches = punchList[Math.floor(Math.random() * 4)]
    punchSequence.push(randomPunches)
    console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
    createItem()
  }
}


// PAGE SLIDING FUNCTION
const pages = document.querySelectorAll(".page");
const translateAmount = 100;
let currentPage = 0;
let translate = 0;
function slide(direction) {
  console.log("inside sliding function")
  direction === "next" ? (translate -= translateAmount, currentPage--) : (translate += translateAmount, currentPage++);

  pages.forEach(
    pages => (pages.style.transform = `translateX(${translate}%)`)
  );
  console.log(currentPage)
  if (currentPage === -2) {
    console.log('P2 start game please')
    startGame()
  }
}

// NAVBAR FUNCTION //
const menu = document.querySelector('.menuIcon')
const menuBar = document.querySelector('.menuBar')
let activeMenu = 0
function menuSlide() {
  if (activeMenu) {
    menuBar.classList.remove('active')
    activeMenu = 0
  } else {
    menuBar.classList.add('active')
    activeMenu = 1
  }
}
menu.addEventListener('click', menuSlide)

// FILL NAME FUNCTION
const nameForm = document.querySelector('input')

function fillName(e) {
  console.log(e)
  nameForm.value = ''
  nameForm.classList.add('active')
  next.classList.remove('hidden')
  next.classList.add('active')
}
nameForm.addEventListener('click', fillName)


// FILL PLAYER NAME WITH REAL NAME IN TUTO PAGE
const next = document.querySelector('input[type="submit"]')
const playerName = document.querySelector('span')

function toTuto() {
  console.log(nameForm.value)
  player.name = nameForm.value
  playerName.textContent = player.name
  console.log(player.name)
}
next.addEventListener('click', toTuto)


// PUNCH SEQUENCE GENERATOR
function randomizePunches() {
  punchSequence = []
  console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
  for (let i = 0; i < player.level; i++) {
    randomPunches = punchList[Math.floor(Math.random() * 4)]
    punchSequence.push(randomPunches)
    console.log(`function randomizePunches: punchSequence: ${punchSequence}`)
  }
  createItem()
}

//LVLUP AND RESET TO NEXT SEQUENCE FUNCTION
const level = document.querySelector('[name="level"]')
const winStreak = document.querySelector('[name="winStreak"]')
const combo = document.querySelector('[name="combo"]')
function lvlUpReset() {
  modalGood.showModal()
  console.log("entering level function")
  seqCntr = 0
  punchSequence = []
  playerSequence = []
  clearList()
  randomPunches = []
  player.level += 1
  level.textContent = player.level
  if (player.level >= player.bestWinStreak) {
    player.bestWinStreak = player.level
    winStreak.textContent = player.bestWinStreak
  }

  player.comboDone += 1
  combo.textContent = " "
  combo.textContent = player.comboDone
  randomizePunches()
}

// RESET AFTER A GAMEOVER
function resetGameOver() {
  modalWrong.showModal()
  clearList()
  seqCntr = 0
  player.level = 1
  punchSequence = []
  playerSequence = []
  randomPunches = []
  randomizePunches()
}

// MATCHING PLAYER INPUT AND RANDOM SEQ
let misses = 0
const missed = document.querySelector('[name="missed"]')
function matchingCheck() {
  console.log("entering matching check function")
  console.log(`Sequence: ${seqCntr}/${player.level - 1}, I clicked: ${playerSequence[seqCntr]}, expected: ${punchSequence[seqCntr]}`)
  if (playerSequence[seqCntr] !== punchSequence[seqCntr]) {
    console.log("gameOver")
    misses += 1
    missed.textContent = ""
    missed.textContent = misses
    resetGameOver()

  } else if (seqCntr === (punchSequence.length - 1)) {
    console.log("goodJob combo done")
    lvlUpReset()

  } else {
    console.log("owiii")
    seqCntr++
  }
}

//LISTENING TO PLAYER SEQUENCE
const playerInput = document.querySelectorAll('.punches')
playerInput.forEach(button => button.addEventListener('click', playerInputSequence))
function playerInputSequence(e) {
  console.log("entering player inputSequence")
  console.log("clearing punch display")
  console.log(e)
  console.log(`${e.srcElement.name}`)
  playerSequence.push(e.srcElement.name)
  console.log(`I clicked ${playerSequence} button`)
  matchingCheck()
}

// RESET FUNCTION
const reset = document.querySelector('.reset')
reset.addEventListener('click', () => {
  window.location.reload()
  console.log('reset done')
})

//ABOUT FUNCTION
btnAbout.addEventListener('click', () => {
  modalAbout.showModal()
  console.log('show about')
})
