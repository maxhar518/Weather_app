if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwabuilder-sw.js') 
    .then((reg) => console.log('service worker registered',reg))
    .catch((err) => console.log('service worker not registered',err))
 }


const cityForm = document.querySelector('#cityForm')
const city = document.querySelector('#city')
const apiKey = `55ff5b9f1aa556e25d9767c01329b185`;
const message = document.querySelector('#message')
const container = document.querySelector('#container')

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
    var myDate =new Date(`${info.dt}`*1000)
    let a =myDate.toLocaleString()
    const iconCode = info.weather[0].icon;
    iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    const imgUrl = iconUrl
    container.innerHTML = `
    <p>  ${info.weather[0].main}</p>
    <img src="${imgUrl}"></img>
    <p>Date & Time: ${a}</p>
    <p> Temperature:${info.main.temp}°C</p> 
    <p>Humidity: ${info.main.humidity}%</p>
    <p>Wind Speed: ${info.wind.speed}km/h</p> 
    <p>Clouds: ${info.clouds.all}%</p>
    `
}