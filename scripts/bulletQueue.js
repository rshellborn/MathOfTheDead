	var bulletQueueValues = new Array(5);
	var currentBullet = 1;
	var easterEggThisWave = 1; 

	function generateQueue(){
		for(i = 0; i < 5; i++){
			bulletQueueValues[i] = Math.floor((Math.random() *21) - 10);  
			document.getElementById("insideQueue" + i).innerHTML = bulletQueueValues[i];
		}
		currentBullet = bulletQueueValues[0];
		//alert(currentBullet);
	}
	
	function addRandomBullet(){
		var length = bulletQueueValues.length;
		var x = Math.floor((Math.random() * 21) - 10);
		bulletQueueValues.shift();
		bulletQueueValues.push(x);
		for(i = 0; i < length; i++){
			document.getElementById("insideQueue" + i).innerHTML = bulletQueueValues[i];
		}
		currentBullet = bulletQueueValues[0];
		//alert(currentBullet);	
	}
	
	function updateRandomBullet() {
		addRandomBullet();
	}
	
	function formatPosition(){
		var queue;
		for(i = 0; i < length; i++){
			queue = document.getElementById("insideQueue" + i);
			queue.style.position = "absolute";
			queue.style.top = "150px";
			queue.style.left = "20px"; 
			queue.style.width = "100%"; 
		}
	}
	
	$(document).ready(function() {
	var queue = document.getElementById('queue0');
	generateQueue();
	currentBullet = bulletQueueValues[0];
	queue.onclick = function() {
		updateRandomBullet();
		//formatPosition();
	}
});