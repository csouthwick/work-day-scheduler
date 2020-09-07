var loadSchedule = function () {
  var today = moment();
  $("#currentDay").text(today.format("dddd, MMMM Do"));
}

// save button was clicked
$(document).on("click", ".saveBtn", function () {
  var timeBlock = $(this).closest(".time-block");
  var hour = timeBlock.find(".hour div").text().trim();
  var description = timeBlock.find(".description").text().trim();
  var data = {
    hour: hour,
    description: description
  };
  console.log(data);
});


loadSchedule();
