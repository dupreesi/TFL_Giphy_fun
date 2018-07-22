// 1. Create general API request to be reused for Tfl and Giphy Server requests
function apiRequest(url, cb) {
  var xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var parsedObj = JSON.parse(xhr.responseText);
      return cb(parsedObj);
    }
    // Display error message if API request is unsuccessful
    else if (xhr.readyState == 4 && xhr.status != 200) {
      document.getElementById("error").textContent = "Unable to load data :(";
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

// 2. Get Tfl line status

function getLineStatus(lineName) {
  var line = document.getElementById("tube-lines");
  var value = line.options[line.selectedIndex].value;
  var url = "https://api.tfl.gov.uk/line/" + value + "/status?details=false";
  // make API request to TfL
  // CALLBACK ALARM (anonymous function baby)!!!
  apiRequest(url, function(tflObject) {
    tflObject.forEach(function(line) {
      // line status variable filtered out of parsed JSON
      var lineStatus = line.lineStatuses[0].statusSeverityDescription;
      // puts line status text into DOM
      document.querySelector("#status-description").innerHTML =
        lineStatus.toUpperCase() + " ON<br>" + lineName.toUpperCase();
      getGiphy(lineStatus);
    });
  });
}

// 3. Get Giphy .gif based on line status which is in turn selecting a mood out of an object called sediment
var sentimentObject = {
  GoodService: "happy-dancing",
  MinorDelays: "shrugging",
  ReducedService: "shrugging",
  PlannedClosure: "sighing",
  PartClosure: "sighing",
  SevereDelays: "screaming",
  Suspended: "impatient",
  PartSuspended: "impatient",
  BusService: "bus",
  SpecialService: "nah"
};

function getGiphy(statusDescription) {
  // create url for GIPHY API request with sentiment search query
  var sentiment = sentimentObject[statusDescription.split(" ").join("")];
  var url =
    "https://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC&tag=" +
    sentiment;
  //Make API-REQUEST
  apiRequest(url, function(giphyObj) {
    // Remove error message upon successful API request
    document.getElementById("error").textContent = "";
    giphyImg.src = giphyObj.data.images.fixed_height.url;
    giphyDiv.classList.remove("hidden");
  });
}

// 4. Sets background color according to line selected based on color object
// colors for logo and submit button changing
var logoColorObject = {
  bakerloolist: "rgba(174, 97, 24, 1.0)",
  centrallist: "rgba(228, 31, 31, 1.0)",
  circlelist: "rgba(248, 212, 45, 1.0)",
  districtlist: "rgba(0, 165, 117, 1.0)",
  handclist: "rgba(232, 153, 168, 1.0)",
  jubileelist: "rgba(143, 152, 158, 1.0)",
  metrolist: "rgba(137, 50, 103, 1.0)",
  northernlist: "rgba(0, 0, 0, 1.0)",
  piccadillylist: "rgba(4, 80, 161, 1.0)",
  victorialist: "rgba(0, 159, 224, 1.0)",
  wandclist: "rgba(112, 195, 206, 1.0)",
  dlrlist: "rgba(0, 187, 180, 1.0)",
  overgroundlist: "rgba(248, 108, 0, 1.0)",
  tflraillist: "rgba(4, 80, 161, 1.0)"
};

function getColor(lineId) {
  submitButton.style.backgroundColor = logoColorObject[lineId];
  document.body.style.backgroundColor = logoColorObject[lineId];
}

// 5./6. next and previous functions for skip buttons
var tubeSelect = document.querySelector("#tube-lines");
var options = tubeSelect.getElementsByTagName("option");

function next() {
  var index;
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected) {
      index = i;
    }
  }
  index = index + 1;
  if (index >= tubeSelect.length) {
    alert("last tube line reached");
  } else {
    tubeSelect.value = tubeSelect[index].value;
  }
}

function previous() {
  var index;
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected) {
      index = i;
    }
  }
  index = index - 1;
  if (index <= -1) {
    alert("first tube line reached");
  } else {
    tubeSelect.value = tubeSelect[index].value;
  }
}

if (typeof module !== "undefined") {
  module.exports = logic;
}
