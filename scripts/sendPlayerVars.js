//The wave the player starts on
var playerWave = 1;
//The score the player starts with
var playerScore = 0;
//The default player name
var playerName;

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

$(document).ready(function(){
  //get values
  var wave = getCurWave();
  var score = getCurScore();
  var name = getName();
});
