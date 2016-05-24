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
		console.log('turnging bgm off');
		createSessionItem("bgm", 0);
	} else {
		createSessionItem("bgm", 1);
	}
	updateSettings();
}

function toggleSFX() {
	if(getSessionItem("sfx") == 1) {
		createSessionItem("sfx", 0);
	} else {
		createSessionItem("sfx", 1);
	}
	updateSettings();
}

function toggleColourblind() {
	if(getSessionItem("colourblind") == 1) {
		createSessionItem("colourblind", 0);
	} else {
		createSessionItem("colourblind", 1);
	}
	updateSettings();
}

function setDefaultSettings() {
	console.log('setting defaults');
	if (getSessionItem("bgm") == null) {
		createSessionItem("bgm", 1);
	}
	
	if (getSessionItem("sfx") == null) {
		createSessionItem("sfx", 1);
	}
	
	if (getSessionItem("colourblind") == null) {
		createSessionItem("colourblind", 0);
	}
}

function updateSettings() {
	/*
		Checks background music.
	*/
	if (getSessionItem("bgm") == 0) {
		bgmWave.volume = 0;
		bgmInfini.volume = 0;
		//bgmPony.volume = 0;
		
		menuIntro.volume = 0;
		birds.volume = 0;
		bird.volume = 0;
		menuBGM.volume = 0;
	}
	
	/*
		Checks sound effects.
	*/
	if (getSessionItem("sfx") == 0) {
		// Turn of sound effects here
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
}

$(document).ready(function(){
	// Sets default settings when pages are loaded if nothing is set yet.
	setDefaultSettings();
	
	updateSettings();
	
	console.log('bgm=' + getSessionItem("bgm") + ' || sfx=' + getSessionItem("sfx") + ' || colourblind=' + getSessionItem("colourblind")); 
});