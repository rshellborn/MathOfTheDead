$(document).ready(function(){
	/*
		Changes images and text if achievements are unlocked.
	*/
	if(getSessionItem("tutComplete") == 1) {
		// Changes the image
		var tutCompleted = document.getElementById('tutorial');
		tutCompleted.setAttribute("class", "col-xs-2 achievementImage tutorialAchievement");
		
		// Changes the text
		var tutInfo = document.getElementById('tutorialInfo');
		tutInfo.setAttribute("class", "col-xs-10 achievementInfoUnlocked");
	}
	
	if(getSessionItem("50kills") == 1) {
		// Changes the image
		var slayer = document.getElementById('slayer');
		slayer.setAttribute("class", "col-xs-2 achievementImage slayerAchievement");
		
		// Changes the text
		var slayerInfo = document.getElementById('slayerInfo');
		slayerInfo.setAttribute("class", "col-xs-10 achievementInfoUnlocked");
	}
	
	if(getSessionItem("10wave") == 1) {
		// Changes the image
		var survivor = document.getElementById('survivor');
		survivor.setAttribute("class", "col-xs-2 achievementImage survivorAchievement");
		
		// Changes the text
		var survivorInfo = document.getElementById('survivorInfo');
		survivorInfo.setAttribute("class", "col-xs-10 achievementInfoUnlocked");
	}
	
	if(getSessionItem("egg") == 1) {
		// Changes the image
		var pony = document.getElementById('pony');
		pony.setAttribute("class", "col-xs-2 achievementImage easterEggAchievement");
		
		// Changes the text
		var ponyInfo = document.getElementById('ponyInfo');
		ponyInfo.setAttribute("class", "col-xs-10 achievementInfoUnlocked");
	}
});
