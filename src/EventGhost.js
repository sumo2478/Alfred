var http = require('http');

var EG_IP = '73.158.191.218';
// var EG_IP = "10.0.0.214";
var EG_PORT = '2335';
var EG_EVENT = 'EchoToEG';

function EventGhost() {

}

/**
Opens itunes on the computer
*/
EventGhost.prototype.openItunes = function(successCallback, failureCallback) {
	this.callEchoToSG("ITUNES", successCallback, failureCallback);
}

// Helper function to call network request to event ghost
EventGhost.prototype.callEchoToSG = function(eventName, successCallback, failureCallback) {
	// Options included where we should send the request to with or without basic auth
    var EG_uri = '/index.html?' + eventName;
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

module.exports = EventGhost;
