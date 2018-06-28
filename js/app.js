const cards = document.querySelector('.deck');
const total_pairs = 8;
let stars = document.querySelectorAll('.stars li');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let matched = 0;
let clockId;

function shuffleDeck(){
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    // console.log('cardsToShuffle', cardsToShuffle);
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        cards.appendChild(card);
    }
    // console.log(shuffledCards);
}
shuffleDeck();

cards.addEventListener('click', event => {
    const targetClick = event.target;
    if (targetClick.classList.contains('card') && !targetClick.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(targetClick)) {
          toggleCards(targetClick);
          addToggledCard(targetClick);
// timer added below    
    if (targetClick) {
        if (clockOff) {
           startClock();
           clockOff = false;
           displayTime();
        }
    }

    if (toggledCards.length === 2) {
        checkForMatch();
        addMove();
        checkScore();
    // console.log ("2 cards!");
        }
    }

function toggleCards(targetClick) {
    targetClick.classList.toggle('open');
    targetClick.classList.toggle('show');
 }

 function addToggledCard(targetClick) {
     toggledCards.push(targetClick);
    //  console.log(toggledCards.length);
 }

 function checkForMatch() {
     if ( toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
         toggledCards[0].classList.toggle('match');
         toggledCards[1].classList.toggle('match');
         toggledCards = [];
         matched++;
    //  console.log('match');
        {
            if (matched === total_pairs) {
                gameOver();
             }
         }
     }else {
    setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards = [];

    }, 1000);
     }
 }
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}
});

function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}
function stopClock() {
    clearInterval(clockId);
}

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    console.log(clock);
    clock.innerHTML = minutes, seconds;
if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
} else {
    clock.innerHTML = `${minutes}:${seconds}`;
    }
}
//  in-game moves counter
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
// check score
function checkScore() {
    if (moves === 12 || moves === 18) {
        removeStar();
    }
} 
// remove star
function removeStar() {
    for (star of stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}
// Toggle for popup when game is finished
function toggleModal() {
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
}

 function writeModalStats() {
     const timeStat = document.querySelector('.modal_time');
     const clockTime = document.querySelector('.clock').innerHTML;
     const movesStat = document.querySelector('.modal_moves');
     const starsStat = document.querySelector('.modal_stars');
     const stars = getStars();
     timeStat.innerHTML = `time = ${clockTime}`;
     movesStat.innerHTML = `moves = ${moves + 1}`;
     starsStat.innerHTML = `Stars = ${stars}`;
 }

 function getStars() {
     stars = document.querySelectorAll('.stars li');
     starCount = 0;
     for (star of stars) {
         if (star.style.display !== 'none') {
             starCount++;
         }
     }
     return starCount;
 }
// close button
document.querySelector('.modal_close').addEventListener('click', () => {
    toggleModal();
    stopClock();
});
//  cancel button
document.querySelector('.modal_cancel').addEventListener('click', () => {
    toggleModal();
    stopClock();
});
// restart button
document.querySelector('.modal_replay').addEventListener('click', () => {
    card.classList.toggle('cards');
    resetGame();
});
// reset button
document.querySelector('.restart').addEventListener('click', () => {
    matched = 0;     // resets match counter when reset button is clicked
    resetGame();
    toggleModal();
});
// reset button
document.querySelector('.modal_replay').addEventListener('click', replayGame);
toggleModal();

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    for (star of stars) {
        star.style.display = 'inline'
    }
}
//game over conditional
function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
}
// reset game function
 function resetGame() {
   resetClockAndTime();
   resetMoves();
   resetStars();
   shuffleDeck();
   toggleModal();
   resetCards();
}

function resetClockAndTime() {
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function replayGame() {
    matched = 0;     // added matched here trying to get the counter to reset
    resetGame();
    toggleModal();
}

 function resetCards() {
    let theseCards = document.querySelectorAll('.card');
    theseCards.forEach(function(card) {
    if (card.classList.contains('match')) {
    card.classList.remove('match', 'show', 'open');
  } else if (card.classList.contains('show')) {
    card.classList.remove('show', 'open');
  }
    else {
    return card;
        }
    });
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}