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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              ${formatDay(forecastDay.dt)}
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="30"
                class="weather-forecast-icon"
              />
              <div class="col minimumTemperature">${Math.round(
                forecastDay.temp.min
              )}°C</div>
              <div class="col maximumTemperature">${Math.round(
                forecastDay.temp.max
              )}°C</div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let units = `metric`;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={current,minutely,hourly,alert}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
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

  let iconImage = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  iconImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let units = `metric`;
  let apiKey = "c119ffef35b7245a5e03b6e5724ae961";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showWeatherCondition(response) {
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

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = `metric`;
  let apiKey = `c119ffef35b7245a5e03b6e5724ae961`;
  let apiUrlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrentLocation).then(showWeatherCondition);

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={current,minutely,hourly,alert}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

function getInformation(event) {
  event.preventDefault();

  window.open(`https://openweathermap.org/`, `_blank`);
}

let moreInfo = document.querySelector("#more-information");
moreInfo.addEventListener("click", getInformation);

search("Tiong Bahru");
