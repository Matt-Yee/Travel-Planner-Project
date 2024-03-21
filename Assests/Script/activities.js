//pulls budget saved in local storage to activities page
var tripBudget = localStorage.getItem("budget");
//selects element in html with id of x from activities page
var budgetEl = document.getElementById("x")

console.log(x);

//accesses the content of the budgetEl, sets the innerHTML property of the budgetEL element to teh value stored in the tripBudget variable.
budgetEl.innerHTML = tripBudget;

console.log("Hello");
