if (typeof module !== "undefined") {
  var logic = require("./logic.js");
}

// Setup DOM Vars

var form = document.querySelector(".line-select");
var submitButton = document.querySelector(".submit");
var statusDescr = document.querySelector("#status-description");
var giphyDiv = document.querySelector(".giphy-div");
var giphyImg = document.querySelector("#giphy-img");
var nextButton = document.querySelector(".next");
var prevButton = document.querySelector(".previous");

//EVENT LISTENER ON FORM
form.addEventListener("submit", function(event) {
  event.preventDefault();
  var line = document.getElementById("tube-lines");
  var value = line.options[line.selectedIndex].value;
  var lineId = line.options[line.selectedIndex].id;
  // CALL GET LINE STATUS (WHICH CALLS GIPHY)
  getLineStatus(value);
  // CALL GET COLOR FUNCTION TO CHANGE BUTTON AND LOGO BACKGROUND
  getColor(lineId);
});
// Event Listeners on next, prev buttons to skip through list
nextButton.addEventListener("click", function(e) {
  e.preventDefault();
  next();
});
prevButton.addEventListener("click", function(e) {
  e.preventDefault();
  previous();
});
