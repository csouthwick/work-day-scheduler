var loadSchedule = function () {
  var today = moment();
  $("#currentDay").text(today.format("dddd, MMMM Do"));
}

loadSchedule();
