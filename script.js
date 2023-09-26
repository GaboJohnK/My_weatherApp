function dateTime() {
  let dateElement = document.querySelector("#currentDateTime");
  let items = { weekday: "long", hour: "2-digit", 
  minute: "2-digit" };
  let currentDateTime = 
  new Date().toLocaleString("en-US", items);
  dateElement.innerHTML = currentDateTime;
}

dateTime();

setInterval(dateTime, 60000);

function showTemp(response) {
  console.log(response.data);

  let cityItem = document.querySelector("#city");
  cityItem.innerHTML = response.data.city;

  let temperatureItem = document.querySelector("#temperature");
  celsiusTemp = response.data.temperature.current;
  temperatureItem.innerHTML = Math.round(celsiusTemp);

  let humidityItem = document.querySelector("#humidity");
  humidityItem.innerHTML = response.data.temperature.humidity + "%";

  let speed = document.querySelector("#wind");
  speed.innerHTML = response.data.wind.speed + "km/h";

  let descript = document.querySelector("#description");
  descript.innerHTML = response.data.condition.description;

  let iconElement = document.querySelector("#iconItem");
  iconElement.setAttribute("src",
  `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  
}

function weatherData(city) {
   let apiKey = "c344e4et5ec6405fffca0663b3aaoc47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function cityData(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  weatherData(city);
}
let cityInput = document.querySelector("#cityInput");
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    cityData(event);
  }
});

function displayTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("now");
  fahrLink.classList.remove("now");
  let temperatureItem= document.querySelector("#temperature");
  temperatureItem.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureItem = document.querySelector("#temperature");

  celsiusLink.classList.remove("now");
  fahrLink.classList.add("now");
  let fahrenTemp =(celsiusTemp * 9) / 5 + 32;
  temperatureItem.innerHTML = Math.round(fahrenTemp);
}

let celsiusTemp = null;

let citySearch = document.querySelector("#citySearchForm");
citySearch.addEventListener("click", cityData);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayTemp);

let fahrLink = document.querySelector("#fahrenheit");
fahrLink.addEventListener("click", displayFahrenheit);

weatherData("Gaborone");