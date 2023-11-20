const hangmanStages = 
['./assets/0.png',
'./assets/1.png',
'./assets/2.png',
'./assets/3.png',
'./assets/4.png',
'./assets/5.png',
'./assets/6.png']

document.addEventListener('DOMContentLoaded', async ()=>{
    document.querySelector('.hangmanPic').src = hangmanStages[0]
    const keyboardEl = document.querySelector('.keyboard');
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    alphabets.forEach(letter =>{
        const button = document.createElement('button')
        button.className = 'letterBut';
        button.innerHTML = letter;
        keyboardEl.appendChild(button);
    });

    await playGame();    
});

async function playGame(){
    const RandomwordData = await getRandomWord();
    const wordData = await getWordDef(RandomwordData.word);
    console.log(wordData);
}




async function getRandomWord(){
    const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a047aef7e3msh2051ef95ff25d98p108d3cjsn3f90ac6f2a9c',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return result; 
} catch (error) {
	console.error(error);
}
}

async function getWordDef(word){
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a047aef7e3msh2051ef95ff25d98p108d3cjsn3f90ac6f2a9c',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	return result
} catch (error) {
	console.error(error);
}
}
