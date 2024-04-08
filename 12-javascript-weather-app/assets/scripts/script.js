const API_KEY = 'd7713e1665ff45cdad1125110240504';
const baseURL = 'https://api.weatherapi.com/v1';
const Search = '/forecast.json';

document.addEventListener('DOMContentLoaded', () => {
    let searchValue = 'Jakarta'
    randomBackground();
    searchWeather(searchValue);
    
    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.querySelector('#search-input');
        searchValue = searchInput.value;
        searchWeather(searchValue);
    });

    const toggle = document.querySelector('#toggle');
    toggle.addEventListener('change', (event) => {
        event.preventDefault();
        searchWeather(searchValue);
    });
});

const randomBackground = () => {
    const images = [
        {
            name: 'mountain reflection on body of water',
            description: 'There is something about a huge mountain reflection in a lake that just puts you at ease. Here is another picture from my trip to the Canadian Rockies. Lake Minnewanka at Sunrise.',
            source: './assets/images/background/james-wheeler-ZOA-cqKuJAA-unsplash.jpg',
            author: 'James Wheeler',
            url: 'https://unsplash.com/photos/mountain-reflection-on-body-of-water-ZOA-cqKuJAA'
        },
        {
            name: 'green trees near body of water during daytime',
            description: 'Download this free HD photo of nature, hintersee, landscape, and wallpaper in Ramsau bei Berchtesgaden, Deutschland by Johannes Plenio (@jplenio)',
            source: './assets/images/background/johannes-plenio-bhCdwWNmXw8-unsplash.jpg',
            author: 'Johannes Plenio',
            url: 'https://unsplash.com/photos/green-trees-near-body-of-water-during-daytime-bhCdwWNmXw8'
        },
        {
            name: 'red and green trees beside river during daytime',
            description: 'Tokumeien Zen Garden in Takasaki, Japan [IF YOU USE MY PICTURES, PLS CREDIT ME (insta : @dreiimos)]',
            source: './assets/images/background/lucas-calloch-P-yzuyWFEIk-unsplash.jpg',
            author: 'Lucas Calloch',
            url: 'https://unsplash.com/photos/red-and-green-trees-beside-river-during-daytime-P-yzuyWFEIk'
        }
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const body = document.querySelector('body');
    body.style.backgroundImage = `url(${randomImage.source})`;

    const footer = document.querySelector('footer');
    const footerText = document.createElement('p');
    footerText.innerHTML = `Photo by <a href="${randomImage.url}" target="_blank">${randomImage.author}</a> on <a href="https://unsplash.com/" target="_blank">Unsplash</a>`;
    footer.appendChild(footerText);
}

const searchWeather = async (searchValue) => {
    const searchURL = `${baseURL}${Search}?key=${API_KEY}&q=${searchValue}`;
    const searchResponse = await fetch(searchURL);
    const searchResults = await searchResponse.json();
    const toggle = document.querySelector('#toggle');
    let isCelcius = toggle.checked ? false : true;

    console.log(searchResults);
    displayWeather(searchResults, isCelcius);
}

const displayWeather = (weatherData, isCelcius) => {
    const city = document.getElementsByClassName('city')[0];
    const country = document.getElementsByClassName('country')[0];
    const timezone = document.getElementsByClassName('timezone')[0];

    const icon = document.getElementsByClassName('icon')[0];
    const description = document.getElementsByClassName('description')[0];
    const temperature = document.getElementsByClassName('temperature')[0];
    const humidity = document.getElementsByClassName('humidity')[0];
    const wind = document.getElementsByClassName('wind')[0];
    const feelsLike = document.getElementsByClassName('feels-like')[0];
    const hourlyForecast = document.getElementsByClassName('hourly-forecast')[0];

    city.innerHTML = weatherData.location.name;
    country.innerHTML = weatherData.location.country;
    timezone.innerHTML = weatherData.location.tz_id;
    icon.src = weatherData.current.condition.icon;
    description.innerHTML = weatherData.current.condition.text;
    humidity.innerHTML = `Humidity: ${weatherData.current.humidity}%`;
    hourlyForecast.innerHTML = '';

    if (!isCelcius) {
        temperature.innerHTML = `${weatherData.current.temp_f}°F`;
        wind.innerHTML = `Wind:  ${weatherData.current.wind_mph} mph`;
        feelsLike.innerHTML = `Feels Like: ${weatherData.current.feelslike_f}°F`;
        weatherData.forecast.forecastday[0].hour.forEach((hour) => {
            const hourlyForecastItem = document.createElement('div');
            hourlyForecastItem.classList.add('hourly-forecast-item');
            hourlyForecastItem.innerHTML = `
                <p>${hour.time.slice(-5)}</p>
                <img src="${hour.condition.icon}" alt="${hour.condition.text}">
                <p>${hour.temp_f}°F</p>
            `;
            hourlyForecast.appendChild(hourlyForecastItem);
        });
    } else {
        temperature.innerHTML = `${weatherData.current.temp_c}°C`;
        wind.innerHTML = `Wind:  ${weatherData.current.wind_kph} km/h`;
        feelsLike.innerHTML = `Feels Like: ${weatherData.current.feelslike_c}°C`;
        weatherData.forecast.forecastday[0].hour.forEach((hour) => {
            const hourlyForecastItem = document.createElement('div');
            hourlyForecastItem.classList.add('hourly-forecast-item');
            hourlyForecastItem.innerHTML = `
                <p>${hour.time.slice(-5)}</p>
                <img src="${hour.condition.icon}" alt="${hour.condition.text}">
                <p>${hour.temp_c}°C</p>
            `;
            hourlyForecast.appendChild(hourlyForecastItem);
        });
    }
}
