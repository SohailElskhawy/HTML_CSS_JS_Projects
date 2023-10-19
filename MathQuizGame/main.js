let userPoints = 0;
let userTime = 100;
function startGame(){
    const startBut = document.querySelector('.startScreen');
    startBut.style.display = 'none';
    const difficultyScreen = document.querySelector('.difficultySelectScreen');
    difficultyScreen.style.display = 'flex';
}

let gameDifficulty;



function selectDifficulty(difficulty){
    const userPointsEl = document.getElementById('userPoints');
    userPointsEl.innerHTML = `Points: ${userPoints}`
    const difficultyScreen = document.querySelector('.difficultySelectScreen');
    difficultyScreen.style.display = 'none';
    gameDifficulty = difficulty;
    const gameScreen = document.querySelector('.game');
    gameScreen.style.display = 'flex';
    makeQuestion();
    startTime()
}

function makeQuestion(){
    let questionEl = document.getElementById('gameQuestion');
    const operations = ['+', '-', 'x'];
    
    if (gameDifficulty == 'easy'){
        let x = Math.round(Math.random() * 15)
        let y = Math.round(Math.random() * 15)
        questionEl.innerHTML = `${x} ${operations[Math.floor(Math.random() * operations.length)]} ${y}`
        userTime = 6;
    }else if (gameDifficulty == 'medium') {
        let x = Math.round(Math.random() * 10)
        let y = Math.round(Math.random() * 15)
        let z = Math.round(Math.random() * 10)
        questionEl.innerHTML = `${x} ${operations[Math.floor(Math.random() * operations.length)]} ${y}  ${operations[Math.floor(Math.random() * operations.length)]} ${z}`
        userTime = 11;
    }else if (gameDifficulty == 'hard'){
        let x = Math.round(Math.random() * 10)
        let y = Math.round(Math.random() * 15)
        let z = Math.round(Math.random() * 15)
        let w = Math.round(Math.random() * 10)
        questionEl.innerHTML = `${x} ${operations[Math.floor(Math.random() * operations.length)]} ${y}  ${operations[Math.floor(Math.random() * operations.length)]} ${z} ${operations[Math.floor(Math.random() * operations.length)]} ${w}`
        userTime = 16;
    }
    putChoices();

}

function putChoices(){
    const questionEl = document.getElementById('gameQuestion');
    const answerText = questionEl.innerHTML.replace(/x/g, '*');
    const answer = eval(answerText);
    const aChoice = document.getElementById('a');
    const bChoice = document.getElementById('b');
    const cChoice = document.getElementById('c');
    const dChoice = document.getElementById('d');
    const ButtonsList = [aChoice,bChoice,cChoice,dChoice];

    const incorrectAnswers = [];
    while (incorrectAnswers.length < ButtonsList.length - 1) {
        const randomIncorrect = Math.floor(Math.random() * 200) - 100;
        if (!incorrectAnswers.includes(randomIncorrect)){
            incorrectAnswers.push(randomIncorrect);
        }
    }

    const randomIndex = Math.floor(Math.random() * ButtonsList.length);
    ButtonsList[randomIndex].innerHTML = answer;
    ButtonsList.forEach((but,ind) => {
        if (ind !== randomIndex){
            but.innerHTML = incorrectAnswers.pop();
        }
        but.setAttribute('onclick', `checkChoice(${answer}, ${but.innerHTML})`);
    });
}

function checkChoice(questionAns,choiceans){
    const userPointsEl = document.getElementById('userPoints');
    const bodyEl = document.querySelector('body');
    bodyEl.style.backgroundColor = 'green'
    if (questionAns == choiceans){
        userPoints ++;
        bodyEl.style.background = 'green'
    }else{
        userPoints --;
        bodyEl.style.background = 'red'
    }

        userPointsEl.innerHTML = `Points: ${userPoints}`
        setTimeout(() => {
            bodyEl.style.removeProperty('background')
        },200);
        
        makeQuestion();
}

function startTime(){
    if (userTime > 0){
        userTime --;
        const pointsEl = document.getElementById('userTime')
        pointsEl.innerHTML = `Time : ${userTime}`;
        setTimeout(()=>{
            startTime();
        },1000);
    }else{
        const gameScreen = document.querySelector('.game');
        gameScreen.style.display = 'none';
        const gameOverEl = document.querySelector('.gameOverScreen');
        gameOverEl.style.display = 'flex';
        const pointsEl = document.querySelector('#gameOverPoints');
        pointsEl.innerHTML = `Points: ${userPoints}`;
    }
}

function playAgain(){
    const gameOverEl = document.querySelector('.gameOverScreen');
    gameOverEl.style.display = 'none';
    userPoints = 0;
    userTime = 100;
    gameDifficulty = null;
    const difficultyScreen = document.querySelector('.difficultySelectScreen');
    difficultyScreen.style.display = 'flex';
}