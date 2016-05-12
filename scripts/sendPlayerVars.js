var playerWave;
var playerScore;

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
	alert('working');
	console.log("current wave " + wave);
	console.log("current score " + score);
}

	$(document).ready(function(){
	  //get values
	  var wave = getQueryVariable("wave");
	  var score = getQueryVariable("score");
	});
