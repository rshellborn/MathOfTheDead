$(document).ready(function(){
	var creditsButton = document.getElementById("credits-button");
	var achieveButton = document.getElementById("achievements-button");
	var settingsButton = document.getElementById("settings-button");

	creditsButton.addEventListener("mouseout", mouseOutCredits);
	creditsButton.addEventListener("mouseover", mouseOverCredits);
	
	achieveButton.addEventListener("mouseout", mouseOutAchieve);
	achieveButton.addEventListener("mouseover", mouseOverAchieve);
	
	settingsButton.addEventListener("mouseout", mouseOutSettings);
	settingsButton.addEventListener("mouseover", mouseOverSettings);

	function mouseOverCredits() {
	  if(getSessionItem("colourblind") == 1) {
		  creditsButton.setAttribute("src", "images/colourblind/buttons/hover/credits.png");
	  } else {
		  creditsButton.setAttribute("src", "images/buttons/hover/credits1.png");
	  }
	}
	
	function mouseOutCredits() {
	  if(getSessionItem("colourblind") == 1) {
		  creditsButton.setAttribute("src", "images/colourblind/buttons/credits.png");
	  } else {
		  creditsButton.setAttribute("src", "images/buttons/credits1.png");
	  }
	}
	
	function mouseOverAchieve() {
	  if(getSessionItem("colourblind") == 1) {
		  achieveButton.setAttribute("src", "images/colourblind/buttons/hover/achievements.png");
	  } else {
		  achieveButton.setAttribute("src", "images/buttons/hover/achievements.png");
	  }
	}
	
	function mouseOutAchieve() {
	  if(getSessionItem("colourblind") == 1) {
		  achieveButton.setAttribute("src", "images/colourblind/buttons/achievements.png");
	  } else {
		  achieveButton.setAttribute("src", "images/buttons/achievements.png");
	  }
	}
	
	function mouseOverSettings() {
	  if(getSessionItem("colourblind") == 1) {
		  settingsButton.setAttribute("src", "images/colourblind/buttons/hover/settings.png");
	  } else {
		  settingsButton.setAttribute("src", "images/buttons/hover/settings.png");
	  }
	}
	
	function mouseOutSettings() {
	  if(getSessionItem("colourblind") == 1) {
		  settingsButton.setAttribute("src", "images/colourblind/buttons/settings.png");
	  } else {
		 settingsButton.setAttribute("src", "images/buttons/settings.png");
	  }
	}
});