function writeNumber(num){
    const place1El = document.querySelector('.place1');
    if (num === '.') {
        if (place1El.innerHTML.length === 0){
            place1El.innerHTML += '0' + num;
        }else if (!place1El.innerHTML.includes('.')) {
            place1El.innerHTML += num;
        }
    }
    else if (place1El.innerHTML.length < 15){
        place1El.innerHTML += num
    }
}

function clearPlace(){
    const place1El = document.querySelector('.place1');
    const place2El = document.querySelector('.place2');
    place1El.innerHTML = '';
    place2El.innerHTML = '';
}

function writeQuestion(sym){
    const place1El = document.querySelector('.place1');
    const place2El = document.querySelector('.place2');
    if (place1El.innerHTML.length >= 1 && place1El.innerHTML !== '.'){
        place2El.innerHTML += place1El.innerHTML + sym;
        place1El.innerHTML = ''
    }

}

function writeAnswer(){
    const place1El = document.querySelector('.place1');
    const place2El = document.querySelector('.place2');
    const equation = place2El.innerHTML + place1El.innerHTML;
    const answer =  equation.replace('x', '*');
    place2El.innerHTML = '';
    place1El.innerHTML = eval(answer);
}

function ceButton() {
    const place2El = document.querySelector('.place2');
    place2El.innerHTML = '';
}