let pomodoros;
let isTiming;
let settingsSeconds;
document.addEventListener('DOMContentLoaded', () =>{
    pomodoros = 1;
    but1();
    document.querySelector('#pomodoroCounter').innerHTML = `Pomodoro : ${pomodoros}`
    isTiming = false;
});

function settingsBut(){
    const settingsPopUp = document.querySelector('.sittingsScreen');
    settingsPopUp.style.display = 'flex'

}
function saveButton(){
    const bodyEl = document.querySelector('body');
    const computedStyle = window.getComputedStyle(bodyEl);
    const backgroundColor = computedStyle.backgroundColor;
    const settingsPopUp = document.querySelector('.sittingsScreen');
    settingsPopUp.style.display = 'none'
    if (backgroundColor == 'rgb(186, 73, 73)'){
        but1() 
    }else if (backgroundColor == 'rgb(56, 133, 138)'){
        but2();
    }else if (backgroundColor == 'rgb(57, 112, 151)'){
        but3();
    }
}

function but1(){
    let seconds = Number(document.querySelector('#pomodoroM').value) * 60;
    let minutes = Math.floor(seconds / 60)
    let secondsLeft = seconds % 60
    settingsSeconds = Number(document.querySelector('#pomodoroM').value) * 60;
    document.querySelector('#longBreakBut').style.backgroundColor = '#ffffff00';
    document.querySelector('#breakBut').style.backgroundColor  = '#ffffff00';
    document.querySelector('#pomodoroBut').style.backgroundColor = 'rgba(0, 0, 0, 0.467)';
    document.querySelector('body').style.backgroundColor = 'rgb(186, 73, 73)';
    document.querySelector('.timeClock').innerHTML = `${minutes}:0${secondsLeft}`;
    document.querySelector(".startButton").style.display = 'block';
    document.querySelector('.startButton').style.color = 'rgb(186, 73, 73)';
    document.querySelector(".pauseButton").style.display = 'none';
    document.querySelector(".pauseButton").style.color = 'rgb(186, 73, 73)';
}


function but2(){
    let seconds = Number(document.querySelector('#breakM').value) * 60;
    let minutes = Math.floor(seconds / 60)
    let secondsLeft = seconds % 60
    settingsSeconds = Number(document.querySelector('#breakM').value) * 60;
    document.querySelector('#pomodoroBut').style.backgroundColor = '#ffffff00';
    document.querySelector('#longBreakBut').style.backgroundColor = '#ffffff00';
    document.querySelector('#breakBut').style.backgroundColor = 'rgba(0, 0, 0, 0.467)';
    document.querySelector('body').style.backgroundColor = 'rgb(56, 133, 138)';
    document.querySelector('.timeClock').innerHTML = `0${minutes}:0${secondsLeft}`;
    document.querySelector(".startButton").style.display = 'block';
    document.querySelector('.startButton').style.color = 'rgb(56, 133, 138)';
    document.querySelector(".pauseButton").style.display = 'none';
    document.querySelector(".pauseButton").style.color = 'rgb(56, 133, 138)';
}

function but3(){
    let seconds = Number(document.querySelector('#longBreakM').value) * 60;
    let minutes = Math.floor(seconds / 60)
    let secondsLeft = seconds % 60
    settingsSeconds = Number(document.querySelector('#longBreakM').value) * 60;
    document.querySelector('#pomodoroBut').style.backgroundColor = '#ffffff00';
    document.querySelector('#longBreakBut').style.backgroundColor = 'rgba(0, 0, 0, 0.467)';
    document.querySelector('#breakBut').style.backgroundColor = '#ffffff00';
    document.querySelector('body').style.backgroundColor = 'rgb(57, 112, 151)';
    document.querySelector('.timeClock').innerHTML = `${minutes}:0${secondsLeft}`;
    document.querySelector(".startButton").style.display = 'block';
    document.querySelector('.startButton').style.color = 'rgb(57, 112, 151)';
    document.querySelector(".pauseButton").style.display = 'none';
    document.querySelector(".pauseButton").style.color = 'rgb(57, 112, 151)';
}

let realSeconds;
function startTime(){
    isTiming = true;
    document.querySelector(".startButton").style.display = 'none';
    document.querySelector(".pauseButton").style.display = 'block';
    const bodyEl = document.querySelector('body');
    const computedStyle = window.getComputedStyle(bodyEl);
    const backgroundColor = computedStyle.backgroundColor;

    let seconds;
    if (!realSeconds){
        if (backgroundColor == 'rgb(186, 73, 73)'){
            seconds = Number(document.querySelector('#pomodoroM').value) * 60;
        }else if (backgroundColor == 'rgb(56, 133, 138)'){
            seconds = Number(document.querySelector('#breakM').value) * 60;
        }else if (backgroundColor == 'rgb(57, 112, 151)'){
            seconds = Number(document.querySelector('#longBreakM').value) * 60;
        }
        tikTak(seconds);
    }else if (realSeconds < settingsSeconds){
        isTiming = true;
        tikTak(realSeconds);
    }
    
    console.log(settingsSeconds);
    console.log(realSeconds);
}

function tikTak(seconds){
    realSeconds = seconds;
    let minutes;
    let secondsLeft;
    const bodyEl = document.querySelector('body');
    const computedStyle = window.getComputedStyle(bodyEl);
    const backgroundColor = computedStyle.backgroundColor;
    const timeEl = document.querySelector('.timeClock');
    if (realSeconds > 0 && isTiming){
        setTimeout(() =>{
            realSeconds -= 1
            minutes = Math.floor(realSeconds / 60);
            secondsLeft = realSeconds % 60;
            if (minutes < 10 && secondsLeft < 10){
                timeEl.innerHTML = `0${minutes}:0${secondsLeft}`;
            }else if (minutes < 10 && secondsLeft >= 10){
                timeEl.innerHTML = `0${minutes}:${secondsLeft}`;
            }else if (minutes >= 10 && secondsLeft < 10){
                timeEl.innerHTML = `${minutes}:0${secondsLeft}`;
            }else{
                timeEl.innerHTML = `${minutes}:${secondsLeft}`;
            }
            tikTak(realSeconds);
        }, 1000);
    }else if(realSeconds == 0){
        isTiming = false;
        let sound = new Audio('/ding-idea-40142.mp3');
        sound.play();

        if (backgroundColor == 'rgb(186, 73, 73)'){
            pomodoros += 1;
            document.querySelector('#pomodoroCounter').innerHTML = `Pomodoro : ${pomodoros}`
            but2(); 
        }else if (backgroundColor == 'rgb(56, 133, 138)'){
            if (pomodoros != document.querySelector('#pomodorosCount').value){
                but1();
            }else{
                but3();
            }
        }else if (backgroundColor == 'rgb(57, 112, 151)'){
            but1();
            pomodoros = 1;
        }
    }

}

function pauseTime(){
    isTiming = false;
    document.querySelector(".startButton").style.display = 'block';
    document.querySelector(".pauseButton").style.display = 'none';
    console.log(settingsSeconds);
    console.log(realSeconds);
}


