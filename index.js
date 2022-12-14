let weather = {
    "apiKey": "19a24c89a480f5f7e98a9fa245e95182",
    // function to retrieve weather data using Openweather API
    fetchWeather : function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+this.apiKey)
        // parse it first
        .then((response)=>response.json())
        // parsed data and bring this data into displayWeather function
        .then((data)=>this.displayWeather(data));
    },
    // function to display weather
    displayWeather : function(data){
        // ecma6 object destructuring used here.
        const { name } = data; // so this means name = data.name
        const { icon, description } = data.weather[0];
        const { temp , humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText= `Weather in ${name}`;
        document.querySelector(".temp").innerText = `Temperature is ${temp}°C`;
        // Over here what was done was to get the ever-changing icon via the json data.
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity} %`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");
    },
    search : function() {
        weather.fetchWeather(document.querySelector(".search-bar").value);
    }
};
// whenever user clicks the search button, it will trigger search function.
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
})
// whenever user presses the "enter" key when typing in the text input, it will trigger search function.
document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});
// Default page load will show Singapore's weather until someone searches for a new city/country
weather.fetchWeather("Singapore");