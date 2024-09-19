const gameBoard = document.getElementById('gameBoard');
const scoreBoard = document.getElementById('scoreBoard');
const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🍋', '🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🍋'];
let shuffledIcons = icons.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let preventClick = false;

function createBoard() {
    shuffledIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = icon;
        gameBoard.appendChild(card);
    });

    // Show all cards for 5 seconds before hiding them
    setTimeout(() => {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('hidden'));
        addClickEvents();
    }, 1000);
}

function addClickEvents() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.addEventListener('click', flipCard));
}

function flipCard() {
    if (preventClick || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.remove('hidden');
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    preventClick = true;
    const [first, second] = flippedCards;

    if (first.dataset.icon === second.dataset.icon) {
        first.classList.add('matched');
        second.classList.add('matched');
        matchedPairs++;
        score += 5;
        updateScore();
        flippedCards = [];
        preventClick = false;

        if (matchedPairs === icons.length / 2) {
            setTimeout(() => alert('Congratulations! You won the game!'), 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.add('hidden');
                card.classList.remove('flipped');
            });
            flippedCards = [];
            preventClick = false;
        }, 1000);
    }
}

function updateScore() {
    scoreBoard.textContent = `Score: ${score}`;
}

createBoard();
