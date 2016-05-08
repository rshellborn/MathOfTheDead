	var bulletQueueValues = new Array(5);

	function generateQueue(){
		for(i = 0; i < 5; i++){
			bulletQueueValues[i] = Math.floor((Math.random() *21) - 10);  
			document.getElementById("queue" + i).innerHTML = bulletQueueValues[i];
		}
	}
	
	function addRandomBullet(){
		var length = bulletQueueValues.length;
		var x = Math.floor((Math.random() * 21) - 10);
		bulletQueueValues.shift();
		bulletQueueValues.push(x);
		for(i = 0; i < length; i++){
			document.getElementById("queue" + i).innerHTML = bulletQueueValues[i];
		}		
	}
	
	function updateRandomBullet() {
		if(bulletQueueValues[0] == undefined){
			generateQueue();
		}
		addRandomBullet();
	}
	
	$(document).ready(function() {
	var queue = document.getElementById('queue0');
	
	queue.onclick = function() {
		updateRandomBullet();
	}
});