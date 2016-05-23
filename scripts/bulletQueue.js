/*
	This script is used to randomly generate values within a set range depending on the wave number 
	(which determines the difficulty of the game) for the bullet queue.
*/

// removed globals

/*
	Sets the maximum number of zeroes and the range of numbers the bullet queue should generate for 
	the wave depending on the difficulty settting.
*/	
function setQueueRange(){
	if(wave >= 1 && wave <= 3){
		maxHealth = easy.queueDiff;
		maxNumZeroes = easy.maxZero;
	}
	else if(wave >= 4 && wave <= 6){
		maxHealth = medium.queueDiff;
		maxNumZeroes = medium.maxZero;
	}
	else if(wave >= 7 && wave <= 9){
		maxHealth = hard.queueDiff;
		maxNumZeroes = hard.maxZero;
	} else {
		maxHealth = insane.queueDiff;
		maxNumZeroes = insane.maxZero;
	}
}

/*
	Generates a random number within the max range of values and not generating more than the 
	maximum number of allowed zero values.
*/
function generateValue() {	
	if(checkZero() == 0){
		value = Math.floor(Math.random() * (maxHealth - (maxHealth * -1) + 1)) + (maxHealth * -1);
	} else {
		var genNonZero = 0;
		while(genNonZero == 0){
			value = Math.floor(Math.random() * (maxHealth - (maxHealth * -1) + 1)) + (maxHealth * -1);
			if(value != 0){
				genNonZero = 1;
			}
		}
	}
	return value;
}

/*
	Incremented the zero counter if the value generated is a zero and returns a 1 meaning false if 
	the zero counter is equal to the maximum number of zeroes allowed for the wave. 
*/
function  checkZero() {
	if (value == 0) {
		zeroCount++;
	}
	if(zeroCount >= maxNumZeroes) {
		return 1;
	}
	return 0;
}

/*
	Resets the zero counter.
*/
function resetZeroCounter(){
	zeroCount = 0;
}

/*
	generates a random bullet queue of integers between -5 and 5 which will be 
	displayed on bullets at the top of the screen.
 */
function generateQueue(){
	for(i = 0; i < 5; i++){
		bulletQueueValues[i] = generateValue();
		document.getElementById("insideQueue" + i).innerHTML = bulletQueueValues[i];
	}
	currentBullet = bulletQueueValues[0];
}
/*
	using shift and push addRandomBullet inserts a new random integer to the back end 
	of the queue effectively creating a never ending stream of random integers between 
	-5 and 5.
 */
function updateRandomBullet(){
	nextBullet.play(); 
	var length = bulletQueueValues.length;
	var x = generateValue();
	bulletQueueValues.shift();
	bulletQueueValues.push(x);
	for(i = 0; i < length; i++){
		document.getElementById("insideQueue" + i).innerHTML = bulletQueueValues[i];
	}
	currentBullet = bulletQueueValues[0];
}
/*
	when the page loads all the necessary functions to generate a fully functional
	bullet queue.
 */
$(document).ready(function() {
	var queue = document.getElementById('queue0');

	setQueueRange();
	generateQueue();
	currentBullet = bulletQueueValues[0];
	queue.onclick = function() {
		updateRandomBullet();
	}
});