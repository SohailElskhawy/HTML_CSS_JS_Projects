const moviesList = [];
document.addEventListener('DOMContentLoaded', async ()=>{
    await getMovies();
    orginizeMovies()
})


async function getMovies() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzkyMDA2YWJlYzE3YzA2MDA4MGU5MDQ3YzcyOTU0YSIsInN1YiI6IjY1MWVjY2YzNzQ1MDdkMDBhYzQ3ZDk4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eBTibemBx-8jxUpHTcPV7t3M7vaMiiZiubdL4DH-XDE",
        },
    };

    let pageNum = 8;
    for (let i = 1; i < pageNum + 1; i++) {
        try {
            let url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`;
            const response = await fetch(url, options);
            data = await response.json();
            moviesList.push(data.results);
        } catch (error) {
            console.log("error: ", error);
        }
    }
}


function orginizeMovies(){
    const movieArea = document.querySelector('.moviesArea');
    let url = "https://image.tmdb.org/t/p/original";
    for (let page = 0; page<moviesList.length; page++){
        const moviePage = moviesList[page];
        for (let j = 0; j < moviePage.length; j++){
            const movieFrame = document.createElement('div');
            movieFrame.className = 'movieFrame';
            const movieImg = document.createElement('img');
            movieImg.src = `${url}${moviePage[j].poster_path}`
            const movieDetails = document.createElement('div');
            movieDetails.className = 'movieDetails';
            movieDetails.innerHTML = `<p>${moviePage[j].title}</p>`;
            const moviesOverview = document.createElement('p');
            moviesOverview.className = 'movieOverview';
            moviesOverview.innerText = moviePage[j].overview;
            movieDetails.appendChild(moviesOverview);
            movieFrame.appendChild(movieImg);
            movieFrame.appendChild(movieDetails);
            movieFrame.addEventListener('click', function(){
                movieData(moviePage[j]);
            })
            movieArea.appendChild(movieFrame)
        }
    }
}

async function getMovieTrailer(id){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzkyMDA2YWJlYzE3YzA2MDA4MGU5MDQ3YzcyOTU0YSIsInN1YiI6IjY1MWVjY2YzNzQ1MDdkMDBhYzQ3ZDk4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eBTibemBx-8jxUpHTcPV7t3M7vaMiiZiubdL4DH-XDE'
        }
    };
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    try{
        const response = await fetch(url,options);
        const data = await response.json();
        const results = data.results;
        const trailerObject = results.find(obj => obj.type == 'Trailer' && obj.site == 'YouTube');
        const videoKey = trailerObject.key;
        const outputUrl = `https://www.youtube.com/embed/${videoKey}`;
        return outputUrl;
    }catch(error){
        console.log(error)
    }



}


async function movieData(obj){
    document.querySelector('.moviesArea').style.display = 'none';
    document.querySelector('header').style.display = 'none'
    document.querySelector('.movieDiv').style.display = 'flex';
    document.querySelector('.movieTitle').innerHTML = obj.title;
    const url = await getMovieTrailer(obj.id);
    document.querySelector('iframe').src = url;
    document.querySelector('.movieDescrip').innerHTML = obj.overview;
}

function removeMovieDiv(){
    const movieDiv = document.querySelector('.movieDiv');
    movieDiv.style.display = 'none';
    movieDiv.querySelector('iframe').src = '';
    document.querySelector('header').style.display = 'block';
    document.querySelector('.moviesArea').style.display = 'grid';
}


function filterMovies(){
    const userInput = document.querySelector('.movieSearch').value.toLowerCase();
    const allMovies = document.querySelectorAll('.movieFrame');
    allMovies.forEach(movie => {
        const movieName = movie.querySelector('.movieDetails p').innerText.toLowerCase();
        if (movieName.includes(userInput)){
            movie.style.display = 'block';
        }else{
            movie.style.display = 'none';
        }
    });
}