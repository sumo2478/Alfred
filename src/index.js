/*
Alfred Main Code
*/

var APP_ID = 'amzn1.ask.skill.4eb021ba-4dbd-43d1-8213-24ca174f1c7d';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var EventGhost = require('./EventGhost');
var Intent = require('./IntentHandler');

var intentHandler = new Intent();

var AlfredHandler = function() {
	AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
AlfredHandler.prototype = Object.create(AlexaSkill.prototype);
AlfredHandler.prototype.constructor = AlfredHandler;

// ----------------------- Override AlexaSkill request and intent handlers -----------------------

AlfredHandler.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

AlfredHandler.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);

    var greeting = intentHandler.welcomeResponse();
    response.ask(greeting.message, greeting.reprompt);
};

AlfredHandler.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

/**
 * override intentHandlers to map intent handling functions.
 */
AlfredHandler.prototype.intentHandlers = {
	"SmartestIntent": function(intent, session, responseHandler) {
		intentHandler.smartestIntent(intent, session, responseHandler);
	},

	"PrettiestIntent": function(intent, session, responseHandler) {
		intentHandler.prettiestIntent(intent, session, responseHandler);
	},

	"HelloIntent": function(intent, session, responseHandler) {
		intentHandler.welcomeIntent(intent, session, responseHandler);
	},

    "GooglePageIntent": function(intent, session, responseHandler) {
        intentHandler.openGoogleIntent(intent, session, responseHandler);
    },

    "TrafficToWorkIntent": function(intent, session, responseHandler) {
        intentHandler.openTrafficToWorkIntent(intent, session, responseHandler);
    },

    "WeatherIntent": function(intent, session, responseHandler) {
        intentHandler.openWeatherIntent(intent, session, responseHandler);
    },

    "PowerDownIntent": function(intent, session, responseHandler) {
        intentHandler.powerDownIntent(intent, session, responseHandler);
    },

    "ShowDashboardIntent": function(intent, session, responseHandler) {
        intentHandler.showDashboardIntent(intent, session, responseHandler);
    },

    "MaximizeScreenIntent": function(intent, session, responseHandler) {
        intentHandler.maximizeScreensIntent(intent, session, responseHandler);
    },

    "BestParentsIntent": function(intent, session, responseHandler) {
        intentHandler.bestParentsIntent(intent, session, responseHandler);
    },  

    "TogglePauseIntent": function(intent, session, responseHandler) {
        intentHandler.togglePauseIntent(intent, session, responseHandler);
    }, 

    "OpenSessionIntent": function(intent, session, responseHandler) {
        intentHandler.openSessionIntent(intent, session, responseHandler);
    },

    "CloseSessionIntent": function(intent, session, responseHandler) {
        intentHandler.closeSessionIntent(intent, session, responseHandler);
    },

    "MovieTimesIntent": function(intent, session, responseHandler) {
        intentHandler.movieTimesIntent(intent, session, responseHandler);
    },    

	"AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("Help");
    },

    "AMAZON.StopIntent": function (intent, session, responseHandler) {
        intentHandler.goodbyeIntent(intent, session, responseHandler);  
    },

    "AMAZON.CancelIntent": function (intent, session, responseHandler) {
        intentHandler.goodbyeIntent(intent, session, responseHandler);  
    }

	// Handle Intents here
	/*
    "OneshotTideIntent": function (intent, session, response) {
        handleOneshotTideRequest(intent, session, response);
    },

    "DialogTideIntent": function (intent, session, response) {
        // Determine if this turn is for city, for date, or an error.
        // We could be passed slots with values, no slots, slots with no value.
        var citySlot = intent.slots.City;
        var dateSlot = intent.slots.Date;
        if (citySlot && citySlot.value) {
            handleCityDialogRequest(intent, session, response);
        } else if (dateSlot && dateSlot.value) {
            handleDateDialogRequest(intent, session, response);
        } else {
            handleNoSlotDialogRequest(intent, session, response);
        }
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        handleHelpRequest(response);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
    */
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var alfredHandler = new AlfredHandler();
    alfredHandler.execute(event, context);
};
