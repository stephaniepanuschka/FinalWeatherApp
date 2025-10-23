function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  
  iconElement.src = response.data.condition.icon_url;
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = city;
  descriptionElement.innerHTML =`${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
  let day = days [date.getDay()];

  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`
  }

  function searchCity(city) {
  let apiKey = "0918e26t24fa3e41afd9f8649o1cbb80";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
  }

  function useSearchSubmit(event) {
   event.preventDefault(); 
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return days[date.getDay()];
}

function getForecast(city){
let apiKey ="0918e26t24fa3e41afd9f8649o1cbb80";
let apiUrl =`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;  
axios(apiUrl).then(displayForecast);

}

function displayForecast(response) {

  let forecastElement = document.querySelector("#forecast");

  let forecastHtml ="";

  response.data.daily.forEach(function(day,index) {
    if (index < 5){
 forecastHtml = forecastHtml +
 `
    <div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      
      <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
  
      <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}</strong></div>
        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}</div>
      </div>
    </div>`;
    }
  });
forecastElement.innerHTML = forecastHtml;
}

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", useSearchSubmit);

  searchCity("Cape Town");
  displayForecast();

