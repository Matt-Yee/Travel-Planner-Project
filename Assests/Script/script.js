
const apiKey = '6b9efb5cdad556136ff528d1bdc2bae5';
const forecastDiv = document.getElementById('forecast'); // ID TBD
const form = document.getElementById('planner-form');

var Destination = JSON.parse(localStorage.getItem('Location')) || [];

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
    getBudget();
    location.assign("activites.html");

});


//functions to display the arrayed data via dom manipulation
function displayCity() {
  const cityContainer = document.getElementById('city-container'); //ID TBD
  cityContainer.innerHTML = '';

  Destination.forEach((destination) => {
    const cityElement = document.createElement('p'); //creating a p tag for each city. p tag can be changed to any other HTML tag
    cityElement.textContent = destination.city;
    cityContainer.appendChild(cityElement);
  });
}

function displayTemperature() {
  const temperatureContainer = document.getElementById('temperature-container'); //ID TBD
  temperatureContainer.innerHTML = '';

  Destination.forEach((destination) => {
    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = destination.temperature;
    temperatureContainer.appendChild(temperatureElement);
  });
}

function displayPrecipitationChance() {
  const precipitationChanceContainer = document.getElementById('precipitation-chance-container'); //ID TBD
  precipitationChanceContainer.innerHTML = '';

  Destination.forEach((destination) => {
    const precipitationChanceElement = document.createElement('p');
    precipitationChanceElement.textContent = destination.precipitationChance;
    precipitationChanceContainer.appendChild(precipitationChanceElement);
  });
}


function updateCSS() {
//   forecastDiv.setAttribute('class', '')

// data.forEach((item) =>) {
//   const temp =
//   item.temperature < 10
//   ? 'freezing' //if the temperature is less than 10, the class will be freezing
//   : item.temperature < 20
//   ? 'cold' // if the temperature is less than 20, the class will be cold
//   item.temperature < 30 ?
//   ? 'hot'; // if the temperature is less than 30, the class will be hot
//   const precipitation = item.precipitationChance > 50 ? 'rainy' : 'sunny'; //if the precipitation chance is greater than 50, the class will be rainy, otherwise it will be sunny
// }
}

$(function(){

//lifted off jquery ui webpage, references changed, new actions on the on change functions added
//start-date references the input field for the day the trip starts
//end-date references the input field for the day the trip ends
//tripLength refrences a span tag that is meant to change with the
    let tripLength = 0;
    let tripStart = dayjs();
    let tripEnd = dayjs();
    var dateFormat = "MM/DD/YY",
    from = $( "#start-date" )
      .datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        defaultDate: this.date
      })
      .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
        tripStart = dayjs($("#start-date").val());
        localStorage.setItem("tripStart", tripStart);
        getDates();
        renderDates();
        if($('#end-date').val()!='')updateLength();
      }),
    to = $( "#end-date" ).datepicker({
      changeMonth: true,
      numberOfMonths: 1
    })
    .on( "change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
      tripEnd = dayjs($("#end-date").val());
      localStorage.setItem("tripEnd", tripEnd);
      getDates();
      renderDates();
      if($('#start-date').val()!='')updateLength();
    });

  function getDate( element ) {
    let date;
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }
  getDates();
  renderDates();
  //runs every time you update the fields, calculates the difference between the dates with dayjs
  function updateLength(){
    tripLength = tripEnd.diff(tripStart, "day")+1;
    localStorage.setItem("tripLength", tripLength);
    $("#tripLength").text(tripLength);

  }
  function renderDates(){
      $("#tripLength").text(tripLength);
      $("#start-date").val(dayjs(tripStart).format(dateFormat));
      $("#end-date").val(dayjs(tripEnd).format(dateFormat));
  }

  function getDates(){
      if(localStorage.getItem("tripLength")!=null)tripLength=localStorage.getItem("tripLength");
      if(localStorage.getItem("tripStart")!=null)tripStart=dayjs(localStorage.getItem("tripStart"));
      if(localStorage.getItem("tripEnd")!=null)tripEnd=dayjs(localStorage.getItem("tripEnd"));
  }
});


const budgetEl = document.getElementById("budget");
const sendBtn = document.getElementById("submit");

function getBudget(){
    const inputValue = budgetEl.value;
    console.log(inputValue)
    localStorage.setItem("number", inputValue);
}

//added function in to link to activites page
// sendBtn.addEventListener("click", function(event){
//     event.preventDefault();
//     location.assign("activites.html");
//     getBudget();
// })


//currency converter api
const url = 'https://currency-converter241.p.rapidapi.com/conversion_rate?from=UYU&to=USD';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '99ba836070msh21a815cb6cbff68p1660a8jsn0470850fa436',
		'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
	}
};

fetch(url, options)
.then(function (response) {
  return response.json();
})
.then(function (data) {
console.log(data)
});
