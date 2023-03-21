const X_CLASS = "x"
const O_CLASS = "o"

let circleTurn

let winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let cells = document.querySelectorAll('[data-cell]')
let board = document.querySelector(".board")
let resultDiv = document.querySelector(".result-div")
let resultText = document.querySelector(".result-text")
let restartBtn = document.querySelector(".restart-btn")

startGame()

restartBtn.addEventListener("click", reStart)


function startGame() {
    setBoardHoverClass()
    cells.forEach(cell => {
        cell.addEventListener("click", handelClick, { once: true })
    })

}
function handelClick(e) {
    let cell = e.currentTarget
    const currentClass = circleTurn ? O_CLASS : X_CLASS;

    // Place Mark
    placeMark(cell, currentClass);

    // Check For a winner
    if (winner(currentClass)) {
        endGame(true)
    }
    else if (noWinner()) {
        endGame(false)
    }
    else {
        // Switch Turn
        switchTurn()
        // Hover
        setBoardHoverClass()
    }
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function switchTurn() {
    circleTurn = !circleTurn;
    console.log(circleTurn)
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (circleTurn) {
        board.classList.add(O_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}
function winner(currentClass) {
    return winCombination.some((combination => {
        return combination.every(cellIndx => {
            return cells[cellIndx].classList.contains(currentClass)
        })
    }))
}
function noWinner() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}
function endGame(winner) {
    if (winner) {
        resultText.innerHTML = `${circleTurn ? `<span  id= "winner">O's</span>` : `<span id= "winner">X's</span>`} Wins!!`
        if (circleTurn) {
            document.getElementById("winner").style.color = "green"
        }
        else {
            document.getElementById("winner").style.color = "maroon"
        }
    }
    else {
        resultText.innerText = `No Winner :( `
    }
    resultDiv.classList.add("show")
}
function reStart() {
    resultDiv.classList.remove("show")
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener("click", handelClick)
    })
}
