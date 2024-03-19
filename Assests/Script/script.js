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
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://currency-converter241.p.rapidapi.com/conversion_rate?from=UYU&to=USD',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '99ba836070msh21a815cb6cbff68p1660a8jsn0470850fa436',
		'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
