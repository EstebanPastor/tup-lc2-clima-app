const apiKey = "43e2f314352d50285cda63e25c97bd1f";
const form = document.querySelector("#form-city-list form");
const selectCity = document.querySelector("#form-city-list select");
const cityCard = document.getElementById('card');

function getCitiesFromLocalStorage() {
  let cities = localStorage.getItem("CITIES");
  if (cities) {
    cities = JSON.parse(cities);
  } else {
    cities = [];
  }
  return cities;
}

async function getCurrentWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
  let response = await fetch(url)
  .then((response) => response.json())
  .then(data => {
    const { main, name, wind } = data;
    cityCard.innerHTML = `
        <h3>${name}</h3>
        <img src="img/01d@2x.png" alt="" />
        <p>Temperatura: ${main['temp']}º</p>
        <p>Sensación térmica: ${main['feels_like']}º</p>
        <p>Humedad: ${main['humidity']}%</p>
        <p>Velocidad del viento: ${wind['speed']} km/h</p>
        <p>Presión: ${main['pressure']}P</p>
    `})
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", function () {
  var select = document.querySelector("#ciudad");
  var cities = getCitiesFromLocalStorage();

  if (cities.length == 0) {
    var option = document.createElement("option");
    option.text = "No hay ciudades agregadas...";
    select.appendChild(option);
  } else {
    var option = document.createElement("option");
    option.text = "Seleccione una Ciudad...";
    select.appendChild(option);
  }

  for (let i = 0; i < cities.length; i++) {
    var option = document.createElement("option");
    var city = cities[i];
    option.value = city;
    option.text = city;
    select.appendChild(option);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityQ = selectCity.value;
  getCurrentWeather(cityQ); 
});
