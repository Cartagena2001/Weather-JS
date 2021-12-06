//api key openweathermap.org
const API_KEY = 'abaaf8a35369c4b6054b52f4ab5b76c8';

//geographic coordinates
const fetchData = position => {
    const { latitude, longitude} = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeaterData(data))
}

const setWeaterData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    //instance loading
    cleanUp();
}

//create loader
const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader'); 

    loader.style.display = 'none';
    container.style.display = 'flex';
}

//view date
const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear() }`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}