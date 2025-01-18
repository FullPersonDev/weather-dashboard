//Get elements
const cityInput = document.getElementById('cityInput');
const btnSearch = document.getElementById('search');
const divResults = document.getElementById('results');
//API Key
const apiKey = '70a60e1ab06b68a17e3d748769c9f86a';
//Variable for request URL for city lat & lon
const requestGeoURL = `https://api.openweathermap.org/data/2.5/weather`;
//Variable for request URL for weather
const requestForecastURL = 'https://api.openweathermap.org/data/2.5/forecast';
//Function to create current weather card
function createCardCurrentWeather(record) {
    //create elements
    const divEl = document.createElement('div');
    const h5El = document.createElement('h5');
    const pElTemp = document.createElement('p');
    const pElTempFeelsLike = document.createElement('p');
    const pElHumidity = document.createElement('p');
    const pElWeatherDesc = document.createElement('p');
    const pElWeatherIcon = document.createElement('p');
    //set attributes
    divEl.setAttribute('class', 'card');
    //set text
    h5El.textContent = record.name;
    pElTemp.textContent = `Current Temp: ${record.main.temp}`;
    pElTempFeelsLike.textContent = `Feels Like: ${record.main.feels_like}`;
    pElHumidity.textContent = `Humidity: ${record.main.humidity}`;
    pElWeatherDesc.textContent = `Description: ${record.weather[0].description}`;
    pElWeatherIcon.textContent = record.weather[0].icon;
    //append
    divEl.append(h5El, pElTemp, pElTempFeelsLike, pElHumidity, pElWeatherDesc, pElWeatherIcon);
    divResults.append(divEl);
}
//Function to create cards on webpage
function createCards() {

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
            console.log(data);
            const cityLat = data.coord.lat;
            const cityLon = data.coord.lon;
            console.log(cityLat+' and '+cityLon);
            return fetch(`${requestForecastURL}?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`);
        })
        .then(response => {
            if(!response.ok) {
                throw new Error(`Response Error. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
//Event listener
btnSearch.addEventListener('click', function(event) {
    event.preventDefault();
    getAPI(cityInput.value);
});