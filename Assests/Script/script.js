const budgetEl = document.getElementById("budget");
const sendBtn = document.getElementById("send");

function getBudget(){
    const inputValue = budgetEl.value;
    console.log(inputValue)
    localStorage.setItem("number", inputValue);
}


sendBtn.addEventListener("click", getBudget)
