function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
 let city = response.data.city;
 let descriptionElement = document.querySelector("#description");
 let humidityElement = document.querySelector("#humidity");
 let windSpeedElement = document.querySelector("#wind-speed");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = city;
  descriptionElement.innerHTML =`${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
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