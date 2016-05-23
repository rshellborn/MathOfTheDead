/**
Zombie globals
*/

// holds all currently active zombies
var zs = new Array();
// flag for fading 
var fadeStatus;
//	kill count used to determine the wave 
var killCount = 0;
//holds number of zombies that are spawned
var spawnNum;
// the health differential of a zombie ie -5 to 5. Based on wave count
var healthDiff;
// the bullet queue differential also based of wave count.
var queueDiff;
// the maximum amount of zeros allowed to generate. Used to make sure players don't just
// spam the queue looking for zero's 
var maxZero;

// Number of ponies spawned in easter egg mode
var numOfPonies = 3;

/**
Button globals
*/

//the currently selected gun - starts on the plus gun.
var selectedGun = 1;
//sets the game to be unpaused at the start
var paused = 0;

/**
Button tutorial globals
*/

// disables addidtion gun from being called again
var disableModalP = 0;
// disables subtraction gun from being called again
var disableModalS = 0;
// disables mulitplication gun from being called again
var disableModalM = 0;
// disables division gun from being called again
var disableModalD = 0;
// disables pause from moving zombies
var disablePause = 0;

/**
Bullet queue globals
*/

// an array of 5 intergers used to kill zombies.
var bulletQueueValues = new Array(5);
// the currentBullet being used in zombie mode.
var currentBullet = 1;
//	the currentBullet being used in easter egg mode.
var easterEggThisWave = 1; 
/* Keeps track of the number of zeroes generated in each wave.*/
var zeroCount = 0;
/* Stores the current value of the randomly generated number.*/
var value;
/* Stores the max health range of bullet queue values that can be generated for that specific wave.*/
var maxHealth;
/* Stores the maximum number of 0 values that can be generated for that wave.*/
var maxNumZeroes;

/**
Bullet queue tutorial globals
*/

// an array of 5 intergers used to kill zombies.
var bulletQueueValues = new Array(5);
// the currentBullet being used in zombie mode.
var currentBullet = 1;
//	the currentBullet being used in easter egg mode.
var easterEggThisWave = 1; 
//
var disableModalBQ = 0;

/**
Tutorial globals
*/

//holds values for links
var restart = "tutorial.html";
var menu = "mainMenu.html";
var login = "login.html";



/*
Generates a random ID
*/
function randomID() {
	var out = (Math.random() * 4503599627370496);
	
	if (Math.random * 2 > 1) {
		out = out * -1;
	}
//	console.log(out);
	return out;
}

/*
	Triggers achievement modal
*/
function triggerAchievement() {
	$('#achievementModal').modal({backdrop: 'static', keyboard: false});
	setTimeout(function(){ $('#achievementModal').modal('hide') }, 3000);
}