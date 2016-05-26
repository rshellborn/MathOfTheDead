/*
  Zombie as represented with health and a img on screen
  starts "walking" upon instantiation.
*/

$(document).ready(function(){
	// Sets initial score to 0
	score = 0;
	//activates tutorial modal
	$('#tutorialModal').modal({backdrop: 'static', keyboard: false});
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
		
		//keeps track of guns used on zombie to function as a multiplier
		var addGunUsed = false;
		var subGunUsed = false;
		var multGunUsed = false;
		var divGunUsed = false;
		var varietyBonus = 0;
		
		// Speed of the zombie
		var speed = 0.03;
		
		var zeroUsed = 0;
		
		// Used the calculate score that will be awarded for killing this zombie
		var maxHealth = Math.abs(health);
		
		//Message to show the zombie has been spawned.
		console.log("# " + zomNum + " health: " + health + " xPos: " + xPos + " yPos: " + yPos);
		
		// Holds timer for movement
		var moveTimer = null;
		// Holds timer for animation
		var animateTimer = null;
		// Holds image number
		var imageNumber = 0;
		
		// Creates zombie image element
		var zombieImage = document.createElement("img");
		// Creates zombie image and health elements
		var zombieHolder = document.createElement("div");
		// Creates zombie health elements
		var zombieHealthText = document.createElement("div");
		
		
		/* ----------------------------------START OF Zombie Styling-------------------------------------- */

		// Set styles for container for zombie and health 
		zombieHolder.style.height = "20%";
		zombieHolder.style.maxHeight = "150px";
		zombieHolder.style.width = "25%";
		zombieHolder.style.position = "absolute";
		zombieHolder.style.top = yPos + "%"; 
		zombieHolder.style.left = xPos + "%";

		// Assign id for holder for zombie and health elemets
		zombieHolder.id = zomNum;
		
		// Set styles for container health 
		zombieHealthText.innerHTML = health;
		zombieHealthText.style.textAlign = "center";
		zombieHealthText.style.color = "White";
		zombieHealthText.style.fontSize = "150%";
		zombieHealthText.style.position = "relative";
		zombieHealthText.style.height = "20%";
		zombieHealthText.style.top = "-100%";
		
		// Set styles for zombie image 
		zombieImage.id = zomNum + "zImage";
		zombieImage.src = "images/zombies/zombie0.png";
		zombieImage.style.height = "100%";
		zombieImage.style.position = "relative";
		zombieImage.style.display = "block";
		zombieImage.style.top = "-100%";
		zombieImage.style.marginLeft = "auto";
		zombieImage.style.marginRight = "auto";
		zombieImage.style.zIndex = "1";
		
		// Adding health text and zombie image to zombieHolder
		zombieHolder.appendChild(zombieImage);
		zombieHolder.appendChild(zombieHealthText);	
		
		//adding zombieHolder to screen
		document.getElementById("lawn").appendChild(zombieHolder);
		
		/* ----------------------------------END OF Zombie Styling-------------------------------------- */
		
		
		/* ----------------------------------------START OF Zombie Movement------------------------------------------ */
		
		/*
			Checks if the zombie hits the boundary line.
			Returns true if a zombie has hit.
		*/
		function atDotted() {
			return yPos >= 100;
		}
		
		/*
		Causes the image to move down the screen until it hits the dotted line.
		*/
		this.move = function() { 
			if (atDotted()){
				// Restart practice wave
				wipeAll();
				callWave();
				
				// Start zombies when ok is pressed
				$("#failedTutorialModal").modal({backdrop: 'static', keyboard: false});
			} else {
				/* Increments y position to move the zombie downwards */
				yPos += speed;
				zombieHolder.style.top = yPos + "%";
			}
		}
		
		/*
			Animates the walk by switching between two images of the zombie
		*/
		this.animate = function() {
			imageNumber = (imageNumber + 1) % 2;
			var imageName = "images/zombies/zombie" + imageNumber + ".png";
			zombieImage.setAttribute('src', imageName);
		}
		
		/*
			Stops all zombie movement
		*/
		this.stopMove = function() {
		  clearInterval(moveTimer);
		  moveTimer = null;
		  clearInterval(animateTimer);
		  animateTimer = null;
		}
		
		/*
			Starts all zombie movement
		*/
		this.startMove = function() {
		  moveTimer = setInterval(this.move, 10);  
		  animateTimer = setInterval(this.animate, 800);		
		}
		
		//auto caller for moving 
		moveTimer = setInterval(this.move, 10);
		//auto caller for animating
		animateTimer = setInterval(this.animate, 800);
		
		/* ----------------------------------------END OF Zombie Movement------------------------------------------ */
		
		
		/* ----------------------------------------START OF Score Calculation------------------------------------------ */
		
		/*
			Checks the health to determine the score for a zombie kill.
		*/		
		function assignScore() {
		  // Assigns the score based on the maximum health the zombie had reached
			var maxHealthScore = 100;
			//maxHealth = parseInt(Math.sqrt(maxHealth));
			if(zeroUsed == 1) {
				score += 5;
			} else {
			  if (maxHealth <= maxHealthScore) {
				  score += maxHealth + (varietyBonus * 5);
			  } else {
				  score += maxHealthScore + (varietyBonus * 5);
			  }
			}
		  zeroUsed = 0;
		}
		
		/*
			Makes the score glow in the top bar to indicate score increase.
		*/
		function scoreGlow() {
			// makes the score glow, indicating score increase
			// makes the score glow, indicating score increase
			if (getSessionItem("colourblind") == 0) {
				document.getElementById("score").style.color = "red";//"#3399ff";
				window.setTimeout(
					function(){document.getElementById("score").style.color = "white"},
				600);
			} else {
				document.getElementById("score").style.color = "#3399ff";
				window.setTimeout(
					function(){document.getElementById("score").style.color = "white"},
				600);
			}
		}
		
		/* ----------------------------------------END OF Score Calculation------------------------------------------ */
		
		
		/* ----------------------------------------START OF Killing Zombies------------------------------------------ */
		
		/*
			Kills all zombies when easter egg is triggered.
		*/
		function wipeAll() {
		  for (i = 0; i < zs.length; i++) {
			if (zs[i] != null) {
				zs[i].remove();
			}
		  }
		}
		
	 	/* 
			Removes zombie from the screen and deletes all references to it.
		*/
		this.remove = function() {
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
			"Kills" the zombie and increments the kill count to determine the end of a wave.
		*/
		function die() {
			// Sound of zombie dying
			zDie.play(); 
			// Console message of the zombie dying
			console.log("Zombie " + zomNum + " dead");
			
			// Increments killCount and totalKills
			killCount++;
			
			
			// Display how many zombies are left
			var zombiesLeft = 3 - killCount;
			document.getElementById("zombiesLeft").textContent=(zombiesLeft);
			
			// Stops the zombie from calling move/animate functions
			speed = 0;
			
			// Assigns score to the player for the zombie
			assignScore();
			
			// Makes the score glow when changed
			scoreGlow();
			
			// Updates the score on the screen
			document.getElementById("score").textContent=("Score: " + score);
			// animation 
			$( "#"+zomNum ).toggle( "bounce", { times: 1 }, "fast" );
			
			// Checks if the wave is complete and then changes the wave
			setTimeout(function(){ 
				// Removes the zombie
				zs[zomNum].remove(); 
				// Checks if the wave is complete and then changes the wave
				if (killCount == 3) {
					$('#tutorialCompletedModal').modal({backdrop: 'static', keyboard: false});
					
					// Award tutorial completed achievement
					if (getSessionItem("tutComplete") == null) {
					  createSessionItem("tutComplete", 1);
					  triggerAchievement();
					}
				}
			},250);
		}		
		
		/* ----------------------------------------END OF Killing Zombies------------------------------------------ */
			
		
		
		/* ----------------------------------------START OF Hitting Zombies------------------------------------------ */
		
		/*
		handler for onclick behavoir, if zombie's health is 0, it dies
		 else, health is changed
		*/
		this.hit = function(){
			// Gunshot sound effect
			shot.play();
			// Checks which gun is selected
			checkGun();
			//updates maxHealth
			updateMaxHealth();
			// Updates bullet queue
			updateRandomBullet();
			// Updates health on the screen for the zombie
			zombieHealthText.innerHTML = health;
			
			// Checks if zombie is dead
			if (health == 0){
				die();
			} else {
				// flicker animation
				$( "#"+zomNum + "zImage" ).toggle( "pulsate" , "fast" );
				$( "#"+zomNum + "zImage" ).toggle( "pulsate" , "fast" );
				//audio
				zStillAlive.play(); 
				console.log("zom #"+ zomNum + " hit w/ gun "+ selectedGun 
						+ " health: " + health);
			}			
		}
		
		/* ----------------------------------------END OF Hitting Zombies------------------------------------------ */
		
		
		/* ---------------------------------START OF Gun Selection & Calculations---------------------------------- */
		
		/*
			Performs a math operation on the zombie health depending on which gun is selected
		*/
		function checkGun() {
		  // Checks gun selected
			if(selectedGun == 1) {
				// Plus gun
				plusOperation();	
			} else if (selectedGun == 2) {
				// Minus gun
				minusOperation();
			} else if (selectedGun == 3) {
				// Multiplication gun
				multiOperation();
			} else if (selectedGun == 4) {
				// Division gun
				diviOperation();
			}
		}
		
		/*
			Addition Operation
		*/
		function plusOperation() {
			health = health + currentBullet;
			console.log("new health: " + health);
			if (!addGunUsed) {
				addGunUsed = true;
				varietyBonus += 1;
			}
		}
		
		/*
			Subtraction Operation
		*/
		function minusOperation() {
			health = health - currentBullet;
			console.log("new health: " + health);
			if (!subGunUsed) {
				subGunUsed = true;
				varietyBonus += 1;
			}
		}
		
		/*
			Multiplies Operation
		*/
		function multiOperation() {
		  if(currentBullet == 0) {
			  zeroUsed = 1;
			  maxHealth = 5;
		  } else {
			if (!multGunUsed) {
				multGunUsed = true;
				varietyBonus += 1;
			}
		  }
		  health = health * currentBullet;
		}
		
		function diviOperation() {
		  // Checks if easter egg is to be triggered.
		  // Only triggers once per game in Infinite Wave mode.
		  if(currentBullet == 0) {
			  health = health / 1;
		  } else {
			if(Math.abs(currentBullet) > Math.abs(health)) {
			  console.log('health smaller');
			  health = health / 1;
			} else if(Math.abs(currentBullet) <= Math.abs(health)) {
			  console.log('health bigger');
			  //health = Math.ceil(health / currentBullet);
			  health = parseInt(health / currentBullet);
			  if (!divGunUsed) {
				divGunUsed = true;
				varietyBonus += 1;
			  }
			}
		  }
		}
		
		/*
			updates maxHealth
		*/
		function updateMaxHealth() {
			if (maxHealth < Math.abs(health)) {
				maxHealth = Math.abs(health);
			}
		}
		/* ---------------------------------END OF Gun Selection & Calculations---------------------------------- */
	};
	/* --------------------------------------END OF Zombie Object------------------------------------- */
	
	/*
		Spawns 3 hard coded zombies and stops them until Start Practice Wave is pressed
	*/
	function callWave(){
		// Set zombies left
		document.getElementById("zombiesLeft").textContent=(3);
		
		// Spawn zombies
		zs[0] = new Zombie(1, 10, 0, -40);  
		zs[1] = new Zombie(-2, 45, 1, -55);  
		zs[2] = new Zombie(4, 80, 2, -65);  
		
		//freeze zombies
		for(var i = 0; i < zs.length; i++)
			zs[i].stopMove();
		
		// onclick handel 
		document.getElementById(0 + "zImage").onclick = zs[0].hit;
		document.getElementById(1 + "zImage").onclick = zs[1].hit;
		document.getElementById(2 + "zImage").onclick = zs[2].hit;
	}
	
	// Wave is automatically called at load
	callWave();
	
});
	/*
		Starts all zombies movement.
	*/
	function startZombies() {
		console.log('start zom');
		for(var i = 0; i < zs.length; i++) {
			if(zs[i] != null) {
				zs[i].startMove();		
			}
		}
	}
	
	/*
		Stops all zombies movement.
	*/
	function stopZombies() {
		console.log('stop zom');
		for(var i = 0; i < zs.length; i++) {
			if(zs[i] != null) {
				zs[i].stopMove();		
			}
		}
	}