<script>

var bulletQueueValues = new Array(10);
var queue0 = document.getElementById

	function generateQueue(){
		var queue = document.getElementById(queue);
		for(i = 0; i < 10; i++){
			bulletQueueValues[i] = Math.floor((Math.random() *21) - 10);  
			document.getElementsById("queue" + i).innerHTML = bulletQueueValues[i]
		}
	}
	
	function addRandomBullet(){
		var x = Math.floor((Math.random() * 21) - 10);
		bulletQueueValues.shift();
		bulletQueueValues.push(x);
	}
	
	function printQueue(){
	var length = bulletQueueValues.length;
		for(i = 0; i < length; i++){
			document.getElementById("output").innerHTML += "<br/>" +  bulletQueueValues[i];  
		}
			document.getElementById("output").innerHTML += "<br/>"; 
	}

</script>