/**
Zombie globals
*/

// holds all currently active zombies
var zs = new Array();
// gets the score 
var score;
// gets the current wave
var wave;
// gets the player's name
var name;
// flag for fading 
var fadeStatus;
//	kill count used to determine the wave 
var killCount = 0;
// the amount of zombies created per wave
var spawnNum = 5;
// base speed for zombies
var speed = 0.08


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
/**
Bullet queue globals
*/

// an array of 5 intergers used to kill zombies.
var bulletQueueValues = new Array(5);
// the currentBullet being used in zombie mode.
var currentBullet = 1;
//	the currentBullet being used in easter egg mode.
var easterEggThisWave = 1; 