function getCitiesFromLocalStorage() {
  let cities = localStorage.getItem("CITIES");
  if (cities) {
    cities = JSON.parse(cities);
  } else {
    cities = [];
  }
  return cities;
}

function addNewCityToLocalStorage(newCity) {
  let cities = getCitiesFromLocalStorage();
  cities.push(newCity);
  localStorage.setItem("CITIES", JSON.stringify(cities));
}

function agregarCiudad() {
  var city = document.getElementById("ciudad").value;
  cities = getCitiesFromLocalStorage();

  if (city === "") {
    console.log("Vacío");
    document.getElementById('error').style.display = "block";
    return;
  }

  var b = false;
  for (let i = 0; i <= cities.length; i++) {
    if (cities[i] === city) {
      b = true;
    }
  }

  if (b) {
    console.log("Si se encuentra");
    document.getElementById('warning').style.display = "block";
    return;
  }else{
    console.log("No se encuentra");
    addNewCityToLocalStorage(city);
    document.getElementById('success').style.display = "block";
    return;
  }
}
