const apiKey = '6b9efb5cdad556136ff528d1bdc2bae5';
const forecastDiv = document.getElementById('forecast'); // ID TBD
const form = document.getElementById('planner-form');

let Destination = JSON.parse(localStorage.getItem('Location')) || [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityInput = document.getElementById('location');
    const city = cityInput.value.trim();

    if (city) {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&days=5`;

        fetch(forecastUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.list && data.list.length > 0) {
                    const forecastData = data.list.slice(0, 5).map((item) => {
                        return {
                            city: city,
                            temperature: item.main.temp,
                            precipitationChance: item.weather[0].id >= 500 && item.weather[0].id <= 504 ? 100 : 0
                        };
                    });

                    Destination.push(...forecastData);

                    console.log(forecastData);
                }
            });
    }
});

