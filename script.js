var coords;
var jsonWeatherData;
var tempC = 0;
var tempF = 0;
$(document).ready(function() {
  checkGeo();
  $("#convertTemp").hide();
  $("#convertTemp").click(changeTemp);


});

function checkGeo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, failure);
  }
}

function showPosition(position) {
  coords = position.coords;
  //$("#message").html("longitude: " + coords.longitude + " latitude: " + coords.latitude);
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + coords.latitude + "&lon=" + coords.longitude + "&appid=dca49c766188b868611b9a68004210bc", getInfo).fail(function(){
    $("#wrapper").html("Error getting weather");
  });

}

function failure() {
  $("#wrapper").html("<div id = '#message'> Geolocation not available </div>");
  $("#convertTemp").hide();

}

function getInfo(jsonData) {
  jsonWeatherData = jsonData;
  $("#weather").html( jsonWeatherData.weather[0].main);
  $("#location").html(jsonWeatherData.name);
  getTempCelsius();
  $("#convertTemp").show();
   displayIcon();

}

function getTempCelsius() {
  tempC = Math.round(jsonWeatherData.main.temp - 273);
  $("#temp").html(+ tempC + " degrees celsius");
}

function getTempFahrenheit() {
  tempF = Math.round(tempC * (9 / 5) + 32);
  $("#temp").html( tempF + " degrees fahrenheit");

}

function changeTemp() {
  var $this = $(this);
  if ($this.hasClass("toFahrenheit")) {
    getTempFahrenheit();
    $this.text("To Celsius");
  }
  if ($this.hasClass("toCelsius")) {
    getTempCelsius();
    $this.text("To Fahrenheit");
  }

  $this.toggleClass("toFahrenheit");
  $this.toggleClass("toCelsius");
}
function displayIcon(){
  var id = jsonWeatherData.weather[0].id;
  $("#weatherIcon").html("<i class='wi wi-owm-" +id+ "'></i>");
  if(jsonWeatherData.weather[0].main === "Clear"){
    $("#weatherIcon").css("color","orange");
  }
}
