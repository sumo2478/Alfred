var http = require('http');

var EG_IP = process.env.EVENT_GHOST_IP 
var EG_PORT = process.env.EVENT_GHOST_PORT

function EventGhost(responseHandler) {
    if (!responseHandler) {
        throw "Need to pass in a response handler";
    }

    this.responseHandler = responseHandler
}

/**
Opens google on the computer
*/
EventGhost.prototype.openGoogle = function() {
    var googleUrl = "http://www.google.com";
	this.openWebpage(googleUrl);
}

/**
Searches query on google
*/
EventGhost.prototype.searchGoogle = function(query) {
    var searchUrl = "https://www.google.com/search?q=" + query;
	this.openWebpage(searchUrl);
}

/**
Brings up the traffic report from home to work
*/
EventGhost.prototype.openTrafficToWork = function() {
    var trafficUrl = "https://www.google.com/maps/dir/15040+El+Quito+Way,+Saratoga,+CA+95070/950+W+Maude+Ave,+Sunnyvale,+CA/@37.3251484,-122.0999958,12z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x808e4a80b70027d1:0x80f1a9923a24c4fc!2m2!1d-121.99796!2d37.250085!1m5!1m1!1s0x808fb70101e8b2f1:0xe93aae4c8625af8!2m2!1d-122.0409214!2d37.3924629";
    this.openWebpage(trafficUrl);
}

/**
Starts playing CNBC News Livestream 
*/
EventGhost.prototype.openNews = function() {
    var newsUrl = "http://www.cnbc.com/live-tv/";
    this.openWebpage(newsUrl);
}

/**
Opens the weather
*/
EventGhost.prototype.openWeather = function() {
    var weatherUrl = "https://www.msn.com/en-us/weather/today/Saratoga,California,United-States/we-city-37.2711,-122.014?q=saratoga-california";
    this.openWebpage(weatherUrl);
}

/**
Opens the google drive link
*/
EventGhost.prototype.openGoogleDrive = function() {
    var googleDriveUrl = "https://docs.google.com/document/d/1n2tc40S7oh1M70_TnYzZiVJeARlN47mTjSS9f_AghFM/edit?usp=sharing";
    this.openWebpage(googleDriveUrl);
}

/**
Powes the system down
*/
EventGhost.prototype.powerDown = function() {
	callEchoToEG("POWERDOWN", defaultSuccessCallback(this.responseHandler), defaultFailureCallback(this.responseHandler));	
}

/**
Minimizes all screens
*/
EventGhost.prototype.minimizeScreens = function() {
	callEchoToEG("MINIMIZE", defaultSuccessCallback(this.responseHandler), defaultFailureCallback(this.responseHandler));	
}

/**
Maximizes all screens
*/
EventGhost.prototype.maximizeScreens = function() {
	callEchoToEG("MAXIMIZE", defaultSuccessCallback(this.responseHandler), defaultFailureCallback(this.responseHandler));	
}

/**
Toggles the puase button
*/
EventGhost.prototype.togglePause = function() {
    callEchoToEG("TOGGLEPAUSE", defaultSuccessCallback(this.responseHandler), defaultFailureCallback(this.responseHandler));   
}

/**
Turns up the volume
*/
EventGhost.prototype.turnUpVolume = function() {
    callEchoToEG("VOLUMEUP", defaultSuccessCallback(this.responseHandler), defaultFailureCallback(this.responseHandler));   
}

/**
Turns down the volume
*/
EventGhost.prototype.turnDownVolume = function() {
    callEchoToEG("VOLUMEDOWN", defaultSuccessCallback(this.responseHandler), defaultFailureCallback(this.responseHandler));   
}

/**
Pulls up saratoga amc movie times
*/
EventGhost.prototype.getSaratogaMovieTimes = function() {
    var movieUrl = "http://www.fandango.com/amcsaratoga14_aaecu/theaterpage";
    this.openWebpage(movieUrl);
}

// Helper function to call network request to event ghost
EventGhost.prototype.openWebpage = function(url, responseHandler) {
    var handler = responseHandler || this.responseHandler;
    callEchoToEG("OPENWEBPAGE", defaultSuccessCallback(handler), defaultFailureCallback(handler), url);
}

function callEchoToEG(eventName, successCallback, failureCallback, queryParameter) {
	// Options included where we should send the request to with or without basic auth
    var EG_uri = '/index.html?' + eventName;
    if (queryParameter) {
    	EG_uri = EG_uri + '&' + require('querystring').escape(queryParameter);
    }

    var get_options = {
        host: EG_IP,
        port: EG_PORT,
        path: EG_uri
    };
  
    console.log("Sending request to " + get_options.host + ":" + get_options.port + get_options.path);

    // Set up the request
    var get_req = http.request(get_options, function(res) {
        var eg_results = "";
        console.log('callEchoToEG - STATUS : ' + res.statusCode);
        console.log('callEchoToEG - HEADERS: ' + JSON.stringify(res.headers));

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            eg_results += chunk;
        });

        res.on('end', function () {
            if (res.statusCode === 200) {
                console.log('Body: ' + eg_results);
                successCallback();
            } else {
                console.log('callEchoToEG - Error, EventGhost response code was ' + res.statusCode);
                failureCallback();
            }
        });
    });

    get_req.on('error', function (e) {
        console.log(e);
        failureCallback();
    });

    get_req.end();
}

function defaultSuccessCallback(responseHandler) {
	if (responseHandler) {
		return function() {
            var successMessage = randomSuccessResponse();
			responseHandler(successMessage);
		}
	} else {
		return function() {}
	}		
}

function defaultFailureCallback(responseHandler) {
	if (responseHandler) {
		return function() {
			responseHandler("Sorry, I was unable to perform that action");
		}
	} else {
		return function() {}
	}	
}

function randomSuccessResponse() {
    var randomNumber = Math.floor((Math.random() * 4));
    if (randomNumber == 0) {
        return "Right away";
    } else if (randomNumber == 1) {
        return "Okay";
    } else if (randomNumber == 2) {
        return "Sounds good"
    } else if (randomNumber == 3) {
        return "Yes sir";
    }
}

module.exports = EventGhost;