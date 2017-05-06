var locations = {};

function setup() {
  createCanvas(720, 720);
  makeCorsRequest();
  updateMap();
}

function draw() {
  background(255);
  noStroke();
  textAlign(CENTER, CENTER);

  fill(49, 51, 46);
  rect(40, 40, 600, 600);

  if (frameCount % 100 == 0) {
    makeCorsRequest();
  }

  updateMap();
}

function updateMap() {
  for (var i = 1; i <= 30; i++) {
    textSize(11);
    text(i, 20, 40 + i * 20);

    stroke(255);
    line(40, 40 + i * 20, 640, 40 + i * 20);
  }
  text("y", 20, 660);

  for (var i = 1; i <= 30; i++) {
    textSize(11);
    text(i, 40 + i * 20, 30);

    stroke(255);
    line(40 + i * 20, 40, 40 + i * 20, 640);
  }
  text("x", 660, 30);

  for (var prop in locations) {
    if(!locations.hasOwnProperty(prop)) continue;

    fill(0, 255, 0);
    noStroke();
    textSize(15);
    textAlign(LEFT, TOP);
    text(prop, 45 + locations[prop].x * 20, 45 + locations[prop].y * 20);

    fill(255, 0, 0);
    stroke(255);
    ellipse(40 + locations[prop].x * 20, 40 + locations[prop].y * 20, 10, 10);
  }

  descriptions();
}

function descriptions() {
  textSize(11);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Keittiö", 330, 10);
  text("Valkokangas", 330, 660);
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'https://keisari.herokuapp.com';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    locations = JSON.parse(text);
    console.log(locations);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
