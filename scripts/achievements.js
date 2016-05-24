$(document).ready(function(){
	/*
		Changes images of the achievement trophies if they are unlocked.
	*/
	console.log('checking');
	if(getSessionItem("tutComplete") == 1) {
		console.log('tutorial');
		var tutCompleted = document.getElementById('tutorial');
		tutCompleted.setAttribute("class", "col-xs-2 achievementImage tutorialAchievement");
	}
	
	if(getSessionItem("50kills") == 1) {
		console.log('50kill');
		var slayer = document.getElementById('slayer');
		slayer.setAttribute("class", "col-xs-2 achievementImage slayerAchievement");
	}
	
	if(getSessionItem("10wave") == 1) {
		console.log('10wave');
		var survivor = document.getElementById('survivor');
		survivor.setAttribute("class", "col-xs-2 achievementImage survivorAchievement");
	}
	
	if(getSessionItem("egg") == 1) {
		console.log('egg');
		var pony = document.getElementById('pony');
		pony.setAttribute("class", "col-xs-2 achievementImage easterEggAchievement");
	}
});
