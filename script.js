//testing git commit

// Global variables and arrays for storing data
let data = {};
let storedData = {};
let riseSet = [];
let clouds;

// Event listener for when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Attach a click event to the "locationButton" element
  document.getElementById("locationButton").addEventListener("click", setLocation);
});

let https;

// Function to set the location
function setLocation() {
  // Get the location input from the user
  let location = document.getElementById("location").value;
  
  // Split the location input into city, province, and country
  let locations = location.split(",");
  let city = locations[0];
  let province = locations[1];
  let country = locations[2];

  console.log(locations);

  // Construct the URL for the OpenWeatherMap API with the location information
  let url =
    "http://api.openweathermap.org/geo/1.0/direct?q=" + "{" + city + "}" + "," + "{" + province + "}" + "," + "{" + country + "}" + "&appid=bdcebeea38d8e3dc9c3eaa3e7cc60c18";

  // Fetch the location data from the API
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // Convert the location data to a JSON string and store it in local storage
      let locationData = JSON.stringify(json);
      localStorage.setItem("locationData", locationData);
      checkWeather()
    });
    

}

let lat;
let lon;
let weatherLink;

// Function to construct the weather data URL
function constructLink() {
  // Retrieve the location data from local storage
  locationDataPulled = localStorage.getItem("locationData");
  let locationDataParsed = JSON.parse(locationDataPulled);
  console.log(locationDataParsed);

  // Extract latitude and longitude from the location data
  lon = locationDataParsed[0].lon;
  lat = locationDataParsed[0].lat;

  // Construct the weather data URL
  weatherLink = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=bdcebeea38d8e3dc9c3eaa3e7cc60c18";

  console.log(weatherLink);
}

// Function to check weather and update data
function checkWeather() {
  constructLink();
  

  // Fetch weather data from the constructed URL
  fetch(weatherLink)
    .then((response) => response.json())
    .then((json) => {
      data = json;
    })
    .then(function () {
      // Store the weather data in local storage
      storeData();
    })
    .then(function () {
      // Display weather information on the webpage
      display();
    });
}

// Function to store weather data in local storage
function storeData() {
  let storedData = JSON.stringify(data);
  localStorage.setItem("weatherData", storedData);
}

// Function to display weather information on the webpage
function display() {
  storedData = localStorage.getItem("weatherData");
  let newData = JSON.parse(storedData);
  data = newData;
  console.log(data);

  // Extract weather information such as temperature, humidity, pressure, wind speed, and cloud conditions
  const temperature = (data.main.temp - 273.15).toFixed(1);
  console.log(temperature);
  const feelsLike = (data.main.feels_like - 273.15).toFixed(1);
  console.log(feelsLike);
  const humidity = data.main.humidity;
  console.log(humidity);
  const pressure = data.main.pressure;
  console.log(pressure);
  const windSpeed = data.wind.speed;
  clouds = data.weather[0].description;
  console.log(clouds);

  // Update the webpage with weather information
  let temp = document.getElementById("temperature");
  temp.innerHTML = `Temperature: ${temperature} C | Feels Like: ${feelsLike} C`;

  let humi = document.getElementById("humidity");
  humi.innerHTML = `Humidity: ${humidity} %`;

  let press = document.getElementById("pressure");
  press.innerHTML = `Pressure: ${pressure} Pa`;

  let wind = document.getElementById("windSpeed");
  wind.innerHTML = `Wind Speed: ${windSpeed} m/s`;

  let sky = document.getElementById("clouds");
  // Capitalize the first letter of cloud condition
  let capClouds = clouds.charAt(0).toUpperCase() + clouds.slice(1);
  sky.innerHTML = capClouds;

  // Store sunrise and sunset timestamps in the "riseSet" array
  riseSet = [data.sys.sunrise, data.sys.sunset];
  console.log(riseSet);
  // Update the sunrise and sunset times on the webpage
  getTime();

  // Updates the current location visible on the page
  fillCurrentLocation()
}

// Function to convert timestamps to human-readable sunrise and sunset times
function getTime() {
  for (let i = 0; i < 2; i++) {
    let timestamp = riseSet[i] * 1000;
    let date = new Date(timestamp);
    console.log("-----------------");
    // Get hours and minutes from the Date object
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let hours12;
    if (minutes < 10) {
      minutes = "0" + minutes; // Adds a 0 to the minutes if its less than 10
    }
    if (hours > 12) {// Converting 24 hour time to 12h time
      hours12 = hours - 12 + ":" + minutes + " Pm";
      document.getElementById("sunset").innerHTML = hours12;
    } else {
      hours12 = hours + ":" + minutes + " Am";
      document.getElementById("sunrise").innerHTML = hours12;
    }
    console.log(hours12);
  }
}

// Cloud image selection based on weather condition
const cloudSelection = [
  "/images/cloudy.png",
  "/images/raining.png",
  "/images/sunny.png",
  "/images/snow.png"
];

function selectClouds() {
  let weatherCondition = data.weather[0].main;

  // Mapping weather conditions to cloud image indices
  let weatherSelection = {
    "Clouds": 0,
    "Rain": 1,
    "Sun": 2,
    "Snow": 3
  };
  
  // Get the appropriate cloud image index
  let weatherIndex = weatherSelection[weatherCondition];

  // Update the "cloudyness" element with the selected cloud image
  document.getElementById("cloudyness").src = cloudSelection[weatherIndex];
}

// Interval function to display a random "chance of aliens" value
setInterval(aliens, 100000);
function aliens() {
  x = Math.floor(Math.random() * 100);
  console.log(x);
  document.getElementById("aliens").innerHTML = x + "%";
}

// Date and time display
let months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September",
  "October", "November", "December"
];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Update the date and time on the webpage every second
setInterval(time, 1000);
function time() {
  date = new Date();
  y = date.getDay();
  x = date.getMonth();
  day = date.getDate();
  let hours = date.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Update the "date" and "time" elements with the current date and time
  document.getElementById("date").innerHTML = daysOfWeek[y] + ", " + months[x] + ", " + day;
  document.getElementById("time").innerHTML = hours + ":" + minutes + ":" + seconds;
}


function fillCurrentLocation(){
  document.getElementById("currentLocation").innerHTML = data.name + ", " + data.sys.country
}