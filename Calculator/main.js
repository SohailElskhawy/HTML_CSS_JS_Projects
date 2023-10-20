document.addEventListener('DOMContentLoaded', () => {
    const allButtons = document.querySelectorAll('.number');
    allButtons.forEach(but =>{
        but.setAttribute('onclick', `writeNumber('${but.innerHTML}')`)
    })
})


function writeNumber(num){
    const place1El = document.querySelector('.writingPlace');
    const operationList = ['+', '-', '*', '/', '.'];
    if (operationList.includes(num) && place1El.innerHTML.length == 0) {
        return false;
    }else{
        place1El.innerHTML += num;
    }

}

function clearPlace(){
    const writingPlaceEl = document.querySelector('.writingPlace');
    writingPlaceEl.innerHTML = ''
}



function writeAnswer(){
    const writingPlaceEl = document.querySelector('.writingPlace');

    const answer =  writingPlaceEl.innerHTML
   
    writingPlaceEl.innerHTML = eval(answer);
}

function deButton() {
    const writingPlaceEl = document.querySelector('.writingPlace');
    const currentText = writingPlaceEl.innerHTML;
    if(currentText.length > 0){
        writingPlaceEl.innerHTML = currentText.slice(0,-1);   
    }
}
