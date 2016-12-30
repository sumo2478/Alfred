var PST_TIMEZONE_OFFSET = 8;

var EventGhost = require('./EventGhost');

function IntentHandler() {

}

IntentHandler.prototype.welcomeResponse = function() {
var morningGreeting = getMorningGreetingFromCurrentTime();
	var assistanceGreeting = getAssistanceGreeting();
	var greetingResponse = morningGreeting + " Mr. Yen. " + assistanceGreeting;
	var repromptOutput = "I am here to serve you. What would you like me to do for you?";

	return {
		"message": greetingResponse,
		"reprompt": repromptOutput
	}
}

IntentHandler.prototype.welcomeIntent = function(intent, session, responseHandler) {
	var greeting = this.welcomeResponse();

	responseHandler(greeting.message, true, greeting.reprompt);
}

IntentHandler.prototype.smartestIntent = function(intent, session, responseHandler) {
	var smartestResponse = "The glorious Mr. Yen, of course, he is the smartest of them all!";

	responseHandler(smartestResponse)
}

IntentHandler.prototype.openSessionIntent = function(intent, session, responseHandler) {
	console.log("Opening a session");

	var openSessionResponse = "Session opened";
	session.attributes.activeSession = true	
	responseHandler(openSessionResponse, true)
}

IntentHandler.prototype.closeSessionIntent = function(intent, session, responseHandler) {
	console.log("Closing a session");

	var closeSessionResponse = "Session close";
	session.attributes.activeSession = false
	responseHandler(closeSessionResponse)
}

IntentHandler.prototype.prettiestIntent = function(intent, session, responseHandler) {
	var prettiestResponse = "Princess Kathlyn is the prettiest of them all!";
	responseHandler(prettiestResponse);
}

IntentHandler.prototype.openGoogleIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	var query = intent.slots.Query;

	// If there is no query provided then just open google
	if (!query || !query.value) {
		responseHandler("I wasn't able to search for that. TODO handle this");
	} 
	// Pass the query to event ghost
	else {
		eventGhost.searchGoogle(query.value);
	}		
}

IntentHandler.prototype.openTrafficToWorkIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.openTrafficToWork();
}

IntentHandler.prototype.showDashboardIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.minimizeScreens();
}

IntentHandler.prototype.openWeatherIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.openWeather();
}

IntentHandler.prototype.openGoogleDriveIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.openGoogleDrive();
}

IntentHandler.prototype.powerDownIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.powerDown();
}

IntentHandler.prototype.maximizeScreensIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.maximizeScreens();
}

IntentHandler.prototype.volumeUpIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.turnUpVolume();
}

IntentHandler.prototype.volumeDownIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.turnDownVolume();
}

IntentHandler.prototype.bestParentsIntent = function(intent, session, responseHandler) {
	responseHandler("I guess it would probably be Van and Ting");
}

IntentHandler.prototype.goodbyeIntent = function(intent, session, responseHandler) {
	var speechOutput = "Very good sir, have a great day!";
	responseHandler(speechOutput);
}

IntentHandler.prototype.togglePauseIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.togglePause();	
}

IntentHandler.prototype.movieTimesIntent = function(intent, session, responseHandler) {
	var eventGhost = new EventGhost(responseHandler);
	eventGhost.getSaratogaMovieTimes();	
}

// Helper Functions
function getMorningGreetingFromCurrentTime() {
	var date = new Date();
	date.setHours(date.getHours() - PST_TIMEZONE_OFFSET); // Subtract 8 for PST timezone
	var hours = date.getHours();

	console.log("Current time: " + date);

	/* hour is before noon */
	if (hours >= 5 && hours < 12 ) { 
	    return "Good morning";
	} 
	/* Hour is from noon to 5pm (actually to 5:59 pm) */
	else if (hours >= 12 && hours <= 17) { 
	    return "Good afternoon"; 
	} 
	/* the hour is after 5pm, so it is between 6pm and midnight */
	else if ((hours > 17 && hours <= 24) || (hours >= 0 && hours < 5)) { 
	    return "Good evening";
	} else { 
	    return "I'm not sure what time it is";
	} 
}

function getAssistanceGreeting() {
	var randomNumber = Math.floor((Math.random() * 2));
	if (randomNumber == 0) {
		return "How may I be of assistance?";
	} else if (randomNumber == 1) {
		return "Donna at your service";
	} else {
		return "Error";
	}
}

module.exports = IntentHandler;
