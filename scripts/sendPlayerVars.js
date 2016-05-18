//The wave the player starts on
var playerWave = 1;
//The score the player starts with
var playerScore = 0;
//The default player name
var playerName = "Guest";
//the id for player
var playerID = 180253480029535; //randomID();

/*
Retrieves the players wave number and score from the URL. This is used to transfer over to the end of game screen to display them. (You can see them in the URL one endOfGame.html)
*/
function getQueryVariable(variable) {
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
	 var pair = vars[i].split("=");
	 if (pair[0] == variable) {
		 return pair[1];
	 }
   }
   return(false);
}

/*
Sets the players wave and score before switching scripts (used for switching between easter egg mode and regular mode)
*/
function carryVars() {
  playerWave = wave;
  playerScore = score;
  playerName = name;
  console.log("current wave " + wave);
  console.log("current score " + score);
  console.log("player name " + name);
}

/*
Accesses the players current wave
*/
function getCurWave() {
	return playerWave;
}

/*
Accesses the players current score
*/
function getCurScore() {
	return playerScore;
}

/*
Accesses the players current score
*/
function getName() {
	return playerName;
}

/*
Generates a random ID
*/
function randomID() {
	var out = (Math.random() * 4503599627370496);
	
	if (Math.random * 2 > 1) {
		out = out * -1;
	}
//	console.log(out);
	return out;
}

$(document).ready(function(){
  //get values
  var wave = getCurWave();
  var score = getCurScore();
  var name = getName();
});
