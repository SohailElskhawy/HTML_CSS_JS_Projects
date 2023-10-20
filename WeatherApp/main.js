const myApi = '127668cb06e0b6c8af20839acf37c129'

let globalData;
async function searchButton() {
    try{
        const cityName = document.getElementById('cityNameInput').value;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${myApi}`;
        const response = await fetch(url);
        const data = await response.json();
        document.querySelector('.errorPopUp').style.display = 'none';
        document.querySelector('.card').style.display = 'flex';
        document.getElementById('cityNameTitle').style.display = 'block';
        globalData = data;
        // console.log(globalData);
        getData();
    }catch {
        document.getElementById('cityNameTitle').style.display = 'none';
        document.querySelector('.card').style.display = 'none';
        document.querySelector('.errorPopUp').style.display = 'flex';
    }
    
}

const d = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];

function getData(){
    const cityNameTitleEl = document.getElementById('cityNameTitle');
    cityNameTitleEl.innerHTML = globalData.city.name;
    const todayArray = globalData.list[0];
    const todayTitleEl = document.getElementById('todayTitle');
    todayTitleEl.innerHTML = days[d.getDay(todayArray.dt_txt)] + ` ${todayArray.dt_txt.slice(5,10).replace('-','/')}`;
    const weatherTodayIcon = document.getElementById('weatherTodayIcon');
    const mainWeather = todayArray.weather[0].main;
    if (mainWeather == 'Clouds' ){
        weatherTodayIcon.setAttribute('src', './assets/cloudy.svg')
    } else if (mainWeather == 'Clear'){
        weatherTodayIcon.setAttribute('src', './assets/clear-day.svg')
    }else if (mainWeather == 'Rain'){
        weatherTodayIcon.setAttribute('src', './assets/rain.svg')
    }else if (mainWeather == 'Drizzle'){
        weatherTodayIcon.setAttribute('src', './assets/drizzle.svg')
    }else if (mainWeather == 'Snow'){
        weatherTodayIcon.setAttribute('src', './assets/snow.svg')
    }
    const todayTemp = document.getElementById('todayTemp');
    todayTemp.innerHTML = Math.round(todayArray.main.temp - 273.15) + '°C';
    document.getElementById('todayWeather').innerHTML = mainWeather;

    const day1Data = globalData.list[8];
    const day2Data = globalData.list[16];
    const day3Data = globalData.list[24];
    const day4Data = globalData.list[32];
    const day5Data = globalData.list[39];
    const otherDays = [day1Data, day2Data, day3Data, day4Data, day5Data];
    console.log(otherDays.length);
    for(let i = 0; i < otherDays.length; i++){
        const dateStr = otherDays[i].dt_txt;
        const date = new Date(dateStr);
        const dayTitleEl = document.getElementById(`day${i}`);
        dayTitleEl.innerHTML = days[date.getDay()]; 
        const weather = otherDays[i].weather[0].main;
        const weatherIcon = document.getElementById(`day${i}Icon`);
        if (weather == 'Clouds' ){
            weatherIcon.setAttribute('src', './assets/cloudy.svg');
        } else if (weather == 'Clear'){
            weatherIcon.setAttribute('src', './assets/clear-day.svg');
        }else if (weather == 'Rain'){
            weatherIcon.setAttribute('src', './assets/rain.svg');
        }else if (weather == 'Drizzle'){
            weatherIcon.setAttribute('src', './assets/drizzle.svg');
        }else if (weather == 'Snow'){
            weatherIcon.setAttribute('src', './assets/snow.svg');
        }
        const dayTempEl = document.getElementById(`day${i}Temp`);
        dayTempEl.innerHTML =  Math.round(otherDays[i].main.temp - 273.15) + '°C';
    }

}

document.addEventListener('DOMContentLoaded', ()=>{
    const cityName = document.getElementById('cityNameInput');
    cityName.value = 'istanbul';
    searchButton();
    cityName.value = '';
})

document.addEventListener('keydown', event => {
    if (event.key == 'Enter'){
        searchButton();
    }
})

