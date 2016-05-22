var enablePause = 0;
/*
  Zombie as represented with health and a img on screen
  starts "walking" upon instantiation.
*/

$(document).ready(function(){
	// Displays score on the screen
	document.getElementById("score").textContent=("Score: " + score);
	// Displays wave on the screen
	document.getElementById("wave").textContent=("Wave 0");
	
	
	/*
	 constructs a zombie
	 @params 
	 health Health of the zombie
	 xPos x position of the zombie
	 zomNum Unique number to identify an individual zombie
	 		(used as ID tag for its div)
	 yPos   y position of the zombie 
	*/
	var Zombie = function(health, xPos, zomNum, yPos) {  
		var zomNum = zomNum;
		var xPos = xPos;
		var yPos = yPos;
		var health = health;
		var speed = 0.03;
		// message at construction
		console.log("# " + zomNum + " health: " + health + " xPos: " + xPos);
		
		// holds timer for movement
		var moveTimer = null;
		// holds timer for animation
		var animateTimer = null;
		// holds image number
		var imageNumber = 0;
		
		// creates zombie image element
		var zombieImage = document.createElement("img");
		// creates zombie image and health elements
		var zombieHolder = document.createElement("div");
		// creates zombie health elements
		var zombieHealthText = document.createElement("div");
		
		//set styles for container for zombie and health 
		zombieHolder.style.height = "40%";
		zombieHolder.style.maxHeight = "150px";
		zombieHolder.style.width = "25%";
		zombieHolder.style.position = "absolute";
		zombieHolder.style.top = yPos + "%"; 
		zombieHolder.style.left = xPos + "%";

		// assign id for holder for zombie and health elemets
		zombieHolder.id = zomNum;
		
		//set styles for container health 
		zombieHealthText.innerHTML = health;
		zombieHealthText.style.textAlign = "center";
		zombieHealthText.style.color = "White";
		zombieHealthText.style.fontSize = "150%";
		zombieHealthText.style.position = "relative";
		zombieHealthText.style.height = "20%";
		zombieHealthText.style.top = "-100%";
		
		//set styles for zombie image 
		zombieImage.id = zomNum + "zImage";
		zombieImage.src = "images/zombies/zombie0.png";
		zombieImage.style.height = "100%";
		zombieImage.style.position = "relative";
		zombieImage.style.display = "block";
		zombieImage.style.top = "-100%";
		zombieImage.style.marginLeft = "auto";
		zombieImage.style.marginRight = "auto";
		zombieImage.style.zIndex = "1";
		
		//adding health text and zombie image to zombieHolder
		zombieHolder.appendChild(zombieImage);	
		zombieHolder.appendChild(zombieHealthText);
		
		//adding zombieHolder to screen
		document.getElementById("lawn").appendChild(zombieHolder);
		
		/*
		returns true if zombie has caused game over 
		*/
		function atDotted() {
			return yPos >= 100;
		} 
		
		/*
		Causes the image to move down the screen until it hits the dotted line 
		*/
		this.move = function() { 
			if (atDotted()){
				// clears the movement
				clearInterval(moveTimer);
				moveTimer = null;
				// cleats the animation 
				clearInterval(animateTimer);
				animateTimer = null;
				// game over console message
				console.log("||| G A M E O V E R |||" + zomNum);
				
				//restart wave
				for(var i = 0; i < zs.length; i++)
					zs[i].wipe();
					
				callWave();
				//start zombies when ok is pressed
				$("#failedTutorialModal").modal({backdrop: 'static', keyboard: false});
			} else {
				// incruments the image downwards
				yPos += speed;
				zombieHolder.style.top = yPos + "%";
			}
		}
		
		/*
		"kills" a zombie by clearing the intervals
		and removing it from the array that holds zombies
		Used when swtiching into the Easter Egg mode
		*/
		this.wipe = function() {
			//stops movement
			clearInterval(moveTimer);
			moveTimer = null;			
			//stops animation
			clearInterval(animateTimer);
			animateTimer = null;			
			//removes the zombie from the array
			zs[zomNum] = null;
			//removes the image from the screen
			if (document.getElementById(zomNum) != null){
				document.getElementById(zomNum).remove();
			}
		}		
		
		/*
		"kills" the zombie 
		*/
		function die() {
			console.log("die");
			killCount++;
			//stops the zombie from calling move/animate functions
			speed = 0;
			// hardcoded health score awarded to player
			score += 5;
			// updates the score element
			document.getElementById("score").textContent=("Score: " + score);
			//stops movement
			clearInterval(moveTimer);
			moveTimer = null;
			// stops animation 
			clearInterval(animateTimer);
			animateTimer = null;			
			//removes the zombie from the array
			zs[zomNum] = null;			
			//removes the image from the screen
			if (document.getElementById(zomNum) != null){
				document.getElementById(zomNum).remove();
			}
			
			// starts next wave 
			if (killCount == spawnNum) {
				$("#tutorialCompletedModal").modal('show');
				console.log('done!');
			}
		}		
		
		/*
		animates the image ie. makes it "walk"
		*/
		this.animate = function() {
			imageNumber = (imageNumber + 1) % 2;
			var imageName = "images/zombies/zombie" + imageNumber + ".png";
			zombieImage.setAttribute('src', imageName);
		}
		
		/*
		handler for onclick behavoir, if zombie's health is 0, it dies
		 else, health is changed
		*/
		this.hit = function(){
			checkGun();
			updateRandomBullet();
			zombieHealthText.innerHTML = health;
			if (health == 0){
				console.log("before");
				die();
				console.log("after");
			} else {
				console.log("zom #"+ zomNum + " hit w/ gun "+ selectedGun 
						+ " health: " + health);
			}			
		}
		
		/*
		performs a math operation depending on which gun is selected
		*/
		function checkGun() {
		  //checks gun selected
			if(selectedGun == 1) {
				//plus gun
				plusOperation();				
			} 
			else if (selectedGun == 2) {
				//minus gun
				minusOperation();
			} else if (selectedGun == 3) {
				//multiplication gun
				multiOperation();
			} else if (selectedGun == 4) {
				//division gun
				diviOperation();
			}
			
		}
		
		/*
		adds
		*/
		function plusOperation() {
			health = health + currentBullet;
			console.log("new health: " + health);
		}
		
		/*
		subtracts
		*/
		function minusOperation() {
			health = health - currentBullet;
			console.log("new health: " + health);
		}
		
		/*
		multiplies
		*/
		function multiOperation() {
			health = health * currentBullet;
			console.log("new health: " + health);
		}
		
		/*
		divides (rounds up)
		checks if easter egg is triggered 
		when the user divides by zero,
		else, divides normally
		*/
		function diviOperation() {
		  health = Math.ceil(health / currentBullet);
		  console.log("new health: " + health);
		}
		
		/*
		stops movement when pause clicked
		*/
		this.stopMove = function() {
		  clearInterval(moveTimer);
		  moveTimer = null;
		  clearInterval(animateTimer);
		  animateTimer = null;
		  console.log('stopped');
		}
		
		/*
		starts movement after pause
		*/
		this.startMove = function() {
		  moveTimer = setInterval(this.move, 10);  
		  animateTimer = setInterval(this.animate, 800);	
		  console.log('started');	
		}
	
		//auto caller for moving 
		moveTimer = setInterval(this.move, 10);
		//auto caller for animating
		animateTimer = setInterval(this.animate, 800);
	};
	// ___________________________________________________ zombie constr ends 
	
	/*
	kills all zombies
	*/
	function killAll() {
		for (j = 0; j < zs.length; j++) {
			if (zs[j] != null) {
				console.log("length" + zs.length);
				console.log("index" + j);
				zs[j].wipe();
				console.log("doot");
			}
		}
	}
	
	/*
	random num helper for health 
	*/ 
	function healthRandom() {
		out = Math.floor((Math.random() * 5) + 1);
		if ((Math.random() * 2) > 1) {
			return out * -1;
		} else {
			return out;
		}
	}
	
	/*
	random num helper for xPos 
	*/ 
	function xRandom() {
		return Math.floor(Math.random() * 4) * 25; 
	}
	
	//holds number of zombies that are spawned
	var spawnNum = 3;
	/*
	spawns spawnNum zombies
	*/
	function callWave(spawnNum){
		zs[0] = new Zombie(1, 10, 0, -40);  
		zs[1] = new Zombie(-2, 45, 1, -75);  
		zs[2] = new Zombie(4, 80, 2, -95);  
		
		//freeze zombies
		for(var i = 0; i < zs.length; i++)
			zs[i].stopMove();
		
		// onclick handel 
		document.getElementById(0 + "zImage").onclick = zs[0].hit;
		document.getElementById(1 + "zImage").onclick = zs[1].hit;
		document.getElementById(2 + "zImage").onclick = zs[2].hit;
	}
	
	// a new wave is automatically called at load
	callWave(spawnNum);
	
});

	function startZombies() {
		for(var i = 0; i < zs.length; i++)
			zs[i].startMove();		
	}
	
	function stopZombies() {
		for(var i = 0; i < zs.length; i++)
			zs[i].stopMove();		
	}