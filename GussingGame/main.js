let points = 0
document.addEventListener("DOMContentLoaded", async () => {
    document.querySelector(".choiceGameMode").style.display = "flex";
    document.querySelector(".mainGame").style.display = "none";
    document.querySelector(".hintButton").style.display = "none";
    await getMovies();
    await getGames();
    document.querySelector('.userPoints').innerHTML = `Points: ${points}`
});
let difficulty = 6;
let gameMode;


const moviesList = [];
async function getMovies() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer apiKey",
        },
    };

    let pageNum = 6;
    for (let i = 1; i < pageNum; i++) {
        try {
            let url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`;
            const response = await fetch(url, options);
            data = await response.json();
            moviesList.push(data.results);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    console.log(moviesList);
}

const gamesList = [];
async function getGames() {
    let pageNum = 6;
    const apiKey = "";
    for (let i = 1; i < pageNum; i++) {
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games?token&key=${apiKey}&page=${i}`
            );
            const data = await response.json();
            gamesList.push(data.results);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(gamesList);
}

function getImg(mode) {
    document.querySelector(".hintButton").style.display = "block";
    document.querySelector(".choiceGameMode").style.display = "none";
    document.querySelector(".mainGame").style.display = "flex";
    document.querySelector('.answer').style.opacity = 0;
    const hintLabelEl = document.querySelector(".hintLabel");
    hintLabelEl.innerHTML = "";
    hintLabelEl.style.width = "0";
    hintLabelEl.style.height = "0";
    difficulty = 6;

    if (mode == "movies") {
        gameMode = "movies";
        let url = "https://image.tmdb.org/t/p/original";
        let randomList = Math.floor(Math.random() * moviesList.length);
        let randomMovie = Math.floor(Math.random() * 20);
        const imgEl = document.querySelector(".myimg");
        let movie = moviesList[randomList][randomMovie];
        console.log(movie.title);
        imgEl.setAttribute("src", `${url}${movie.poster_path}`);
        imgEl.style.width = "200px";
        imgEl.style.filter = `blur(${difficulty}px)`;
        document
            .querySelector(".guessBut")
            .setAttribute("onclick", `guessMovie('${movie.title.replace("'", "")}')`);
        document
            .querySelector(".hintButton")
            .setAttribute("onclick", `showHint("${movie.overview}")`);
    }
    if (mode == "games") {
        gameMode = "games";
        let randomList = Math.floor(Math.random() * gamesList.length);
        let randomGame = Math.floor(Math.random() * 20);
        const imgEl = document.querySelector(".myimg");
        let game = gamesList[randomList][randomGame];
        console.log(game.name);
        imgEl.setAttribute("src", `${game.background_image}`);
        imgEl.style.width = "550px";
        imgEl.style.filter = `blur(${difficulty}px)`;
        document
            .querySelector(".guessBut")
            .setAttribute("onclick", `guessMovie("${game.name}")`);
        document
            .querySelector(".hintButton")
            .setAttribute(
                "onclick",
                `showHint("First Charachter: ${game.name[0]}, Last Charachter: ${game.name[game.name.length - 1]
                }")`
            );
    }
    if (mode == "mix") {
        gameMode = "mix";
        const randomNum = Math.floor(Math.random() * 2);
        if (randomNum == 0) {
            getImg("games");
        } else {
            getImg("movies");
        }
    }
}

function guessMovie(title) {
    const userGuess = document.querySelector(".userInput").value.toLowerCase();
    const imgEl = document.querySelector(".myimg");
    title = title.toLowerCase();
    if (userGuess == title || title[0]  == userGuess[0] || title.split(" ").length == userGuess.split(" ").length) {
        console.log("Correct");
        document.body.style.backgroundImage =
            " linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)";
        document.querySelector(".answer").style.opacity = 1;
        document.querySelector(".answer").innerHTML = "Correct";
        setTimeout(() => {
            document.querySelector(".answer").style.opacity = 0;
            document.body.style.backgroundImage =
                "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)";
        }, 500);
        if (gameMode == "mix") {
            getImg("mix");
        } else {
            getImg(gameMode);
        }
        document.querySelector(".userInput").value = "";
        points += 1
        document.querySelector('.userPoints').innerHTML = `Points: ${points}`
    } else {
        console.log("Wrong");
        document.body.style.backgroundImage =
            "linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)";
        difficulty -= 2;
        imgEl.style.filter = `blur(${difficulty}px)`;
        document.querySelector(".answer").innerHTML = "Wrong";
        document.querySelector(".answer").style.opacity = 1;
        setTimeout(() => {
            document.querySelector(".answer").style.opacity = 0;
            document.body.style.backgroundImage =
                "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)";
        }, 500);

        if (difficulty <= 0) {
            document.querySelector(".answer").style.opacity = 1;
            document.querySelector(".answer").innerHTML = title;
        }
    }
}

function showHint(hint) {
    const hintLabelEl = document.querySelector(".hintLabel");
    hintLabelEl.style.width = "300px";
    hintLabelEl.style.height = "fit-content";
    hintLabelEl.innerHTML = hint;
    hintLabelEl.style.padding = "5px";
}
