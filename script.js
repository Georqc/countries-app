const inputEl = document.getElementById("inputEl");
const searchBtn = document.getElementById("submit-Btn");
const form = document.getElementById("searchForm");

const showBox = document.querySelector(".results-container");
const countryName = document.getElementById("country");
const capital = document.getElementById("capital");
const population = document.getElementById("population");
const region = document.getElementById("region");
const temperature = document.getElementById("temperature");
const flagPic = document.getElementById("flagPic");

const error = document.getElementById("error");

// COUNTRIES API
const apiUrlCountries = "https://restcountries.com/v3.1/name/";

//OPENWEATHER API FOR TEMPERATURE
const apiUrlTemp = "https://api.openweathermap.org/data/2.5/weather";
const apiKeyTemp = "b2eab37b9f35dcbc739bb60b8d51a631";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const country = inputEl.value.trim();

  if (country) {
    fetchCountry(country);
  } else {
    displayError("Please enter a country.");
    showBox.classList.add("hidden");
  }
  inputEl.value = "";
});

async function fetchCountry(country) {
  error.textContent = "";
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );

    if (!response.ok) {
      displayError("Please enter a country.");
      clearCountry();
      showBox.classList.add("hidden");
      return;
    }

    const data = await response.json();
    clearCountry();

    showBox.classList.remove("hidden");

    countryName.textContent = data[0].name.common;
    capital.textContent = data[0].capital[0];
    population.textContent = data[0].population;
    region.textContent = data[0].region;
    flagPic.src = data[0].flags.png;

    fetchTemp(data[0].capital[0]);
  } catch {
    displayError("Couldn't fetch the country.");
  }
}

async function fetchTemp(city) {
  try {
    const response = await fetch(
      `${apiUrlTemp}?q=${city}&appid=${apiKeyTemp}&units=metric`
    );

    if (!response.ok) {
      temperature.textContent = "Temperature N/A";
      return;
    }

    const data = await response.json();
    temperature.textContent = `${data.main.temp.toFixed(0)} °C`;
  } catch {
    displayError("Error fetching temperature");
    temperature.textContent = "Temperature N/A";
  }
}

function clearCountry() {
  countryName.textContent = "";
  capital.textContent = "";
  population.textContent = "";
  region.textContent = "";
  temperature.textContent = "Temperature N/A";
  flagPic.src = "";
}

function displayError(message) {
  error.textContent = message;
  return;
}
