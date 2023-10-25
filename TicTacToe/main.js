let turn = 1; // (1 = X) ------ (-1 = O)
const allButtons = document.querySelectorAll('.game-button');
document.addEventListener('DOMContentLoaded', ()=>{
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.innerHTML === '') {
                if (turn === 1) {
                    button.innerHTML = 'X';
                    button.style.backgroundColor = '#52e5e722'
                    button.style.color = 'white'
                    turn = -1;
                    document.querySelector('.turn h3').innerHTML = "O's Turn";
                    document.body.style.backgroundImage = 'linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)'
                } else if (turn === -1) {
                    button.innerHTML = 'O';
                    button.style.backgroundColor = '#52e5e722'
                    button.style.color = 'white'
                    turn = 1;
                    document.querySelector('.turn h3').innerHTML = "X's Turn";
                    document.body.style.backgroundImage = 'linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%)'
                }
                checkWinner();
            }
        });
    });
})

const buttonList = [[allButtons[0],allButtons[1],allButtons[2]],
                    [allButtons[3],allButtons[4],allButtons[5]],
                    [allButtons[6],allButtons[7],allButtons[8]]];

function checkWinner(){
   // check winning by row
    let winner = 'no winner yet';
    for (let row of buttonList){
        const rowArray = row.map(cell => cell.innerHTML);
        if (rowArray.every(value => value === 'X')){
            winner = 'X'
        }else if (rowArray.every(value => value === 'O')){
            winner = 'O'
        }
        console.log(rowArray);
    }

        // check winning by col
        for (let col = 0; col < buttonList.length; col++){
            const tempArray = [];
            for (let row = 0; row < buttonList.length; row++){
                tempArray.push(buttonList[row][col])
            }
            if (tempArray.every(but => but.innerHTML === 'X')){
                winner = 'X'
            }else if (tempArray.every(but => but.innerHTML === 'O')){
                winner = 'O'
            }
            console.log(tempArray);
        }

        // check winning by  \   /

        if (buttonList[0][0].innerHTML == 'X' && buttonList[0][0].innerHTML == buttonList[1][1].innerHTML && buttonList[1][1].innerHTML == buttonList[2][2].innerHTML){
            winner = 'X'
        }
        else if (buttonList[0][0].innerHTML == 'O' && buttonList[0][0].innerHTML == buttonList[1][1].innerHTML && buttonList[1][1].innerHTML == buttonList[2][2].innerHTML){
            winner = 'O'
        }

        if (buttonList[0][2].innerHTML == 'X' && buttonList[0][2].innerHTML == buttonList[1][1].innerHTML && buttonList[1][1].innerHTML == buttonList[2][0].innerHTML){
            winner = 'X'
        }
        else if (buttonList[0][2].innerHTML == 'O' && buttonList[0][2].innerHTML == buttonList[1][1].innerHTML && buttonList[1][1].innerHTML == buttonList[2][0].innerHTML){
            winner = 'O'
        }
        
        
        if (winner !== 'no winner yet') {
            if (winner === 'X') {
                xWins();
            } else if (winner === 'O') {
                oWins();
            }
            return winner;
        }
    
        if (buttonList.every(row => row.every(button => button.innerHTML !== '')) && winner === 'no winner yet') {
            tie();
            return 'tie';
        }
    
        return winner;
}


function tie() {
    document.querySelector('.mainGame').style.display = 'none';
    document.querySelector('.turn h3').innerHTML = "";
    document.querySelector('.winnerTitle').style.display = 'block';
    document.querySelector('.winnerTitle').innerHTML = 'Its a tie';
    document.querySelector('.playAgainBut').style.display = 'block';
}

function xWins(){
    document.querySelector('.mainGame').style.display = 'none';
    document.querySelector('.turn h3').innerHTML = "";
    document.body.style.backgroundImage = 'linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%)'
    document.querySelector('.winnerTitle').style.display = 'block';
    document.querySelector('.winnerTitle').innerHTML = 'X wins'
    document.querySelector('.playAgainBut').style.display = 'block';


}

function oWins(){
    document.querySelector('.mainGame').style.display = 'none';
    document.querySelector('.turn h3').innerHTML = "";
    document.body.style.backgroundImage = 'linear-gradient( 135deg, #FEC163 10%, #DE4313 100%)'
    document.querySelector('.winnerTitle').style.display = 'block';
    document.querySelector('.winnerTitle').innerHTML = 'O wins'
    document.querySelector('.playAgainBut').style.display = 'block';

}

function newGame(){
    document.querySelector('.mainGame').style.display = 'flex';
    document.querySelector('.winnerTitle').style.display = 'none';
    document.querySelector('.playAgainBut').style.display = 'none';
    turn = 1;
    allButtons.forEach(but => {
        but.innerHTML = '';
    })
    
    document.querySelector('.turn h3').innerHTML = "X's Turn";
    allButtons.forEach(but => {
        but.style.backgroundColor = ''; // Reset the background color
    });
    document.body.style.backgroundImage = 'linear-gradient( 135deg, #52E5E7 10%, #130CB7 100%)';
}