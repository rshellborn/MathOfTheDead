/*
zombie as represented with health and a img on screen
starts "walking" upon instantiation.
*/

// holds all currently active zombies
var zs = new Array();
// gets the score 
var score = getCurScore();
// gets the current wave
var wave = getCurWave();

$(document).ready(function(){
	// holds the timer for generating zombies
	var genTimer = null;
	// gets the element for score
	document.getElementById("score").textContent=("Score: " +score);
	// gets the element for wave
	document.getElementById("wave").textContent=("Wave 1");
	// holds the kill counter
	killCount = 0;
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
		var speed = 0.08;
		var health = health;
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
		zombieHolder.style.maxHeight = "188px";
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
		zombieImage.style.height = "80%";
		zombieImage.style.position = "relative";
		zombieImage.style.display = "block";
		zombieImage.style.top = "-100%";
		zombieImage.style.marginLeft = "auto";
		zombieImage.style.marginRight = "auto";
		zombieImage.style.zIndex = "1";
		
		//adding health text and zombie image to zombieHolder
		zombieHolder.appendChild(zombieHealthText);
		zombieHolder.appendChild(zombieImage);	
		
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
				// holds the wave counter and score for end of game
				var send = "wave=" + wave + "&score=" + score + "";
				//document.location.href = 'endOfGame.html?' + send;
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
				fadeStatus = false;
				// calls fade aimation 
				fade();
				// incruments the current wave 
				wave++;
				document.getElementById("wave").textContent=("Wave " + wave);
				// resets kill counter
				killCount = 0;
				if(fadeStatus == true){
					// incruments the number of zombies to construct
					spawnNum++;
					// starts the next wave 
					callWave(spawnNum);
				}
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
		}
		
		/*
		starts movement after pause
		*/
		this.startMove = function() {
		  moveTimer = setInterval(this.move, 10);  
		  animateTimer = setInterval(this.animate, 800);		
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
	var spawnNum = 1;
	/*
	spawns spawnNum zombies
	*/
	function callWave(spawnNum){
		zs[0] = new Zombie(1, xRandom(), 0, -50 - (50 * 1) );  
		zs[1] = new Zombie(-2, xRandom(), 1, -50 - (50 * 1) );  
		zs[2] = new Zombie(4, xRandom(), 2, -50 - (50 * 1) );  
		// onclick handel 
		document.getElementById(0 + "zImage").onclick = zs[0].hit;
		document.getElementById(1 + "zImage").onclick = zs[1].hit;
		document.getElementById(2 + "zImage").onclick = zs[2].hit;
	}
	// a new wave is automatically called at load
	callWave(spawnNum);
	// flag for fading 
	var fadeStatus;
	
	// handles fading animation 
	/*function fade() {
		$("#NW").fadeIn(3000);
		$("#NW").fadeOut(3000);
		fadeStatus = true;
	}*/
});