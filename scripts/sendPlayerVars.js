//The wave the player starts on
var playerWave = 1;
//The score the player starts with
var playerScore = 0;

/*
Retrieves the players wave number and score from the URL. This is used to transfer over to the end of game screen to display them.
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
  console.log("current wave " + wave);
  console.log("current score " + score);
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

$(document).ready(function(){
  //get values
  var wave = getQueryVariable("wave");
  var score = getQueryVariable("score");
});
