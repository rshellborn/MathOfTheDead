/**
Zombie globals
*/

// holds all currently active zombies
var zs = new Array();
// gets the score 
var score = getCurScore();
// gets the current wave
var wave = getCurWave();
// gets the player's name
var name = getName();
// flag for fading 
var fadeStatus;
//	kill count used to determine the wave 
var killCount = 0;

/**
Button globals
*/

//the currently selected gun - starts on the plus gun.
var selectedGun = 1;
//sets the game to be unpaused at the start
var paused = 0;

/**
Bullet queue globals
*/

// an array of 5 intergers used to kill zombies.
var bulletQueueValues = new Array(5);
// the currentBullet being used in zombie mode.
var currentBullet = 1;
//	the currentBullet being used in easter egg mode.
var easterEggThisWave = 1; 