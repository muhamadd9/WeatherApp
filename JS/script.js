var cityName = document.querySelector('.weather-table h6');
var cityDegree = document.querySelector('.weather-table .degree-number');
var todayDay = document.querySelector('.weather-table .col-title .day-now');
var todayDate = document.querySelector('.weather-table .col-title .date-now');
var tomororwDay = document.querySelector('.weather-table .col-title-second p');
var tomororwDegreeC = document.querySelector('.weather-table .col-body-second .second-c-degree');
var tomororwState = document.querySelector('.weather-table .col-body-second .weather-second-state');
var tomororwIcon = document.querySelector('.weather-table .col-body-second .weather-second-icon');
var tomororwDegreeF = document.querySelector('.weather-table .col-body-second .second-f-degree');
var thirdIcon = document.querySelector('.weather-table .col-body .icon-three');
var thirdDegreeC = document.querySelector('.weather-table .col-body .third-c-degree');
var thirdDegreeF = document.querySelector('.weather-table .col-body .third-f-degree');
var thirdState = document.querySelector('.weather-table .col-body .weather-state-third');
var thirdDay = document.querySelector('.weather-table .col-title-third p');
var state = document.querySelector('.weather-state')
var citySearch = document.querySelector('.search-side input[type ="text"]');
var findMe =document.getElementById('find');


var weather = [];

if(navigator.geolocation.getCurrentPosition){
    getLocation();
} else{
    Swal.fire({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        icon: "warning",
        title: "Your Device Doesn't Support Location",
      });
}

findMe.addEventListener('click' ,function(){
    getLocation();
})

function getLocation(){
    navigator.geolocation.getCurrentPosition(
        function(e){
            latitude = e.coords.latitude;
            longitude = e.coords.longitude;
            console.log(latitude);
            getWeatherByCoords(latitude,longitude);
            
        }
    )

}

citySearch.addEventListener('input',function(){
    var name = citySearch.value ;
    getWeather(name);
    
})

async function getWeather(city){
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=32559f62d5ff480e9fd80035240701&q=${city}&days=3`);
    var data = await response.json();
    weather = data ;
    console.log(weather);
    display();
}

async function getWeatherByCoords(latitude,longitude){
     var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=32559f62d5ff480e9fd80035240701&q=${latitude},${longitude}&days=3`);
    var data = await response.json();
    weather = data ;
    console.log(weather);
    display();
    citySearch.value= weather.location.name;
}

function display(){
    cityName.innerHTML = weather.location.name ; 
    state.innerHTML =weather.current.condition.text ;
    cityDegree.innerHTML = weather.forecast.forecastday[0].day.avgtemp_c + '&deg C';
    todayDate.innerHTML = weather.forecast.forecastday[0].date ;
    dateNow = weather.forecast.forecastday[0].date ;
    todayDay.innerHTML = getDayOfWeek(dateNow).today;
    tomororwDay.innerHTML = getDayOfWeek(dateNow).tomororw;
    tomororwDegreeC.innerHTML = weather.forecast.forecastday[1].day.avgtemp_c + '&degc' ;
    tomororwDegreeF.innerHTML = weather.forecast.forecastday[1].day.avgtemp_f + '&degF' ;
    tomororwIcon.src = weather.forecast.forecastday[1].day.condition.icon;
    tomororwState.innerHTML = weather.forecast.forecastday[1].day.condition.text;
    thirdDay.innerHTML = getDayOfWeek(dateNow).thirdDay;
    thirdDegreeC.innerHTML = weather.forecast.forecastday[2].day.avgtemp_c + '&degc' ;
    thirdDegreeF.innerHTML = weather.forecast.forecastday[2].day.avgtemp_f + '&degF' ;
    thirdState.innerHTML = weather.forecast.forecastday[2].day.condition.text;
    thirdIcon.src = weather.forecast.forecastday[2].day.condition.icon;
}



function getDayOfWeek(dateString) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const dateObject = new Date(dateString);
    const dayIndex = dateObject.getDay();
    return {today :daysOfWeek[dayIndex] ,tomororw :daysOfWeek[dayIndex+1] ,thirdDay:daysOfWeek[dayIndex+2] };
}


// this for notify email for new subscriber

var y = document.querySelector('input[name ="name"]') ;
var x = document.querySelector('input[name ="email"]');
y=x;

