const generateQuoteButton = document.getElementById('new-quote');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
async function getQuote() {
    const url = 'https://famous-quotes4.p.rapidapi.com/random?category=inspirational&count=1';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a047aef7e3msh2051ef95ff25d98p108d3cjsn3f90ac6f2a9c',
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        quoteText.innerHTML = `"${result[0].text}"`;
        quoteAuthor.innerHTML = `- ${result[0].author}`;
    } catch (error) {
        console.error(error);
    }
    }
generateQuoteButton.addEventListener('click', getQuote);
