
 $('document').ready(function(){
 $('form').submit(function (evt) {
    evt.preventDefault();
    $('#welcome').hide();
    // the AJAX part
    var weatherAPI = "//api.openweathermap.org/data/2.5/weather";
    var city = $(search).val();
    var weatherOptions = {
      q: city,
      APPID: "67e821ad4a722dee24b61f0077ebf404",
units:"imperial"
    };
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
      $('#weather').html(weatherHTML)}

    $.getJSON(weatherAPI, weatherOptions, displayTemperature);

  }); // end click

}); // end ready