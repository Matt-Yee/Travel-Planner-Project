// //pulls budget saved in local storage to activities page
// var tripBudget = localStorage.getItem("budget");
// //selects element in html with id of x from activities page
// var budgetEl = document.getElementById("x");

var modalForm = document.getElementById('activityModalForm');


//this sees if anything on the activitylist was clicked, if it was a button then it logs the ID of the button clicked. I assume we will use this to inform the modal what info to load.
$('#activityList').on('click', function(event){
    if(event.target.nodeName==="BUTTON"){
        //console.log(event.target.id);
        var sourceID = event.target.id;
        //console.log(sourceID);
        $('#dayIdentity').val(sourceID);

        //console.log($('#dayIdentity'));
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
    const budget = `Budget: ${localStorage.getItem('budget')} ${localStorage.getItem('targetCurrency')}`;
    const dateHeader = $(`<h3>${dateParsed}</h3><h5>${budget}</h5>`);
    const div2 = $('<div class="grid-x grid-padding-x align-center"></div>');
    //once budget and weather are integrated, we can procedurally attach them
    const weather = '';
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
    let activityNameG = 'Add activity';
    let activityNameB = 'Add activity';
    const key = `${dayTime}-${date}`;
    if(localStorage.getItem(key)!=null){
        console.log(localStorage.getItem(key));
        const x = JSON.parse(localStorage.getItem(key));
        activityNameG = x.goodWeather;
        activityNameB = x.badWeather;
    }
    console.log(key)
    const card = $(`<div class="cell large-3"><div class="card text-center" style="width: 300px"><h4>${dayTime}</h4><div class="card section"><button class="button" data-open="activityModal" type="button" style="height: 200px" id="${key}">☀️${activityNameG}<br><br><br>⛈️${activityNameB}</button></div></div></div>`);
    return card;

}

modalForm.addEventListener('submit', function(event){
    event.preventDefault();
    // var sourceID = $('body').find('#'+$('#dayIdentity').val());
    var sourceID = $('#dayIdentity').val();

    // var grandParent = sourceID.closest('.card');

    // grandParent.empty();
    let actGood = $('#activityGood').val();
    let actBad = $('#activityBad').val();

    // console.log(grandParent + '\n'+actGood+'\n'+ actBad);
    // var cardNew = $(`<h4>${actGood}</h4><div class="card section"><p>${actBad}</p></div>`);
    // grandParent.append(cardNew);

    localStorage.setItem(sourceID, JSON.stringify({
        goodWeather: actGood,
        badWeather: actBad
    }));

    drawPage();

});












