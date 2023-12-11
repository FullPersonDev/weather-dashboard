//Variables that reference the html elements
var searchBtn = document.getElementById('searchbtn');
var cityInput = document.getElementById('cityinput');
var recentSearchDiv = document.getElementById('recentsearch');
var cityResult = document.getElementById('cityresult');
var temp = document.getElementById('temp');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var fiveDayDiv = document.getElementById('fiveday');

//Variable to capture the API URL
var APIURL = 'api.openweathermap.org';




//Event listener for the 'search' button
