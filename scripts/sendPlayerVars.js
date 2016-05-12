var playerWave = 1;
var playerScore = 0;

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function carryVars() {
	playerWave = wave;
	playerScore = score;
	console.log("current wave " + wave);
	console.log("current score " + score);
}

function getCurWave() {
	return playerWave;
}

function getCurScore() {
	return playerScore;
}

	$(document).ready(function(){
	  //get values
	  var wave = getQueryVariable("wave");
	  var score = getQueryVariable("score");
	});
