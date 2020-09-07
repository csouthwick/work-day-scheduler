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

// update past, present, and future color coding
var updateTimeBlockStatus = function () {
  // get the current time but at the start of the hour to make the comparison easier
  var now = moment().startOf("hour");

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

// auto update the past, present, and future color coding exactly on the hour
var initCheckTime = function () {
  var nextHour = moment().startOf("hour").add(1, "hour");
  // milliseconds to next hour + 1 second to account for slight differences in time
  var msToGo = nextHour.diff(moment()) + 1000;

  setTimeout(function () {
    // Next hour has been reached. Update the block status
    updateTimeBlockStatus();
    // Set interval to check once every hour after this
    setInterval(updateTimeBlockStatus, (1000 * 60 * 60));
  }, msToGo);
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
initCheckTime();
