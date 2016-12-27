var PST_TIMEZONE_OFFSET = 8;

var EventGhost = require('./EventGhost');

function IntentHandler() {

}

IntentHandler.prototype.welcomeIntent = function(intent, session, response) {
	var morningGreeting = getMorningGreetingFromCurrentTime();
	var assistanceGreeting = getAssistanceGreeting();
	var greetingResponse = morningGreeting + " Mr. Yen. " + assistanceGreeting;
	var repromptOutput = "I am here to serve you. What would you like me to do for you?";

    response.ask(greetingResponse, repromptOutput);
}

IntentHandler.prototype.smartestIntent = function(intent, session, response) {
	var smartestResponse = "The glorious Mr. Yen, of course, he is the smartest of them all!";
	response.tell(smartestResponse);
}

IntentHandler.prototype.prettiestIntent = function(intent, session, response) {
	var prettiestResponse = "Princess Kathlyn is the prettiest of them all!";
	response.tell(prettiestResponse);
}

IntentHandler.prototype.openItunesIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.openItunes(response);
}

IntentHandler.prototype.openGoogleIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	var query = intent.slots.Query;

	// If there is no query provided then just open google
	if (!query || !query.value) {
		response.tell("I wasn't able to search for that. TODO handle this");
	} 
	// Pass the query to event ghost
	else {
		eventGhost.searchGoogle(response, query.value);
	}		
}

IntentHandler.prototype.openTrafficToWorkIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.openTrafficToWork(response);
}

IntentHandler.prototype.showDashboardIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.minimizeScreens(response);
}

IntentHandler.prototype.openWeatherIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.openWeather(response);
}

IntentHandler.prototype.powerDownIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.powerDown(response);
}

IntentHandler.prototype.maximizeScreensIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.maximizeScreens(response);
}

IntentHandler.prototype.bestParentsIntent = function(intent, session, response) {
	response.tell("I guess it would probably be Van and Ting");
}

IntentHandler.prototype.goodbyeIntent = function(intent, session, response) {
	var speechOutput = "Very good sir, have a great day!";
	response.tell(speechOutput);
}

IntentHandler.prototype.togglePauseIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.togglePause(response);	
}

IntentHandler.prototype.movieTimesIntent = function(intent, session, response) {
	var eventGhost = new EventGhost();
	eventGhost.getSaratogaMovieTimes(response);	
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
		return "Alfred at your service";
	} else {
		return "Error";
	}
}

module.exports = IntentHandler;
