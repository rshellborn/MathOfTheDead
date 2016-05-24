/*
  Zombie as represented with health and a img on screen
  starts "walking" upon instantiation.
*/
$(document).ready(function(){
	/* Checks if the game mode has been selected, and if it hasn't it sends player to login screen. */
	var mode = getSessionItem("mode");
	if(mode == null) {
		fadeEnd("login.html");
	}
	
	// MIGHT NOT NEED THESE
	var name = getSessionItem("name");
	// gets player ID
  	var id = getSessionItem("id");
	//-----------------------------------
	
	// Initializes total amount kills to 0
	var totalKills = 0;
	
	/* Initializes wave and score. */
	wave = 1;
	score = 0;
	
	/* Allows passing of score and wave to and from the easter egg. */
	if(easterEggThisWave == 0) {
		wave = getSessionItem("wave");
		score = parseInt(getSessionItem("score"));
	}
	
	// Displays score on the screen
	document.getElementById("score").textContent=("Score: " + score);
	// Displays wave on the screen
	document.getElementById("wave").textContent=("Wave " +wave);

	/* --------------------------------------START OF Zombie Object------------------------------------- */

	/*
	 Constructs a zombie with a health, x position and y position, and a number
	 @params 
	 health Health of the zombie
	 xPos 	x position of the zombie
     zomNum Unique number to identify an individual zombie (used as ID tag for its div)
	 yPos   y position of the zombie 
	*/
	var Zombie = function(health, xPos, zomNum, yPos) { 
		var zomNum = zomNum;
		var xPos = xPos;
		var yPos = yPos;
		var health = health;
		
		// Speed of the zombie
		var speed = 0.03;
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
		Causes the image to move down the screen until it hits the dotted line.
		*/
		this.move = function() { 
			if (atDotted()){
				gameOver();
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
		
		
		/* ----------------------------------------START OF End of Game/Game Won Scenarios------------------------------------------ */
		/* 
		Checks if all waves have been completed in 10 Wave Mode
		*/
		function gameWon() {
		  if(wave == 11) {
			// Create session variables for score and wave
			createSessionItem("score", score);
			createSessionItem("wave", wave);
			
			// Creates session variable that 10 Wave Completed achievement is triggered
			createSessionItem("10wave", 1);
			
			// Transitions to you win screen
			fadeEnd("youWin.html");
			return true;
		  }
		  return false;
		}
		
		/* 
			Stops the zombie from moving, sets the wave and score as session variables, and sends the player to the end of game screen
		*/
		function gameOver() {
		  // Clears the movement
		  clearInterval(moveTimer);
		  moveTimer = null;
		  // Clears the animation 
		  clearInterval(animateTimer);
		  animateTimer = null;
		  // Game over console message
		  console.log("||| G A M E O V E R |||" + zomNum);
		  
		  // Creates session variables for wave and score
		  createSessionItem("wave", wave);
		  createSessionItem("score", score);
		  
		  // Transitions to end of game screen
		  fadeEnd("endOfGame.html");
		}
		
		
		/*
			Checks if the zombie hits the boundary line.
			Returns true if a zombie has hit.
		*/
		function atDotted() {
			return yPos >= 100;
		}
		
		/* ----------------------------------------END OF End of Game Scenario------------------------------------------ */
		
		/* ----------------------------------------START OF Score Calculation------------------------------------------ */
		
		/*
			Checks the health to determine the score for a zombie kill (Based on highest absolute value the health reaches)
		*/		
		function checkMaxHealth() {
		  if((Math.abs(health)) > maxHealth) {
			maxHealth = Math.abs(health);
			console.log('new max health= ' + maxHealth);
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
			
			// Checks if game mode is Infinite Wave Mode
			if(mode == 1) {
			  // Increments total amount of kills
			  totalKills++;
			  console.log('Total kills=' +totalKills);
			  
			  // Checks if 50 kills in infinite mode achievement is unlocked
			  if(totalKills == 50) {
				// Creates session variable that 10 Wave Completed achievement is triggered
				createSessionItem("50kills", 1);
				triggerAchievement();
			  }
			}
			
			
			// Stops the zombie from calling move/animate functions
			speed = 0;
			
			// Assigns the score based on the maximum health the zombie had reached
			score += maxHealth;
			// Updates the score on the screen
			document.getElementById("score").textContent=("Score: " + score);
			
			$( "#"+zomNum ).toggle( "bounce", { times: 1 }, "fast" );
			// Removes the zombie
			
			setTimeout(function(){ 
				zs[zomNum].remove(); 
				// Checks if the wave is complete and then changes the wave
				if (killCount == spawnNum) {
					// Increment wave
					wave++;
					if(!gameWon()) {
						newWave();
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
			// Checks the maximum health of the zombie
			checkMaxHealth();
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
				// audio 
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
		}
		
		/*
			Subtraction Operation
		*/
		function minusOperation() {
			health = health - currentBullet;
			console.log("new health: " + health);
		}
		
		/*
			Multiplies Operation
		*/
		function multiOperation() {
			if(currentBullet == 0)
				maxHealth = 5;
			health = health * currentBullet;
			console.log("new health: " + health);
		}
		
		/*
			Division Operation and checks if easter egg is triggered.
		*/
		function diviOperation() {
		  // Checks if easter egg is to be triggered.
		  // Only triggers once per game in Infinite Wave mode.
		  //infinityCheck();
		  if(currentBullet == 0 && easterEggThisWave && mode == 1) {		
			score += 5;
			triggerEasterEgg();
		  }
		  if(currentBullet == 0 && mode == 0) {
		  	health = health / 1;
		  } 
		  else if(currentBullet > health) {
		  	health = health / 1;
		  }
		  else if(currentBullet < health) {
			health = Math.ceil(health / currentBullet);
			console.log("new health: " + health);
		  }
		}
	
		/* ---------------------------------END OF Gun Selection & Calculations---------------------------------- */
	
	
		/* --------------------------------------START OF Easter Egg Trigger------------------------------------- */
		
		/*
			Changes to easter egg mode
		*/
		function triggerEasterEgg() {
			// Wipes all zombies
			wipeAll();
			
			// Creates session variable for score and wave
			createSessionItem("score", score);
			createSessionItem("wave", wave);
			
			// Award tutorial completed achievement
			createSessionItem("egg", 1);
			console.log(getSessionItem("egg") + '-egg');
			
			// Changes CSS file
			var egg = document.getElementById("css");
			egg.setAttribute('href', "css/easterEgg.css");
			
			/* Changes script */
			// Deletes zombie script
			var c = document.getElementsByTagName('script');
			c[4].parentElement.removeChild(c[4]);
			// Adds pony script
			var fileref=document.createElement('script')
			fileref.setAttribute("src", "scripts/pony.js");
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
		
		/* --------------------------------------END OF Easter Egg Trigger------------------------------------- */
	};
	/* --------------------------------------END OF Zombie Object------------------------------------- */
	
	
	
	/* --------------------------------------START OF GAME------------------------------------- */
	
	function infinityCheck() {
		if(mode == 0 && currentBullet == 0) {
		  	health = (health / 1);
		  }
	}

	// Checks the game mode 
	if(mode == 0) {
		// 0 is 10 Wave Mode
		setWaveDesign(easy.wave1.numOfZombies, easy.healthDiff);
	} else if (mode == 1) {	
		// 1 is Infinite Mode
		setWaveDesign(infinity.wave1.numOfZombies, infinity.healthDiff);
	}
	// Calls a new wave on page load
	callWave();
	
	
	
	
	/* --------------------------------------START OF Wave Changing------------------------------------- */
	/*
		Spawns zombies depending on the wave design
	*/
	function callWave(){
		var innerWave = 0;
		for (i = 0; i < spawnNum; i++) {
			zs[i] = new Zombie(genHealth(), lanePlacement(i % 4), i, yRandom(innerWave));  
			// onclick handel 
			document.getElementById(i + "zImage").onclick = zs[i].hit;
			if (i % 4 == 3) {
				innerWave++;
			}
		}
	}
	
	
	/*
		Changes the wave for 10 Wave Mode 
	*/
	function changeWave() {
	  // Resets the number of zeros generated in the bullet queue
	  resetZeroCounter();
	  // Sets the queue range for the wave and number of zeros to be generated
	  setQueueRange();
	  // Generate queue for the wave
	  generateQueue();
	  
	  // Calls fade aimation
	  nextWaveText();
	  
	  // Changes the wave design
	  changeWaveDesign();
	  
	  document.getElementById("wave").textContent=("Wave " + wave);
	  // resets kill counter
	  killCount = 0;
	}
	
	/*
		Handles fading animation of "Next Wave Incoming" text
	*/
	function nextWaveText() {
		$("#NW").fadeIn(3000);
		$("#NW").fadeOut(3000);
	}
	
	/*
		Triggers a new wave - changes the wave if 10 Wave mode or calls another wave of zombies for Infinite mode
	*/
	function newWave() {
		if(mode == 0) {
			changeWave();	
		} else if(mode == 1) {
			callWave();	
		}
	}
	
	/*
		Sets the wave design based on the variables set in waves.js 
	*/
	function changeWaveDesign() {
		  switch(wave) {
			case 2: setWaveDesign(easy.wave2.numOfZombies, easy.healthDiff);
					callWave();
					break;
			case 3: setWaveDesign(easy.wave3.numOfZombies, easy.healthDiff);
					callWave();
					break;
			case 4: setWaveDesign(medium.wave1.numOfZombies, medium.healthDiff);
					callWave();
					break;
			case 5: setWaveDesign(medium.wave2.numOfZombies, medium.healthDiff);
					callWave();
					break;
			case 6: setWaveDesign(medium.wave3.numOfZombies, medium.healthDiff);
					callWave();
					break; 
			case 7: setWaveDesign(hard.wave1.numOfZombies, hard.healthDiff);
					callWave();
					break; 
			case 8: setWaveDesign(hard.wave2.numOfZombies, hard.healthDiff);
					callWave();
					break;
			case 9: setWaveDesign(hard.wave3.numOfZombies, hard.healthDiff);
					callWave();
					break;
			case 10: setWaveDesign(insane.wave1.numOfZombies, insane.healthDiff);
					 callWave();
					 break;
		}
	  }
	
	/*
		Sets wave difficulty by manipulating number of zombies and their health differential.
	*/
	function setWaveDesign(setSpawn, setHealth) {
		spawnNum = setSpawn;
		healthDiff = setHealth;
	}
	
	/* --------------------------------------END OF Wave Changing------------------------------------- */
	
	
	/* ----------------------------START OF Random and Generation Functions-------------------------- */
	
	/*
	random num helper for zombie health 
	 */ 
	function genHealth() {
		var out = Math.floor((Math.random() * healthDiff) + 1);
		if ((Math.random() * 2) > 1) {
			return out * -1;
		} else {
			return out;
		}
	}
	
	/*
		Random num helper for xPos 
	*/ 
	function xRandom() {
		return Math.floor(Math.random() * 4) * 25; 
	}
	/*
		Random num helper for yPos 
	 */ 
	function yRandom(innerWave) {
		var innerWaveDistance = 50;
		return Math.floor(((Math.random() * innerWaveDistance) + ((innerWaveDistance + 20) * innerWave) + 20) * -1); 
	}
	/*
		lanePlacement ensures multiple zombies will not spawn on top of eachother on the x axis
	*/
	function lanePlacement(laneNum) {
		return Math.floor(laneNum) * 25;  
	}
	/* ----------------------------END OF Random and Generation Functions-------------------------- */
});