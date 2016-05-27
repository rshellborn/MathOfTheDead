/*
 Creates session variables for id, name, and game mode.
*/
function sendName(setMode) {
	//sets player variables based on input
	var name = document.getElementById("nameInput").value;
	var id = randomID();
	console.log(name);
		
	//removes session items to reset them
	removeSessionItem("id");
	removeSessionItem("name");
		
	//creates session items for player variables
	createSessionItem("id", id);
	createSessionItem("name", name);
		
	//sets the game mode based on input
	var mode = setMode;
	
	//resets session item mode
	removeSessionItem("mode", mode);
	createSessionItem("mode", mode);
	
	//console.log('mode set to: ' + mode);
	
	fadeEnd("gameScreen.html");
}