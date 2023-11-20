const hangmanStages = 
['./assets/0.png',
'./assets/1.png',
'./assets/2.png',
'./assets/3.png',
'./assets/4.png',
'./assets/5.png',
'./assets/6.png']

document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('.hangmanPic').src = hangmanStages[0]
    const keyboardEl = document.querySelector('.keyboard');
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    alphabets.forEach(letter =>{
        const button = document.createElement('button')
        button.className = 'letterBut';
        button.innerHTML = letter;
        keyboardEl.appendChild(button);
    });
});


async function playGame(){
    
}


