var loadSchedule = function () {
  var today = moment();
  $("#currentDay").text(today.format("dddd, MMMM Do"));

  $(".time-block").each(function () {
    var hour = $(this).find(".hour div").text().trim();
    var description = localStorage.getItem(hour) || "";
    $(this).find(".description").text(description);
  });

  updateTimeBlockStatus();
}

// update past, prestent, and future color coding
var updateTimeBlockStatus = function () {
  // get the current time but set the minutes, seconds, and milliseconds to 0 to make the comparison easier
  var now = moment().minute(0).second(0).millisecond(0);

  // check each time bock and set the past/present/future status appropriately
  $(".time-block").each(function () {
    // remove any previously added past/present/future classes
    $(this).removeClass("past present future");

    var hour = $(this).find(".hour div").text().trim();
    hour = moment(hour, "hA");
    var difference = hour.diff(now, "hours");

    if (difference < 0) {
      $(this).addClass("past");
    } else if (difference > 0) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
};

// task description was clicked
$(document).on("click", ".description", function () {
  // get current text
  var text = $(this).text().trim();

  // get current classes
  var classes = $(this).attr("class");

  // replace with a new textarea
  var textInput = $("<textarea>").addClass(classes).val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

// textarea lost focus
$(document).on("blur", "textarea.description", function () {
  // get current value
  var text = $(this).val().trim();

  // get current classes
  var classes = $(this).attr("class");

  // replace with a new div
  var div = $("<div>").addClass(classes).text(text);
  $(this).replaceWith(div);
});

// save button was clicked
$(document).on("click", ".saveBtn", function () {
  var timeBlock = $(this).closest(".time-block");
  var hour = timeBlock.find(".hour div").text().trim();
  var description = timeBlock.find(".description").text().trim();
  localStorage.setItem(hour, description);
});


loadSchedule();
