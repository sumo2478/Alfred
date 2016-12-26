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

    intentHandler.welcomeIntent(null, session, response);
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
	"SmartestIntent": function(intent, session, response) {
		intentHandler.smartestIntent(intent, session, response);
	},

	"PrettiestIntent": function(intent, session, response) {
		intentHandler.prettiestIntent(intent, session, response);
	},

	"HelloIntent": function(intent, session, response) {
		intentHandler.welcomeIntent(intent, session, response);
	},

	"ItunesIntent": function(intent, session, response) {
        intentHandler.openItunesIntent(intent, session, response);  
	},

    "GooglePageIntent": function(intent, session, response) {
        intentHandler.openGoogleIntent(intent, session, response);
    },

    "TrafficToWorkIntent": function(intent, session, response) {
        intentHandler.openTrafficToWorkIntent(intent, session, response);
    },

    "WeatherIntent": function(intent, session, response) {
        intentHandler.openWeatherIntent(intent, session, response);
    },

    "PowerDownIntent": function(intent, session, response) {
        intentHandler.powerDownIntent(intent, session, response);
    },

    "ShowDashboardIntent": function(intent, session, response) {
        intentHandler.showDashboardIntent(intent, session, response);
    },

    "MaximizeScreenIntent": function(intent, session, response) {
        intentHandler.maximizeScreensIntent(intent, session, response);
    },

    "BestParentsIntent": function(intent, session, response) {
        intentHandler.bestParentsIntent(intent, session, response);
    },  

    "TogglePauseIntent": function(intent, session, response) {
        intentHandler.togglePauseIntent(intent, session, response);
    },        

	"AMAZON.HelpIntent": function (intent, session, response) {
        response.tell("Help");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        intentHandler.goodbyeIntent(intent, session, response);  
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        intentHandler.goodbyeIntent(intent, session, response);  
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
