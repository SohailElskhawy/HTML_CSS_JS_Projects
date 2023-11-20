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
            movieFrame.appendChild(movieImg);
            movieArea.appendChild(movieFrame)
        }
    }
    
    
}