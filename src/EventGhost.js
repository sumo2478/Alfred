var http = require('http');

var EG_IP = process.env.EVENT_GHOST_IP 
var EG_PORT = process.env.EVENT_GHOST_PORT

function EventGhost() {

}

/**
Opens itunes on the computer
*/
EventGhost.prototype.openItunes = function(response) {
	callEchoToEG("ITUNES", defaultSuccessCallback(response), defaultFailureCallback(response));
}

/**
Opens google on the computer
*/
EventGhost.prototype.openGoogle = function(response) {
	callEchoToEG("GOOGLE", defaultSuccessCallback(response), defaultFailureCallback(response));
}

/**
Searches query on google
*/
EventGhost.prototype.searchGoogle = function(response, query) {
	callEchoToEG("GOOGLESEARCH", defaultSuccessCallback(response), defaultFailureCallback(response), query);
}

/**
Brings up the traffic report from home to work
*/
EventGhost.prototype.openTrafficToWork = function(response) {
	callEchoToEG("TRAFFICWORK", defaultSuccessCallback(response), defaultFailureCallback(response));	
}

/**
Starts playing CNBC News Livestream 
*/
EventGhost.prototype.openNews = function(response) {
	callEchoToEG("CNBCNEWS", defaultSuccessCallback(response), defaultFailureCallback(response));	
}

/**
Opens the weather
*/
EventGhost.prototype.openWeather = function(response) {
	callEchoToEG("WEATHER", defaultSuccessCallback(response), defaultFailureCallback(response));	
}

/**
Powes the system down
*/
EventGhost.prototype.powerDown = function(response) {
	callEchoToEG("POWERDOWN", defaultSuccessCallback(response), defaultFailureCallback(response));	
}

/**
Minimizes all screens
*/
EventGhost.prototype.minimizeScreens = function(response) {
	callEchoToEG("MINIMIZE", defaultSuccessCallback(response), defaultFailureCallback(response));	
}

/**
Maximizes all screens
*/
EventGhost.prototype.maximizeScreens = function(response) {
	callEchoToEG("MAXIMIZE", defaultSuccessCallback(response), defaultFailureCallback(response));	
}

/**
Toggles the puase button
*/
EventGhost.prototype.togglePause = function(response) {
    callEchoToEG("TOGGLEPAUSE", defaultSuccessCallback(response), defaultFailureCallback(response));   
}

/**
Pulls up saratoga amc movie times
*/
EventGhost.prototype.getSaratogaMovieTimes = function(response) {
    callEchoToEG("SARATOGAMOVIETIMES", defaultSuccessCallback(response), defaultFailureCallback(response));   
}

// Helper function to call network request to event ghost
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

function defaultSuccessCallback(response) {
	if (response) {
		return function() {
			response.tell("Right away sir");
		}
	} else {
		return function() {}
	}		
}

function defaultFailureCallback(response) {
	if (response) {
		return function() {
			response.tell("Sorry, I was unable to perform that action");
		}
	} else {
		return function() {}
	}	
}

module.exports = EventGhost;