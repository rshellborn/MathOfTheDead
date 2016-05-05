var bulletQueueValues = new Array(10);

	function populateQueue(){
		for(i = 0; i < 10; i++){
			bulletQueueValues[i] = Math.floor((Math.random() *21) - 10);  
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