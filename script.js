let playerOneChoice;
let maxChances = 5;
let count = maxChances;
let timeLeft = 15;
let timer;

let hearts = document.querySelectorAll(".heart");
let wanna = document.querySelector(".wanna");
let timerDisplay = document.querySelector(".timer");
let restartBtn = document.querySelector(".restartBtn");

const buttonOneBtns = document.querySelectorAll(".buttonone");
const buttonTwoBtns = document.querySelectorAll(".buttontwo");
const headingTwo = document.querySelector(".headingtwo");

// ===== Player One selects =====
buttonOneBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        playerOneChoice = btn.dataset.choice;

        // Hide Player One buttons
        buttonOneBtns.forEach(b => b.style.display = "none");
        document.querySelector(".headingone").style.display = "none";

        // Show Player Two
        headingTwo.style.display = "block";
        buttonTwoBtns.forEach(b => b.style.display = "inline-block");
        document.querySelector(".hearts").style.display = "flex";
        timerDisplay.style.display = "block";

        count = maxChances;
        timeLeft = 15;
        hearts.forEach(h => h.classList.remove("lost"));
        startTimer();
    });
});

// ===== Player Two selects =====
buttonTwoBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        let playerTwoChoice = btn.dataset.choice;

        // Compare choices
        if (playerOneChoice === playerTwoChoice) {
            wanna.innerHTML = "It's a Draw! 🤝";
            wanna.style.color = "orange";
        } else if (
            (playerTwoChoice === "rock" && playerOneChoice === "scissors") ||
            (playerTwoChoice === "paper" && playerOneChoice === "rock") ||
            (playerTwoChoice === "scissors" && playerOneChoice === "paper")
        ) {
            wanna.innerHTML = "Player Two Wins! 🥇";
            wanna.style.color = "green";
            stopGame();
            return;
        } else {
            count--;
            if (count >= 0) hearts[count].classList.add("lost");

            if (count === 0) {
                wanna.innerHTML = "Player Two Loses 😔";
                wanna.style.color = "red";
                stopGame();
                return;
            } else {
                wanna.innerHTML = "Try Again! ❌";
                wanna.style.color = "black";
            }
        }
    });
});

// ===== Timer =====
function startTimer() {
    clearInterval(timer);
    timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            wanna.innerHTML = "⏰ Time's up! Player Two Loses 😔";
            wanna.style.color = "red";
            stopGame();
        }
    }, 1000);
}

// ===== Stop game =====
function stopGame() {
    clearInterval(timer);
    buttonTwoBtns.forEach(b => b.style.display = "none");
    headingTwo.style.display = "none";
    restartBtn.style.display = "inline-block";
}

// ===== Restart =====
restartBtn.addEventListener("click", () => location.reload());