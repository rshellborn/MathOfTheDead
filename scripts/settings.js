/*
	Toggles BGM.
*/
function toggleBGM() {
	if(getSessionItem("bgm") == 1) {
		console.log('turning bgm off');
		createSessionItem("bgm", 0);
	} else {
		createSessionItem("bgm", 1);
	}
	updateSettings();
	setToggles();
}

/*
	Toggles SFX.
*/
function toggleSFX() {
	if(getSessionItem("sfx") == 1) {
		createSessionItem("sfx", 0);
	} else {
		createSessionItem("sfx", 1);
	}
	updateSettings();
	setToggles();
}

/*
	Toggles vibration.
*/
function toggleVB() {
	if(getSessionItem("vibrate") == 1) {
		createSessionItem("vibrate", 0);
	} else {
		createSessionItem("vibrate", 1);
	}
	updateSettings();
	setToggles();
}

/*
	Toggles colourblind mode.
*/
function toggleColourblind() {
	if(getSessionItem("colourblind") == 1) {
		createSessionItem("colourblind", 0);
	} else {
		createSessionItem("colourblind", 1);
	}
	updateSettings();
	setToggles();
}

/*
	Sets default settings (all sound on, vibrate on, colourblind off).
*/
function setDefaultSettings() {
	console.log('setting defaults');
	if (getSessionItem("bgm") == null) {
		createSessionItem("bgm", 1);
	}
	
	if (getSessionItem("sfx") == null) {
		console.log('setting sfx');
		createSessionItem("sfx", 1);
	}
	
	if (getSessionItem("vibrate") == null) {
		console.log('setting vibrate');
		createSessionItem("vibrate", 1);
	}
	
	if (getSessionItem("colourblind") == null) {
		createSessionItem("colourblind", 0);
	}
	updateSettings();
	setToggles();
}

/*
	Updates settings when they are toggled.
*/
function updateSettings() {
	/*
		Checks background music and mutes if they are disabled.
	*/
	if (getSessionItem("bgm") == 0) {
		bgmWave.volume = 0;
		bgmInfini.volume = 0;
		MLPMusic.volume = 0;
		
		menuIntro.volume = 0;
		birds.volume = 0;
		bird.volume = 0;
		menuBGM.volume = 0;
	} else {
		bgmWave.volume = 1;
		bgmInfini.volume = 1;
		MLPMusic.volume = 1;
		
		menuIntro.volume = 1;
		birds.volume = 1;
		bird.volume = 1;
		menuBGM.volume = 1;
	}
	
	/*
		Checks sound effects and mutes if they are disabled.
	*/
	if (getSessionItem("sfx") == 0) {
		zWantBrains.volume = 0;
		playerDie.volume = 0;
		nextBullet.volume = 0;
		nextWave.volume = 0;
		zDie.volume = 0;
		zStillAlive.volume = 0;
		shot.volume = 0;
		gunSelect.volume = 0;
		achivUnlocked.volume = 0;
	} else {
		zWantBrains.volume = 1;
		playerDie.volume = 1;
		nextBullet.volume = 1;
		nextWave.volume = 1;
		zDie.volume = 1;
		zStillAlive.volume = 1;
		shot.volume = 1;
		gunSelect.volume = 1;
		achivUnlocked.volume = 1;
	}
	
	/*
		Checks colourblind mode.
	*/
	if (getSessionItem("colourblind") == 1) {
		// Changes CSS file
		document.getElementById("css").setAttribute('href', "css/colourblind.css");
		var toggleCSS = document.getElementById("t-css");
		if(toggleCSS != null)
			toggleCSS.setAttribute('href', "css/toggleSwitches-colourblind.css");
		
		// Switches button icons
		var buttonCheck = document.getElementById("credits-button");
		if(buttonCheck != null) {
			document.getElementById("credits-button").setAttribute("src", "images/colourblind/buttons/credits.png");
			document.getElementById("achievements-button").setAttribute("src", "images/colourblind/buttons/achievements.png");
			document.getElementById("settings-button").setAttribute("src", "images/colourblind/buttons/settings.png");
		}
	} else {
		// Changes CSS file
		document.getElementById("css").setAttribute('href', "css/styles.css");
		var toggleCSS = document.getElementById("t-css");
		if(toggleCSS != null)
			toggleCSS.setAttribute('href', "css/toggleSwitches.css");
		
		// Switches button icons
		var buttonCheck = document.getElementById("credits-button");
		if(buttonCheck != null) {
			document.getElementById("credits-button").setAttribute("src", "images/buttons/credits1.png");
			document.getElementById("achievements-button").setAttribute("src", "images/buttons/achievements.png");
			document.getElementById("settings-button").setAttribute("src", "images/buttons/settings.png");
		}
	}	
}

/*
	Updates the toggles on the screen to reflect what current settings are.
*/
function setToggles() {
	if(getSessionItem("bgm") == 1) {
		document.getElementById("BGMSwitch").checked = true;
	} else {
		document.getElementById("BGMSwitch").checked = false;
	}
	
	if(getSessionItem("sfx") == 1) {
		document.getElementById("soundEffectSwitch").checked = true;
	} else {
		document.getElementById("soundEffectSwitch").checked = false;
	}
	
	if(getSessionItem("vibrate") == 1) {
		document.getElementById("vibrateSwitch").checked = true;
	} else {
		document.getElementById("vibrateSwitch").checked = false;
	}
	
	if(getSessionItem("colourblind") == 1) {
		document.getElementById("colourBlindSwitch").checked = true;
	} else {
		document.getElementById("colourBlindSwitch").checked = false;
	}
}

$(document).ready(function(){
	updateSettings();
});