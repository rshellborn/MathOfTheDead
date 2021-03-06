	
	/*
	generates a random bullet queue of integers between -5 and 5 which will be 
	displayed on bullets at the top of the screen.
	*/
	function generateQueue(){
		for(i = 0; i < 5; i++){
			bulletQueueValues[i] = Math.floor((Math.random() *11) - 5);  
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
		var x = Math.floor((Math.random() * 11) - 5);
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
	generateQueue();
	currentBullet = bulletQueueValues[0];
	queue.onclick = function() {
		updateRandomBullet();
	}
});