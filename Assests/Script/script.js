$(function(){

//lifted off jquery ui webpage, references changed
//start-date references the input field for the day the trip starts
//end-date references the input field for the day the trip ends
//tripLength refrences a span tag that is meant to change with the
    var tripLength = 0;
    var tripStart = dayjs();
    var tripEnd = dayjs();
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
    var date;
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
