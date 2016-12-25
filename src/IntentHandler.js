var PST_TIMEZONE_OFFSET = 8;

var EventGhost = require('./EventGhost');

function IntentHandler() {

}

IntentHandler.prototype.welcomeIntent = function(intent, session, response) {
	var morningGreeting = getMorningGreetingFromCurrentTime()
	var greetingResponse = morningGreeting + " Mr. Yen. How may I be of assistance?";
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
	eventGhost.openItunes(
		function() {
			response.tell("Right away sir");
		},
		function() {
			response.tell("Sorry, I was unable to perform that action");
		}
	);
}

IntentHandler.prototype.goodbyeIntent = function(intent, session, response) {
	var speechOutput = "Goodbye, I hope I was able to be of assistance.";
	response.tell(speechOutput);
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

module.exports = IntentHandler;