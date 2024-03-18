$(function(){

//lifted off jquery ui webpage, references changed
//start-date references the input field for the day the trip starts
//end-date references the input field for the day the trip ends
//tripLength refrences a span tag that is meant to change with the
    var tripLength;
    var dateFormat = "dd-mm-yy",
    from = $( "#start-date" )
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
        updateLength();
      }),
    to = $( "#end-date" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1
    })
    .on( "change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
      updateLength();
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
  //runs every time you update the fields, calculates the difference between the dates with dayjs
  function updateLength(){
    const startDayJS = dayjs($("#start-date").val());
    const endDayJS = dayjs($("#end-date").val());
    tripLength = endDayJS.diff(startDayJS, "day");
    $("#tripLength").text(tripLength);

  }







});
