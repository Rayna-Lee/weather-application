let now = new Date();

let date = now.getDate();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();

if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let dateNow = document.querySelector("#display-date");
let monthNow = document.querySelector("#display-month");
let yearNow = document.querySelector("#display-year");
let dayNow = document.querySelector("#display-day");
let hourNow = document.querySelector("#display-hour");
let minuteNow = document.querySelector("#display-minute");

dateNow.innerHTML = `${date}`;
monthNow.innerHTML = `${month}`;
yearNow.innerHTML = `${year}`;
dayNow.innerHTML = `${day}`;
hourNow.innerHTML = `${hour}`;
minuteNow.innerHTML = `${minute}`;

//Show City Temperature Description when submitting
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#temperature-now");
  temperatureNow.innerHTML = temperature;

  let cityNow = document.querySelector("#city");
  cityNow.innerHTML = response.data.name;

  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windspeed = document.querySelector("#wind-speed");
  windspeed.innerHTML = Math.round(response.data.wind.speed);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = `${searchInput.value}`;
  let units = `metric`;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", displayCity);

//Current Location Button
//Show City Temperature Desciption when clicking button
function showWeatherCondition(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  console.log(response.data.weather[0].description);
  console.log(response.data);

  let cityLogged = response.data.name;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = cityLogged;

  let temperature = Math.round(response.data.main.temp);
  let displayTemperatureNow = document.querySelector("#temperature-now");
  displayTemperatureNow.innerHTML = temperature;

  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = weatherDescription;
}

//Get Current Location via GPS
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = `metric`;
  let apiKey = `c119ffef35b7245a5e03b6e5724ae961`;
  let apiUrlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlCurrentLocation).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
