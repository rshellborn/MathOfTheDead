/* Resets the wave and score if the page is reloaded. */
/*$(window).bind('beforeunload',function(){
	createSessionItem("bgm", 1);
	createSessionItem("sfx", 1);
	createSessionItem("colourblind", 0);
});*/
	

/*
	Holds all the settings.
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

function toggleSFX() {
	if(getSessionItem("sfx") == 1) {
		createSessionItem("sfx", 0);
	} else {
		createSessionItem("sfx", 1);
	}
	updateSettings();
	setToggles();
}

function toggleVB() {
	if(getSessionItem("vibrate") == 1) {
		createSessionItem("vibrate", 0);
	} else {
		createSessionItem("vibrate", 1);
	}
	updateSettings();
	setToggles();
}

function toggleColourblind() {
	if(getSessionItem("colourblind") == 1) {
		createSessionItem("colourblind", 0);
	} else {
		createSessionItem("colourblind", 1);
	}
	updateSettings();
	setToggles();
}

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

function updateSettings() {
	/*
		Checks background music.
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
		Checks sound effects.
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
	} else {
		zWantBrains.volume = 1;
		playerDie.volume = 1;
		nextBullet.volume = 1;
		nextWave.volume = 1;
		zDie.volume = 1;
		zStillAlive.volume = 1;
		shot.volume = 1;
		gunSelect.volume = 1;
	}
	
	/*
		Checks colourblind mode.
	*/
	if (getSessionItem("colourblind") == 1) {
		// Changes CSS file
		var colourCss = document.getElementById("css");
		colourCss.setAttribute('href', "css/colourblind.css");
	} else {
		// Changes CSS file
		var colourCss = document.getElementById("css");
		colourCss.setAttribute('href', "css/styles.css");
	}	
	
	console.log('bgm=' + getSessionItem("bgm") + ' || sfx=' + getSessionItem("sfx") + ' || colourblind=' + getSessionItem("colourblind"));
}

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
	// Sets default settings when pages are loaded if nothing is set yet.
	updateSettings();
});