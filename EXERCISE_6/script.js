// --- 1. SETUP ---
// Replace 'YOUR_API_KEY' with the key you got from OpenWeatherMap
const apiKey = '2f974b961b92c5d3d7c9d9540d7e7082'; 
// Warning: In a real-world application, you should not expose your API key like this.
// You would typically use a server-side script or environment variables.

// Get references to DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');

// --- 2. EVENT LISTENERS ---
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

// Event listener to check for weather on page load
document.addEventListener('DOMContentLoaded', () => {
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
        getWeather(lastCity);
    }
});


// --- 3. ASYNCHRONOUS FUNCTION TO FETCH WEATHER (DEBUGGING VERSION) ---
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // This will print the exact URL to the console
    console.log('Fetching URL:', apiUrl);

    try {
        const response = await fetch(apiUrl);
        
        // This will print the raw response from the server
        console.log('API Response:', response);

        if (!response.ok) {
            // If there's an error, we'll get the details here
            const errorData = await response.json();
            console.error('API Error Message:', errorData.message);
            throw new Error(errorData.message || 'City not found.');
        }

        const data = await response.json();
        displayWeather(data);
        localStorage.setItem('lastSearchedCity', city);

    } catch (error) {
        displayError(error.message);
    }
}

// --- 4. FUNCTIONS TO UPDATE THE DOM ---
function displayWeather(data) {
    // Clear previous results
    weatherResult.innerHTML = '';

    // Create elements to display the data
    const cityName = document.createElement('p');
    cityName.className = 'city';
    cityName.textContent = data.name;

    const temp = document.createElement('p');
    temp.className = 'temp';
    temp.textContent = `${Math.round(data.main.temp)}°C`;

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = data.weather[0].description;
    
    // Append the new elements to the result container
    weatherResult.appendChild(cityName);
    weatherResult.appendChild(temp);
    weatherResult.appendChild(description);
}

function displayError(message) {
    // Clear previous results
    weatherResult.innerHTML = '';

    // Create an element to display the error message
    const errorMsg = document.createElement('p');
    errorMsg.className = 'error';
    errorMsg.textContent = message;

    weatherResult.appendChild(errorMsg);
}