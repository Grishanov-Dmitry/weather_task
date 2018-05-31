let userCity = undefined;

let weatherDataObject = {};

const dataForTodayUl = document.getElementById('data_for_today');
const curentTemperature = document.getElementById('curent_temperature');
const curentDate = document.getElementById('current_date'); 
const userCityTag = document.getElementById('user_city');
const WeatherTodayIcon = document.getElementById('weather_today__icon');
const preloader = document.getElementById('preloader');

const coordUrl = 'https://api.ipdata.co/';


function parseUserLocation(data) {
    JSON.parse(data, (key, value) => {
        if(key === 'city') {
            userCity = value;
        }
    }); 
};



function parseWeatherData(data) {
    return weatherDataObject = JSON.parse(data);
}



function ajaxRequest(url, foo) {
    return new Promise( (resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader('Accept', 'application/json');

        request.onload = function () {
            if (this.status === 200) {
               resolve( foo(this.responseText) );
            } else {
                throw error;
            }
    };

        request.send();
    })
    
}

function insertDataToPage() {
    let date = new Date();

    dataForTodayUl.innerHTML = `
                <li>Ветер: ${weatherDataObject.wind.speed} м/с</li>
                <li>Давление  ${weatherDataObject.main.pressure} мм</li>
                <li>Влажность: ${weatherDataObject.main.humidity}% </li>
                <li>Видимость: ${weatherDataObject.visibility} мм</li>
                <li>Минимальная ${weatherDataObject.main.temp_min}&deg;</li>
                <li>Максимальная ${weatherDataObject.main.temp_max}&deg;</li>
    `;

    curentTemperature.innerHTML = `${Math.round(weatherDataObject.main.temp)}&deg`;

    curentDate.innerHTML = `Сегодня ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

    userCityTag.innerHTML = `${userCity}`;

    WeatherTodayIcon.src = `https://openweathermap.org/img/w/${weatherDataObject.weather[0].icon}.png`;

    preloader.classList.add('display_none');
};



ajaxRequest(coordUrl, parseUserLocation)
    .then( () => {
        let weaherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=a9163efb797d0ad1b0f5be8eb52185ed`;
        return ajaxRequest( weaherUrl , parseWeatherData);
    } )
    .then( () => {
        // I made setTimeout for preloader example
        setTimeout(insertDataToPage,2000); 
    })
