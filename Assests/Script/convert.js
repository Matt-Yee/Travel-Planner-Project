//added function in to link to activites page
// sendBtn?.addEventListener("click", function(event){
//     event.preventDefault();
//     location.assign("activites.html");
//     getBudget();
// })

// var amount = document.getElementById("#amount");
// var toCurrency = document.getElementById("#toCurrency");
// var fromCurrency = document.getElementById("#fromCurrency");
// //currency converter api
// const url = `https://currency-converter241.p.rapidapi.com/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '99ba836070msh21a815cb6cbff68p1660a8jsn0470850fa436',
// 		'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
// 	}
// };
var endTotal
var convertBTN = document.getElementById("convertForm");
console.log(convertBTN);
convertBTN.addEventListener("submit", function fetchdata(event){
event.preventDefault()

var amount = document.getElementById("amount").value;
var toCurrency = document.getElementById("toCurrency").value;
var fromCurrency = document.getElementById("fromCurrency").value;
//currency converter api
console.log(amount);
const url = `https://currency-converter241.p.rapidapi.com/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '99ba836070msh21a815cb6cbff68p1660a8jsn0470850fa436',
		'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
	}
};
console.log(url);
fetch(url, options)
.then(function (response) {

  return response.json();
})
.then(function (response) {
endTotal = response.total
var totalLine = document.getElementById("convertResult")
totalLine.innerText = endTotal.toFixed(2);
localStorage.setItem("converted", endTotal.toFixed(2))
console.log(endTotal)
});
})

var budgetVal = localStorage.getItem("Budget");
    var budgetCur = localStorage.getItem("money");
    $('#budgetDisplay').html('<h4>'+budgetVal+' '+budgetCur+'</h4>');


    const titleContainer = document.getElementById('pageHeader');
    const destination = JSON.parse(localStorage.getItem('Destination')) || [];

    if (destination.length > 0) {
      const city = destination[0].city;
      const temperature = destination[0].temperature;
      const fahrenheit = (temperature * 9/5 + 32).toFixed(1);
      titleContainer.innerText = `🌎 Travel Planner - ${city}, ${fahrenheit}°F , ${temperature}°C`;
    }

// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }


