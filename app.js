
const cityForm = document.querySelector('#cityForm')
const city = document.querySelector('#city')
const apiKey = `55ff5b9f1aa556e25d9767c01329b185`;
const centigrade = document.querySelector('#centigrade')
const message = document.querySelector('#message')
const logo = document.querySelector('#logo')
const wind = document.querySelector('#wind')
const clouds = document.querySelector('#clouds')
const iconElement = document.querySelector('#iconElement')

const getWeather = async () => {
    try {

        message.innerText = ''
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${city.value}&appid=${apiKey}&units=metric`)
        const data = await response.json()
        if (!response.ok) throw error(data.error.message)
        return data
    } catch (err) {
        message.innerText = `ERROR, no matching location found`
    }
};

cityForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
        const info = await getWeather();
        console.log(info);
        showWeatherData(info);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
});


const showWeatherData = (info) => {
    
    centigrade.innerText = `Temperature:${info.main.temp}°C`
    logo.innerText = `Humidity${info.main.humidity}%`
    wind.innerText = `Wind Speed: ${info.wind.speed}km/h`
    clouds.innerText = `Clouds: ${info.clouds.all}%`
    const iconCode = info.weather[0].icon;
    iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    iconElement.src = iconUrl;
}