const apiKey = '6b9efb5cdad556136ff528d1bdc2bae5';
const forecastDiv = document.getElementById('forecast'); // ID TBD

const form = document.getElementById('location');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityInput = document.getElementById('city');
    const city = cityInput.value.trim();

    if (city) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&days=5`;

    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
            displayForecast(data);
            } else {
            throw new Error('Error fetching destination data.');
            }
        })
        .catch((error) => {
            console.error('Error fetching destination data:', error);
            forecastDiv.textContent = 'Error fetching destination data. Please try again.';
        });
        } else {
            forecastDiv.textContent = 'Please enter a city.';
        }
});




