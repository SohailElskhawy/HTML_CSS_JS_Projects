const hangmanStages =
    ['./assets/0.png',
        './assets/1.png',
        './assets/2.png',
        './assets/3.png',
        './assets/4.png',
        './assets/5.png',
        './assets/6.png']
let hangmanStage = 0;
document.addEventListener('DOMContentLoaded', async () => {
    document.querySelector('.hangmanPic').src = hangmanStages[hangmanStage]
    const keyboardEl = document.querySelector('.keyboard');
    const alphabets = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    alphabets.forEach(letter => {
        const button = document.createElement('button')
        button.className = 'letterBut';
        button.innerHTML = letter;
        keyboardEl.appendChild(button);
    });

    playGame();
});

function playGame() {
    const word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    const wordEl = document.querySelector('.word');
    wordEl.innerHTML = '';
    for(let i = 0; i<word.word.length; i++){
        wordEl.innerHTML = wordEl.innerHTML + '_'
    }
    const hintEl = document.querySelector('.hint');
    hintEl.innerHTML = "Hint: "+ word.hint;

    const keyboard = document.querySelector('.keyboard');
    const allButtons = keyboard.querySelectorAll('button');
    allButtons.forEach(but => {
        but.setAttribute('onclick', `checkLetter('${word.word}','${but.innerHTML}')`)
    })
}


function checkLetter(word,letter){
    if(!word.includes(letter)){
        hangmanStage+=1
        document.querySelector('.hangmanPic').src = hangmanStages[hangmanStage]
        const keyboardEl = document.querySelector('.keyboard');
    }
}





const words = [
    {
        word: "elephant",
        hint: "Large land mammal with a trunk"
    },
    {
        word: "computer",
        hint: "Electronic device used for processing data"
    },
    {
        word: "giraffe",
        hint: "Tall African mammal with a long neck"
    },
    {
        word: "oxygen",
        hint: "Element necessary for human breathing"
    },
    {
        word: "volcano",
        hint: "Mountain that erupts lava"
    },
    {
        word: "astronaut",
        hint: "Person who travels to space"
    },
    {
        word: "zookeeper",
        hint: "Person who cares for animals in a zoo"
    },
    {
        word: "telephone",
        hint: "Device used for voice communication"
    },
    {
        word: "butterfly",
        hint: "Insect with colorful wings"
    },
    {
        word: "pineapple",
        hint: "Tropical fruit with a spiky skin"
    },
    {
        word: "mountain",
        hint: "Tall landform rising above its surroundings"
    },
    {
        word: "umbrella",
        hint: "Device used for protection against rain"
    },
    {
        word: "watermelon",
        hint: "Large, sweet fruit with green rind"
    },
    {
        word: "football",
        hint: "Sport played with a round ball and feet"
    },
    {
        word: "penguin",
        hint: "Flightless bird found in cold climates"
    },
    {
        word: "bicycle",
        hint: "Two-wheeled vehicle powered by pedaling"
    },
    {
        word: "octopus",
        hint: "Sea creature with eight tentacles"
    },
    {
        word: "piano",
        hint: "Musical instrument with black and white keys"
    },
    {
        word: "fireworks",
        hint: "Displays of explosions in the sky"
    },
    {
        word: "caterpillar",
        hint: "Insect that transforms into a butterfly"
    },
    {
        word: "jigsaw",
        hint: "Puzzle with irregularly shaped pieces"
    },
    {
        word: "library",
        hint: "Place with books for borrowing or reading"
    },
    {
        word: "rainbow",
        hint: "Spectrum of light seen after rain"
    },
    {
        word: "sunflower",
        hint: "Plant with large yellow flowers"
    },
    {
        word: "guitar",
        hint: "Stringed musical instrument"
    },
    {
        word: "puzzle",
        hint: "Game or problem that tests ingenuity"
    },
    {
        word: "helicopter",
        hint: "Aircraft with spinning blades on top"
    },
    {
        word: "astronomy",
        hint: "Study of celestial objects and space"
    },
    {
        word: "chocolate",
        hint: "Sweet, brown treat made from cocoa"
    },
    {
        word: "cactus",
        hint: "Plant adapted to dry climates"
    },
    {
        word: "whale",
        hint: "Large marine mammal"
    },
    {
        word: "kangaroo",
        hint: "Australian animal known for hopping"
    },
    {
        word: "telescope",
        hint: "Instrument used for viewing distant objects"
    },
    {
        word: "spider",
        hint: "Arachnid with eight legs"
    },
    {
        word: "campfire",
        hint: "Outdoor fire for warmth or cooking"
    },
    {
        word: "oasis",
        hint: "Fertile spot in a desert with water"
    },
    {
        word: "dragon",
        hint: "Mythical creature with wings and scales"
    },
    {
        word: "robot",
        hint: "Automated machine that performs tasks"
    },
    {
        word: "raincoat",
        hint: "Waterproof garment worn in wet weather"
    },
    {
        word: "carousel",
        hint: "Merry-go-round or amusement ride"
    },
    {
        word: "pizza",
        hint: "Italian dish with dough and toppings"
    },
    {
        word: "fishing",
        hint: "Activity of catching aquatic animals"
    },
    {
        word: "skyscraper",
        hint: "Tall building with many floors"
    },
    {
        word: "crystal",
        hint: "Transparent mineral with geometric shapes"
    },
    {
        word: "toucan",
        hint: "Colorful bird with a large beak"
    },
    {
        word: "tornado",
        hint: "Violent rotating column of air"
    },
    {
        word: "moonlight",
        hint: "Light from the moon"
    },
    {
        word: "dinosaur",
        hint: "Extinct reptile from prehistoric times"
    },
    {
        word: "vampire",
        hint: "Mythical creature that drinks blood"
    },
    {
        word: "treasure",
        hint: "Valuable items hidden or buried"
    },
    {
        word: "robot",
        hint: "Automated machine that performs tasks"
    }
    
];



