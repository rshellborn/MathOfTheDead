$(document).ready(function(){
	/*
		Changes images of the achievement trophies if they are unlocked.
	*/
	if(getSessionItem("tutCompleted") == 1) {
		var tutCompleted = document.getElementById('col-xs-2 achievementImage lockedAchievementTut');
		tutCompleted.setAttribute("class", "col-xs-2 achievementImage tutorialAchievement");
	} else if(getSessionItem("50kill") == 1) {
		var tutCompleted = document.getElementById('col-xs-2 achievementImage lockedAchievementSlayer');
		tutCompleted.setAttribute("class", "col-xs-2 achievementImage slayerAchievement");
	} else if(getSessionItem("10wave") == 1) {
		var tutCompleted = document.getElementById('col-xs-2 achievementImage lockedAchievementSurvivor');
		tutCompleted.setAttribute("class", "col-xs-2 achievementImage survivorAchievement");
	} else if(getSessionItem("egg") == 1) {
	var tutCompleted = document.getElementById('col-xs-2 achievementImage lockedAchievementPony');
		tutCompleted.setAttribute("class", "col-xs-2 achievementImage easterEggAchievement");
	}
});
