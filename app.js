const APIKEY='e17a5bb9b34ceabd7b9c1dcee317c973';

const URLBASE='https://api.openweathermap.org/data/2.5/weather?';

async function request(url){
    return fetch(url).then(data => data.json());
}

async function getWather(lat, lon){
const url =`${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}`;
const weather = await request(url);
console.log(weather);
updateDOM(weather.name, weather.main.temp);
}

async function getWatherByCity(city){
    const url = URLBASE + `q=${city}&appid=${APIKEY}`;
    const weather = await request(url);
    updateDOM(weather.name, weather.main.temp);
}

function updateDOM(city, temp){
    const cityNameElement = document.querySelector('.container h2:nth-child(2) span');
    cityNameElement.innerText = city;
    const temperatureElement = document.querySelector('.container h2:nth-child(3) span');
    temperatureElement.innerText = temp;
    const containerElemment = document.querySelector('.container');
    if (temp >= 20){
        containerElemment.classList.add('caliente');
        containerElemment.classList.add('moderado', 'frio');
    } else if (temp >= 15 && temp < 20){
        containerElemment.classList.add('moderado');
        containerElemment.classList.add('caliente', 'frio');
    }else{
        containerElemment.classList.add('frio');
        containerElemment.classList.add()
    }
}

let hasSearched = false; 

document.querySelector('.form_search').addEventListener('submit', async function (event) {
    event.preventDefault();
    const cityInput = document.querySelector('input[name="busqueda"]');
    const cityName = cityInput.value.trim(); 

    if (cityName) {
        try {
            await getWatherByCity(cityName);
            hasSearched = true; 
            cityInput.value = '';
        } catch (error) {
            console.error('Error al obtener datos del clima:', error.message);
            alert('Error al obtener datos del clima. Por favor, inténtelo de nuevo.');
        }
    } else {
        alert('Por favor, ingrese el nombre de una ciudad.');
    }
});

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    if (!hasSearched) {
        getWather(lat, lon);
    }
});

navigator.geolocation.getCurrentPosition(position =>{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWather(lat, lon); 
});
