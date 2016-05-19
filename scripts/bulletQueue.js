var zerosGen = 0;

var zeroCount = 0;

function generateValue() {
	var value;
	value = Math.floor(Math.random() * (queueDiff - (queueDiff * -1) + 1)) + (queueDiff * -1);
	
	//CHECK IF VALUE IS ZERO AND CHECK IF IT HIT THE maxZero
	
	return value;
}

//MY ATTEMPT BUT ITS BAD
function checkMaxZero() {
	var newValue = 0;
	//check if value is 0
		if(maxZero == zerosGen) {
			console.log('max hit');
			newValue = generateValue();
		}
	return newValue;
}

function  checkZero() {
	var zeroCount = 0;
	if (currentBullet == 0) {
		zeroCount++;
	}
	if(zeroCount == 3) {
		alert("woah bud");
	}
}
/*
	generates a random bullet queue of integers between -5 and 5 which will be 
	displayed on bullets at the top of the screen.
 */
function generateQueue(){
	for(i = 0; i < 5; i++){
		bulletQueueValues[i] = generateValue();
		console.log('bullet gen=' + bulletQueueValues[i]);
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
	var length = bulletQueueValues.length;
	var x = generateValue();
	bulletQueueValues.shift();
	bulletQueueValues.push(x);
	for(i = 0; i < length; i++){
		document.getElementById("insideQueue" + i).innerHTML = bulletQueueValues[i];
	}
	currentBullet = bulletQueueValues[0];
	if(currentBullet == 0){
		zeroCount++;
	}
	if(zeroCount == 3){
		//alert("stop");
	}
}
/*
	when the page loads all the necessary functions to generate a fully functional
	bullet queue.
 */
$(document).ready(function() {
	var queue = document.getElementById('queue0');
	//alert(wave);
	generateQueue();
	currentBullet = bulletQueueValues[0];
	queue.onclick = function() {
		updateRandomBullet();
	}
});