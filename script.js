//Variables that reference the html elements
var searchBtn = document.getElementById('searchbtn');
var cityInput = document.getElementById('cityinput');
var recentSearchDiv = document.getElementById('recentsearch');
var cityResult = document.getElementById('cityresult');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var fiveDayDiv = document.getElementById('fiveday');

//Function to fetch API url data and return it as json
function getAPI() {
    //This block of code; including cityValue variable, requestURL,
    //and fetch function work to get the lat and lon of a city name input.
    cityValue = cityInput.value;
    //Variable to capture the API URL
    var apiKey = '70a60e1ab06b68a17e3d748769c9f86a'
    var requestURLGeo = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityValue+'&limit=1&appid='+apiKey;
    
    fetch(requestURLGeo)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log(lat);
        console.log(lon);

        //This block of code creates the second API fetch request based on variables from the first API fetch.
        //This block of code is getting the weather of the city input.
        var requestURLWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+apiKey+'&units=imperial';

        return fetch(requestURLWeather);
        })
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        //Grabs the temp, wind, humidity values from the API fetch and places them into the webpage:
        var tempResult = data.list[0].main.temp;
        var humidityResult = data.list[0].main.humidity;
        var windResult = data.list[0].wind.speed;
        var dateResult = data.list[0].dt_txt;

        temp.textContent = tempResult + ' ℉';
        wind.textContent = windResult + ' MPH';
        humidity.textContent = humidityResult + ' %';

        //Adds city input into weather stats div
        cityResult.textContent = cityValue;
    
        //Adds city input into the recent searched cities, as a button
        var cityRecentItem = document.createElement('button');
        cityRecentItem.textContent = cityValue;
        recentSearchDiv.appendChild(cityRecentItem);

        //Display 5-day forecast
        displayFiveDayForecast(data.list);
    });
}

function displayFiveDayForecast(fiveDayData) {
    //Clears previous forecast
    fiveDayDiv.innerHTML = '';

    //Add a title for the 5-day Forecast
    var title = document.createElement('h3');
    title.textContent = '5-Day Forecast:';
    fiveDayDiv.appendChild(title);

    //Create a container for the 5-day forecast cards
    var forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');

    //Displays each day's forecast
    for (var i = 0; i < fiveDayData.length; i += 8) {
        var dayData = fiveDayData[i];

        //create a card for each day's forecast
        var dayCard = document.createElement('div');
        dayCard.classList.add('card');
        //create elements for each day's forecast
        var cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        var dateP = document.createElement('p');
        dateP.textContent = dayData.dt_txt.split(' ')[0];
        cardBody.appendChild(dateP);

        var iconImg = document.createElement('img');
        iconImg.src = 'https://openweathermap.org/img/w/' + dayData.weather[0].icon + '.png';
        cardBody.appendChild(iconImg);

        var tempP = document.createElement('p');
        tempP.textContent = 'Temp: ' + dayData.main.temp + ' ℉';
        cardBody.appendChild(tempP);

        var windP = document.createElement('p');
        windP.textContent = 'Wind: ' + dayData.wind.speed + ' MPH';
        cardBody.appendChild(windP);

        var humidityP = document.createElement('p');
        humidityP.textContent = 'Humidity: ' + dayData.main.humidity + ' %';
        cardBody.appendChild(humidityP);

        dayCard.appendChild(cardBody);

        //Append teh day's forecast card to the container
        forecastContainer.appendChild(dayCard);

    }
    //Append the forecast card container to the 5-day forecast div
    fiveDayDiv.appendChild(forecastContainer);
}

//Event listener for the 'search' button and run getAPI function
searchBtn.addEventListener('click', getAPI);
