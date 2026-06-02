const apiKey = "f5be101fd924746b8fad5344c8385a53";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

async function getWeather(city){

  loading.style.display = "block";
  error.innerText = "";

  try{

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if(!response.ok){
      throw new Error("City not found");
    }

    const data = await response.json();

    cityName.innerText = data.name;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;

    description.innerText = data.weather[0].description;

    humidity.innerText = `${data.main.humidity}%`;

    wind.innerText = `${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;

    weatherIcon.src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  }

  catch(err){
    error.innerText = err.message;
  }

  finally{
    loading.style.display = "none";
  }

}

searchBtn.addEventListener("click", ()=>{

  const city = cityInput.value.trim();

  if(city !== ""){
    getWeather(city);
  }

});

/* Default City */

getWeather("Mumbai");