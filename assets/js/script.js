//Get elements
const cityInput = document.getElementById('cityInput');
const btnSearch = document.getElementById('search');
const divResultsCurrent = document.getElementById('resultsCurrent');
const divResultsForecast = document.getElementById('resultsForecast');
const divCurrentTitle = document.getElementById('currentTitle');
const divForecastTitle = document.getElementById('forecastTitle');
//API Key
const apiKey = '70a60e1ab06b68a17e3d748769c9f86a';
//Variable for request URL for city lat & lon
const requestGeoURL = `https://api.openweathermap.org/data/2.5/weather`;
//Variable for request URL for weather
const requestForecastURL = 'https://api.openweathermap.org/data/2.5/forecast';
//Function to create current weather card
function createCardCurrentWeather(record) {
    //create elements
    const h4El = document.createElement('h4');
    const divEl = document.createElement('div');
    const h5El = document.createElement('h5');
    const pElTemp = document.createElement('p');
    const pElTempFeelsLike = document.createElement('p');
    const pElWeatherDesc = document.createElement('p');
    const pElHumidity = document.createElement('p');
    const pElWeatherIcon = document.createElement('p');
    //set attributes
    divEl.setAttribute('class', 'card ms-4 me-4 my-4');
    h5El.setAttribute('class', 'card-header mb-2');
    h4El.setAttribute('class', 'ms-4 mt-4');
    //set text
    h4El.textContent = record.name;
    h5El.textContent = 'Today';
    pElTemp.textContent = `Temp: ${Math.trunc(record.main.temp)}`;
    pElTempFeelsLike.textContent = `Feels Like: ${Math.trunc(record.main.feels_like)}`;
    pElWeatherDesc.textContent = `Description: ${record.weather[0].description}`;
    pElHumidity.textContent = `Humidity: ${record.main.humidity}`;
    pElWeatherIcon.textContent = record.weather[0].icon;
    //append
    divEl.append(h5El, pElTemp, pElTempFeelsLike, pElWeatherDesc, pElHumidity, pElWeatherIcon);
    divCurrentTitle.append(h4El);
    divResultsCurrent.append(divEl);
}
//Function to create cards on webpage
function createCardsForcast(record) {
    //create elements
    const divEl = document.createElement('div');
    const h5El = document.createElement('h5');
    const pElTemp = document.createElement('p');
    const pElTempFeelsLike = document.createElement('p');
    const pElWeatherDesc = document.createElement('p');
    const pElHumidity = document.createElement('p');
    const pElWeatherIcon = document.createElement('p');
    //set attributes
    divEl.setAttribute('class', 'card ms-4 me-4 my-4');
    h5El.setAttribute('class', 'card-header mb-2');
    //set text
    h5El.textContent = `${dayjs(record.dt_txt).format('dddd - h:mm a')}`;
    pElTemp.textContent = `Temp: ${Math.trunc(record.main.temp)}`;
    pElTempFeelsLike.textContent = `Feels Like: ${Math.trunc(record.main.feels_like)}`;
    pElWeatherDesc.textContent = `Description: ${record.weather[0].description}`;
    pElHumidity.textContent = `Humidity: ${record.main.humidity}`;
    pElWeatherIcon.textContent = record.weather[0].icon;
    //append
    divEl.append(h5El, pElTemp, pElTempFeelsLike, pElWeatherDesc, pElHumidity, pElWeatherIcon);
    divResultsForecast.append(divEl);
}
//Function to fetch api data
function getAPI(city) {
    fetch(`${requestGeoURL}?q=${city}&appid=${apiKey}&units=imperial`)
        .then(response => {
            if(!response.ok) {
                throw new Error(`Response Error. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            createCardCurrentWeather(data);
            const cityLat = data.coord.lat;
            const cityLon = data.coord.lon;
            console.log(data);
            console.log(cityLat+' and '+cityLon);
            return fetch(`${requestForecastURL}?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`);
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(`Response Error. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            //create forecast title element, set attributes and text, and append
            const h4El = document.createElement('h4');
            h4El.setAttribute('class', 'ms-4 mt-4');
            h4El.textContent = 'Forecast:';
            divForecastTitle.append(h4El);
            //grab the forecast array from the data
            const arrayListForecast = data.list;
            console.log(arrayListForecast);
            //loop through forecase array and create cards
            arrayListForecast.forEach(record => createCardsForcast(record));
        })
        .catch(error => console.error('Error:', error));
}
//Event listener
btnSearch.addEventListener('click', function(event) {
    //empty content to get ready
    divCurrentTitle.textContent = '';
    divResultsCurrent.textContent = '';
    divForecastTitle.textContent = '';
    divResultsForecast.textContent = '';
    
    event.preventDefault();
    getAPI(cityInput.value);

    //empty cityInput content
    cityInput.value = '';
});