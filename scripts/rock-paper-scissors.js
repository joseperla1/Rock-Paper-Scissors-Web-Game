let score = JSON.parse(localStorage.getItem('score')) ||{
    wins: 0,
    losses:0,
    ties: 0
};

updateScoreElement();

let isAutoPlay = false;
let intervalId;

function autoplay(){
    if(!isAutoPlay){
        isAutoPlay = true;

        intervalId = setInterval(() =>{
            const autoPlayerMove = pickComputerMove();
            playGame(autoPlayerMove);
        }, 1000);
        document.querySelector('.js-auto-play-button')
        .innerHTML = 'Stop Autoplay';
    }
    else {
        isAutoPlay = false;
        clearInterval(intervalId);
        document.querySelector('.js-auto-play-button')
        .innerHTML = 'Autoplay';
    } 
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('Rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('Paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('Scissors');
    });

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        score.wins = 0;
		score.losses = 0;
        score.ties = 0;
		localStorage.removeItem('score');
		updateScoreElement();
    });
document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoplay();
    });

document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
        playGame('Rock');
    }
    else if (event.key === 'p'){
        playGame('Paper');
    }
    else if (event.key === 's'){
        playGame('Scissors');
    }
})



function playGame(playerMove){
const computerMove = pickComputerMove();

let result = '';
if(playerMove === 'Scissors'){
    if (computerMove === 'Rock'){
        result = 'You lose';
    }else if (computerMove ==='Paper'){
        result = 'You win';
    }else if (computerMove ==='Scissors'){
        result = 'Tie';                                
    }
}

else if(playerMove === 'Paper'){
    if (computerMove === 'Rock'){
        result = 'You win';
    }else if (computerMove ==='Paper'){
        result = 'Tie';
    }else if (computerMove ==='Scissors'){
        result = 'You lose';
    }
}

else if(playerMove === 'Rock'){
    if (computerMove === 'Rock'){
        result = 'Tie';
    }else if (computerMove ==='Paper'){
        result = 'You lose';
    }else if (computerMove ==='Scissors'){
        result = 'You win';
    }
}

if (result === 'You win'){
    score.wins += 1;
}
else if (result === 'You lose'){
    score.losses += 1;	
}
else if (result === 'Tie'){
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
    .innerHTML=`${result}
    <img class="move-icon"  src="images/${result}-emoji.png">`;
    

document.querySelector('.js-moves')
    .innerHTML= `You
<img class="move-icon"  src="images/${playerMove}-emoji.png">
<img class="move-icon"  src="images/${computerMove}-emoji.png">
Computer`;
}

function updateScoreElement(){
document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}



function pickComputerMove(){
const randomNum = Math.random();
let computerMove = '';
if (randomNum >= 0 && randomNum < 1/3){
    computerMove='Rock';
}else if (randomNum >= 1/3 && randomNum < 2/3){
    computerMove='Paper';
}else if (randomNum >= 2/3 && randomNum < 1){
    computerMove='Scissors';
}
return computerMove;
}
