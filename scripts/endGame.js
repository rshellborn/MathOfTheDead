$(document).ready(function(){

	// gets current wave number
	var wave = getSessionItem("wave");
	// gets the current score value
	var score = getSessionItem("score");
	// gets the player's name
	var name = getSessionItem("name");
	//gets player ID
	var id = getSessionItem("id");
	
	var pagePath = location.pathname;
	
	if (pagePath.substring(pagePath.length - 14) == "endOfGame.html") {
		// audio 
		zWantBrains.play(); 
		playerDie.play();
		menuBGM.loop = true; 
		menuBGM.play(); 
		
		//prints the wave number onto the top bar of the screen
		document.getElementById("wave").textContent=("Wave " + wave);	
	}
	
	//prints the wave number onto the top bar of the screen
	document.getElementById("score").textContent=("Score: " + score);
	
	//sends player info to database
	if (score != null) {
		$.ajax( { url: "https://api.mlab.com/api/1/databases/mathofthedead/collections/babysfirstdb?&apiKey=ArvUzWX9LKcVcKGcpfgPMVS62vXkF_Xu&f=" + JSON.stringify({"_id" : 0}),
			data: JSON.stringify( {"playerID": "not_used", "score": parseInt(score), "wave": parseInt(wave), "name": name } ),
			type: "post",
			contentType: "application/json; charset=utf-8",
		});
	}
	
	//triggers achievement
	if(getSessionItem("10wave") == 1) {
		triggerAchievement();
	}
	
	//clears data from the game to allow replay
	removeSessionItem("wave");
	removeSessionItem("score");
});