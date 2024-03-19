const budgetEl = document.getElementById("budget");
const sendBtn = document.getElementById("submit");

function getBudget(){
    const inputValue = budgetEl.value;
    console.log(inputValue)
    localStorage.setItem("number", inputValue);
}

//added function in to link to activites page
sendBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.replace("activites.html");
    getBudget();
})


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


// try {
// 	const response = await fetch(url, options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
