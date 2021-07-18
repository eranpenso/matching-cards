const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
var matchs_made=0
let firstCard, secondCard;
let moves_left = 12;
document.getElementById("moveslefth1").innerHTML = moves_left+" moves left!";

//AUDIO
var match_audio = new Audio('audio/corrrectmatchsound.mp3')
var wrong_audio = new Audio('audio/wrongmatchsound.mp3')
var winning_audio = new Audio('audio/victorysound.mp3')
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch)
  {
    disableCards()
    match_audio.play()
    matchs_made++
    if(matchs_made==6)
    {  
      winning_audio.play()
      setTimeout(user_won,2000)
    }
  }
  else
  {
    unflipCards()
    wrong_audio.play()
  }
  moves_left-=1
  document.getElementById("moveslefth1").innerHTML = moves_left+" moves left!";
  if(moves_left==0)
  {
    setTimeout(user_lost,1000)
  }
  if(moves_left == 1)
  {
    document.getElementById("moveslefth1").innerHTML = moves_left+" move left!";

  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function user_won()
{
  matchs_made=0
  matchs_made=0
  window.location.href = "congratspage.html";
}
function user_lost()
{
  matchs_made=0
  matchs_made=0
  window.location.href = "lostpage.html";
}
cards.forEach(card => card.addEventListener('click', flipCard));
