//pulls budget saved in local storage to activities page
var tripBudget = localStorage.getItem("budget");
//selects element in html with id of x from activities page
var budgetEl = document.getElementById("x")

//accesses the content of the budgetEl, sets the innerHTML property of the budgetEL element to teh value stored in the tripBudget variable.
budgetEl.innerHTML = tripBudget;
//this sees if anything on the activitylist was clicked, if it was a button then it logs the ID of the button clicked. I assume we will use this to inform the modal what info to load.
$('#activityList').on('click', function(event){
    if(event.target.nodeName==="BUTTON"){
        console.log(event.target.id);
    }
});
//draws page, run at the start of the page loading and should be run again every time the modal is exited to present new data
drawPage();
//function to draw entire page of data based on stored info
function drawPage(){
    $('#activityList').empty();
    const tripLength = parseInt(localStorage.getItem('tripLength'));
    let date = dayjs(localStorage.getItem('tripStart'));
    for (let index = 0; index < tripLength; index++) {
        generateDay(date.format('MM-DD-YY').toString());
        date=date.add(1, 'day');
    }
}
//date is a 6 character string representing the date in
function generateDay(date){
    const div = $(`<div class="grid-container fluid" id="activityList-${date}"></div>`);
    const morning = generateCard('morning', date);
    const afternoon = generateCard('afternoon', date);
    const evening = generateCard('evening', date);
    const dateParsed = dayjs(date, 'MM-DD-YY').format('dddd, MMMM DD');
    const dateHeader = $(`<h3>${dateParsed}</h3>`);
    const div2 = $('<div class="grid-x grid-padding-x align-center"></div>');
    //once budget and weather are integrated, we can procedurally attach them
    const weather = '';
    const budget = '';
    div2.append(morning);
    div2.append(afternoon);
    div2.append(evening);
    div.append(dateHeader);
    div.append(div2);
    $('#activityList').append(div);
}
//this generates the html for the cards themselves
// this code presumes a data structure for the days of objects that look like this:
// 'dayjs(3/22/24)' = {
//     goodMorning: 'activityName',
//     badMorning: 'activityName',
//     goodAfternoon: 'activityName',
//     badAfternoon: 'activityName',
//     goodEvening: 'activityName',
//     badEvening: 'activityName'
// }
//where the values are all strings that correspond to the activities that should be done when the weather is good or bad
function generateCard(dayTime, date){
    let activityName = '';
    if(localStorage.getItem(date)!=null){
        if(goodWeather(dayTime, date)){
            activityName=localStorage.getItem(date)[dayTime+'Good'];
        }else{
            activityName=localStorage.getItem(date)[dayTime+'Bad'];
        }
    }
    if(activityName==''||activityName==null) activityName='Add activity';
    const card = $(`<div class="cell large-3"><div class="card" style="width: 300px"><div class="card section"><button class="button" type="button" style="height: 200px" id="${dayTime}-${date}">${activityName}</button></div></div></div>`);
    return card;

}
//a shell function for when we get the weather running
function goodWeather(){
    //returns true if the weather at the given date and time was projected to be 'good'
}














