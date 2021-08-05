let defaultCity = "Boston";

function getCityWeather(city){
    const ajax = new XMLHttpRequest();
    ajax.onload = functionName;
    ajax.onerror = errorFunctionName;
    ajax.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e26c4c0e6e44adb84fd29c67cfc558f&units=imperial`, true);
    ajax.send();
    function functionName(city) {
        console.log(this);
        if (this.status == 200) {
            let json = JSON.parse(this.responseText);

            let currentTemp = json.main.temp;
            let forecastHi = json.main.temp_max;
            let forecastLo = json.main.temp_min;
            let currentCondition = json.weather[0].main;
            let cityName = json.name;
            let iconCode = json.weather[0].icon;
            let weatherID = json.weather[0].id;
    
            console.log(currentTemp);
            console.log(forecastHi);
            console.log(forecastLo);
            console.log(currentCondition);
            console.log(cityName);
            console.log("Icon code: " + iconCode);
            console.log("Weather ID: " + weatherID);
    

            const weatherImageSource;

            if (weatherID >= 200 && weatherID < 600) 
            { 
                weatherImageSource = "/img/rain.gif"; 
            }  
            else if ((weatherID >= 700 && weatherID < 800) || (weatherID >= 801 && weatherID < 900)) //atmoshphere and clouds
            { 
                weatherImageSource = "/img/cloudy.gif";
            } 
            else if (weatherID == 800) 
            { 
                weatherImageSource = "/img/Sunny.gif"; 
            } 
            else //everything else we never accounted for
            { 
                weatherImageSource = "/img/unknown.gif"; 
            } 

            document.getElementById("weatherImage").innerHTML = `<img src=${weatherImageSource}>`;
            


            document.getElementById("weatherIcon").innerHTML = `<img src=http://openweathermap.org/img/wn/${iconCode}.png>`;
            document.getElementById("cityname").innerHTML = cityName;
            document.getElementById("weather").innerHTML = "Currently " + currentCondition;
            document.getElementById("hi").innerHTML = "High: " + forecastHi + "&deg;";
            document.getElementById("current").innerHTML = "Current Temp: " + currentTemp + "&deg;";
            document.getElementById("lo").innerHTML = "Low: " + forecastLo + "&deg;";
        } else {
            // handle more HTTP response codes here;
        }
    }
}

function errorFunctionName(e) {
    console.log(this);
    console.error(e);

}

const form = document.querySelector('#EditCity');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let newCityName = document.querySelector('#newCity').value;
    getCityWeather(newCityName);
});
getCityWeather(defaultCity);