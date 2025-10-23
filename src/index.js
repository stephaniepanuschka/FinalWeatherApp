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
  humidityElement.innerHTML = `${response.data.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
  
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

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", useSearchSubmit);

  searchCity("Cape Town");