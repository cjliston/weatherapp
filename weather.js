
$('document').ready(function(){
//weather converter

function dateConverter(date){
  var fullDate = new Date (1000*date);
  var stringDate = fullDate.toUTCString();
  var newDate = stringDate.substring(0,11);
  return newDate;
};

$('#showMore').hide();
$('form').submit(function (evt) {
    evt.preventDefault();
    $('#welcome').hide();
    // Get weather data
    var weatherAPI = "//api.openweathermap.org/data/2.5/weather";
    var city = $(search).val();
    var weatherOptions = {
      q: city,
      APPID: "67e821ad4a722dee24b61f0077ebf404",
      units:"imperial"
    };
    //create HTML for weather display
    function displayTemperature(data) {
      var weatherHTML ="<div id='weatherData'><div class='shout city'>"+data.name+","+data.sys.country+"</div><p>Temperature: "+data.main.temp+" degrees</p><p>Wind: "+data.wind.speed+" MPH</p>";
      if(data.main.temp>=100){
        weatherHTML += '<div class="shout">TOO DAMN HOT. STAY THE FUCK INSIDE</div><div><img src="img/hot.gif"></div></div>'
      }else if (data.main.temp<100 && data.main.temp>=80){
         weatherHTML += '<div class="shout">MAYBE FIND A FUCKING BEACH</div><div><img src="img/beach.gif"></div></div>'
      }else if (data.main.temp<80 && data.main.temp>=65){
         weatherHTML += '<div class="shout">GO OUTSIDE DIPSHIT. ANYWHERE.</div><div><img src="img/outside.gif"></div></div>'
      }else if (data.main.temp<65 && data.main.temp>50){
         weatherHTML += '<div class="shout">FUCK. GETTING COLD.</div><div><img src="img/chilly.gif"></div></div>'
      }else{
        weatherHTML += '<div class="shout">TOO DAMN COLD. STAY THE FUCK INSIDE</div><div><img src="img/cold.gif"></div></div>'
      }
      $('#weather').html(weatherHTML)
      $('#showMore').show();
      $('#forecastsDiv').hide();
    }

    $.getJSON(weatherAPI, weatherOptions, displayTemperature);
//start show more
$('#showMoreBtn').click(function (evt){
  evt.preventDefault();
  $('#showMore').hide();
  $('#spinner').show();
  // Get weather data
    var forecastAPI = "//api.openweathermap.org/data/2.5/forecast/daily";
    var city = $(search).val();
    var forecastOptions = {
      q: city,
      APPID: "67e821ad4a722dee24b61f0077ebf404",
      units:"imperial",
      cnt:7,
      mode:'JSON',
    };
    //create HTML for weather display
    function displayForecast(data) {
      var forecastHTML = '<div id="forecasts">'
      $.each(data.list,function(i,day) {
        forecastHTML += '<div class="forecast"><p>'+ dateConverter(day.dt) + '</p><p>High: '+day.temp.max+'</p><p>Low: '+ day.temp.min+'</p></div>'
      }); // end each
      forecastHTML +='</div>'
      $('#spinner').hide();
      $('#forecastsDiv').html(forecastHTML);
      $('.forecast:first-child').hide();
      $('#forecastsDiv').show();
    }

    $.getJSON(forecastAPI, forecastOptions, displayForecast);

});//end click for show more
  }); // end click


}); // end ready


