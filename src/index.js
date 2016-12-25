/*
Alfred Main Code
*/

var APP_ID = 'amzn1.ask.skill.4eb021ba-4dbd-43d1-8213-24ca174f1c7d';

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

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

    // TODO: Handle Welcome Request
    handleWelcomeRequest(response);
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

// Business Logic
function handleWelcomeRequest(response) {
	var greetingResponse = "Hello Mr. Yen. What can I do for you today?";
	var repromptOutput = "I am here to serve you. What would you like me to do for you?";

	/*
    var whichCityPrompt = "Which city would you like tide information for?",
        speechOutput = {
            speech: "<speak>Welcome to Tide Pooler. "
                + "<audio src='https://s3.amazonaws.com/ask-storage/tidePooler/OceanWaves.mp3'/>"
                + whichCityPrompt
                + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        },
        repromptOutput = {
            speech: "I can lead you through providing a city and "
                + "day of the week to get tide information, "
                + "or you can simply open Tide Pooler and ask a question like, "
                + "get tide information for Seattle on Saturday. "
                + "For a list of supported cities, ask what cities are supported. "
                + whichCityPrompt,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };*/

    response.ask(greetingResponse, repromptOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var alfredHandler = new AlfredHandler();
    alfredHandler.execute(event, context);
};
