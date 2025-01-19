//Get elements
const cityInput = document.getElementById('cityInput');
const btnSearch = document.getElementById('search');
const divResultsCurrent = document.getElementById('resultsCurrent');
const divResultsForecast = document.getElementById('resultsForecast');
const divCurrentTitle = document.getElementById('currentTitle');
const divForecastTitle = document.getElementById('forecastTitle');
const btnsRecentSearches = document.getElementById('recentSearches');
//API Key
const apiKey = '70a60e1ab06b68a17e3d748769c9f86a';
//Variable for request URL for city lat & lon
const requestGeoURL = `https://api.openweathermap.org/data/2.5/weather`;
//Variable for request URL for weather
const requestForecastURL = 'https://api.openweathermap.org/data/2.5/forecast';
//Function to create button for recent search
function createBtnRecentSearch(city) {
    //create button
    const btnEl = document.createElement('button');
    //set attributes
    btnEl.setAttribute('type', 'button');
    btnEl.setAttribute('class', 'btn btn-light mx-1');
    //set text
    btnEl.textContent = city;
    //append
    btnsRecentSearches.append(btnEl);
}
//Function to create current weather card
function createCardCurrentWeather(record) {
    //create elements
    const h4El = document.createElement('h4');
    const divCol = document.createElement('div');
    const divCard = document.createElement('div');
    const h5El = document.createElement('h5');
    const h6ElToday = document.createElement('h6');
    const divCardBody = document.createElement('div');
    const pElTemp = document.createElement('p');
    const pElTempFeelsLike = document.createElement('p');
    const pElWeatherDesc = document.createElement('p');
    const pElHumidity = document.createElement('p');
    const pElWeatherIcon = document.createElement('p');
    //set attributes
    divCol.setAttribute('class', 'col');
    divCard.setAttribute('class', 'card mx-4 my-4 shadow bg-body-tertiary rounded');
    h5El.setAttribute('class', 'card-header mb-2');
    h6ElToday.setAttribute('class', 'card-subtitle mt-1');
    divCardBody.setAttribute('class', 'card-body');
    h4El.setAttribute('class', 'ms-4 mt-4');
    //set text
    h4El.textContent = record.name;
    h5El.textContent = 'Now';
    h6ElToday.textContent = dayjs().format('dddd, MMMM D - h a');
    pElTemp.textContent = `Temp: ${Math.trunc(record.main.temp)} °`;
    pElTempFeelsLike.textContent = `Feels Like: ${Math.trunc(record.main.feels_like)} °`;
    pElWeatherDesc.textContent = `${record.weather[0].description}`;
    pElHumidity.textContent = `Humidity: ${record.main.humidity}`;
    pElWeatherIcon.textContent = record.weather[0].icon;
    //append
    divCardBody.append(pElTemp, pElTempFeelsLike, pElWeatherDesc, pElHumidity, pElWeatherIcon);
    h5El.append(h6ElToday);
    divCard.append(h5El, divCardBody);
    divCol.append(divCard)
    divCurrentTitle.append(h4El);
    divResultsCurrent.append(divCol);
}
//Function to create cards on webpage
function createCardsForcast(record) {
    //create elements
    const divCol = document.createElement('div');
    const divCard = document.createElement('div');
    const h5El = document.createElement('h5');
    const divCardBody = document.createElement('div');
    const pElTemp = document.createElement('p');
    const pElTempFeelsLike = document.createElement('p');
    const pElWeatherDesc = document.createElement('p');
    const pElHumidity = document.createElement('p');
    const pElWeatherIcon = document.createElement('p');
    //set attributes
    divCol.setAttribute('class', 'col');
    divCard.setAttribute('class', 'card mx-4 my-4 shadow bg-body-tertiary rounded');
    h5El.setAttribute('class', 'card-header mb-2');
    divCardBody.setAttribute('class', 'card-body');
    //set text
    h5El.textContent = `${dayjs(record.dt_txt).format('dddd - h a')}`;
    pElTemp.textContent = `High/Low: ${Math.trunc(record.main.temp_max)} ° / ${Math.trunc(record.main.temp_min)} °`;
    pElTempFeelsLike.textContent = `Feel Like: ${Math.trunc(record.main.feels_like)} °`;
    pElWeatherDesc.textContent = `${record.weather[0].description}`;
    pElHumidity.textContent = `Humidity: ${record.main.humidity}`;
    pElWeatherIcon.textContent = record.weather[0].icon;
    //append
    divCardBody.append(pElTemp, pElTempFeelsLike, pElWeatherDesc, pElHumidity, pElWeatherIcon);
    divCard.append(h5El, divCardBody);
    divCol.append(divCard)
    divResultsForecast.append(divCol);
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
            h4El.textContent = '5-Day Forecast:';
            divForecastTitle.append(h4El);
            //grab the forecast array from the data
            const arrayListForecast = data.list;
            console.log(arrayListForecast);
            //loop through forecase array and create cards
            arrayListForecast.forEach(record => createCardsForcast(record));
        })
        .catch(error => console.error('Error:', error));
}
//Event listeners
//On main search button
btnSearch.addEventListener('click', function(event) {
    if (cityInput.value === '') {
        event.preventDefault();
        divCurrentTitle.textContent = 'Please provide a city name for weather';
        divResultsCurrent.textContent = '';
        divForecastTitle.textContent = '';
        divResultsForecast.textContent = '';
    } else {
        //empty content to get ready
        divCurrentTitle.textContent = '';
        divResultsCurrent.textContent = '';
        divForecastTitle.textContent = '';
        divResultsForecast.textContent = '';
        
        event.preventDefault();
        //run function to get weather for city input
        getAPI(cityInput.value);
        //run function to create recent search button
        createBtnRecentSearch(cityInput.value);
    
        //empty cityInput content
        cityInput.value = '';
    }
});
//On dynamically created buttons
btnsRecentSearches.addEventListener('click', function(event) {
    //empty content to get ready
    divCurrentTitle.textContent = '';
    divResultsCurrent.textContent = '';
    divForecastTitle.textContent = '';
    divResultsForecast.textContent = '';
    
    event.preventDefault();
    //run function to get weather for city input
    getAPI(event.target.textContent);

    //empty cityInput content
    cityInput.value = '';
})