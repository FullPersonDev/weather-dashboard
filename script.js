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
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityValue+'&limit=1&appid='+apiKey;

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat;
            var lon = data[0].lon;
            console.log(lat);
            console.log(lon);
        });
}

searchBtn.addEventListener('click', getAPI);

//Function to retrive API data based on user city input


//Event listener for the 'search' button
