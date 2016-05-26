/*
  Zombie as represented with health and a img on screen
  starts "walking" upon instantiation.
*/

$(document).ready(function(){
	var mode = getSessionItem("mode");
	var totalKills = getSessionItem("totalKills");
	
	// audio
	MLPMusic.loop = true; 
	MLPMusic.play(); 
	// Holds pony image name 
	var ponyImage;
	
	// Sets how many ponies will be spawned from a global variable
	spawnNum = numOfPonies;
	
	//keeps track of guns used on zombie to function as a multiplier
	var addGunUsed = false;
	var subGunUsed = false;
	var multGunUsed = false;
	var divGunUsed = false;
	var varietyBonus = 0;
	
	var zeroUsed = 0;
	
	// Gets score and wave from session variables
	score = parseInt(getSessionItem("score"));
	wave = getSessionItem("wave");
	
	// Displays score on the screen
	document.getElementById("score").textContent=("Score: " + score);
	// Displays wave on the screen
	document.getElementById("wave").textContent=("Wave " + wave);
	
	// Triggers achievement modal
	if(getSessionItem("egg") == 1) {
		triggerAchievement();	
	}
	
	/*
	 constructs a zombie
	 @params 
	 health Health of the zombie
	 xPos x position of the zombie
	 zomNum Unique number to identify an individual zombie
	 		(used as ID tag for its div)
	 yPos   y position of the zombie 
	*/
	var Zombie = function(health, xPos, zomNum, yPos, chosen) {  
		var zomNum = zomNum;
		var xPos = xPos;
		var yPos = yPos;
		var health = health;
		
		// Speed of the zombie
		var speed = enemySpeed;
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
		
		// Sets the image depending on the chosen param in constr
		switch(chosen) {
		  case 0: ponyImage = "purple";
		  break;	
		  case 1: ponyImage = "pink";
		  break;	
		  case 2: ponyImage = "orange";
		  break;	
		  case 3: ponyImage = "pale";
		  break;	
		  case 4: ponyImage = "white";
		  break;
		  case 5: ponyImage = "blue";
		  break;	
		}
		
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
		zombieHealthText.style.color = "Black";
		zombieHealthText.style.fontSize = "150%";
		zombieHealthText.style.position = "relative";
		zombieHealthText.style.height = "20%";
		zombieHealthText.style.top = "-100%";
		
		// Set styles for zombie image 
		zombieImage.id = zomNum + "zImage";
		zombieImage.src = "images/easterEgg/" + ponyImage + "0.png";
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
			var imageName = "images/easterEgg/" + ponyImage + "" + imageNumber + ".png";
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
		}
		
		/*
			Makes the score glow in the top bar to indicate score increase.
		*/
		function scoreGlow() {
			// makes the score glow, indicating score increase
			document.getElementById("score").style.color = "#3399ff";
			window.setTimeout(
				function(){document.getElementById("score").style.color = "white"},
			600);	
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
			//totalKills++;
			
			// Stops the zombie from calling move/animate functions
			speed = 0;
			
			// Updates the number of zombies left or total kills depending on game mode
			updateKillCounts();
			
			// Assigns score to the player for the zombie
			assignScore();
			
			// Makes the score glow when changed
			scoreGlow();
			
			// Updates the score on the screen
			document.getElementById("score").textContent=("Score: " + score);
			
			// Removes the zombie
			zs[zomNum].remove();
			
			// Checks if the wave is complete and then changes the wave
			if (killCount == spawnNum) {
				easterEggThisWave = 0; // set flag no pony mode again
				backToMainGame();
			}
		}		
		
		/*
			Updates how many zombies are left in a wave or total kills depending on game mode.
		*/
		function updateKillCounts() {
			// Checks if game mode is Infinite Wave Mode
			if(mode == 1) {
			  // Increments total amount of kills
			  totalKills++;
			  document.getElementById("zombiesLeft").textContent=(totalKills);	
			  
			  // Checks if 50 kills in infinite mode achievement is unlocked
			  if(totalKills == 25 && getSessionItem("kills") == null) {
				// Creates session variable that 10 Wave Completed achievement is triggered
				createSessionItem("kills", 1);
				triggerAchievement();
			  }
			} else if (mode == 0) {
				var zombiesLeft = spawnNum - killCount;
				document.getElementById("zombiesLeft").textContent=(zombiesLeft);	
			}	
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
		  	  health = health * currentBullet;
		  } else {
			if (!multGunUsed) {
				multGunUsed = true;
				varietyBonus += 1;
			}
		  }
		  zeroUsed = 0;
		}
		
		/*
			Division Operation and checks if easter egg is triggered.
		*/
		function diviOperation() {
		  if(currentBullet == 0) {
			  easterEggThisWave = 0; // set flag no pony mode again		
			  //increase score
			  score += 5;
			  backToMainGame();
		  } else {
			if(Math.abs(currentBullet) > Math.abs(health)) {
			  console.log('health smaller');
			  health = health / 1;
			} else if(Math.abs(currentBullet) <= Math.abs(health)) {
			  console.log('health bigger');
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
		
		
		/* --------------------------------------START OF Easter Egg Trigger------------------------------------- */
		
		/*
			Changes to easter egg mode
		*/
		function backToMainGame() {
			// stop audio
			MLPMusic.pause();
			// Wipes all zombies
			wipeAll();
			
			// Gets score and wave from session variables
			score = createSessionItem("score", score);
			wave = createSessionItem("wave", wave);
			
			createSessionItem("ponyMode", 0);
			
			totalKills++;
			createSessionItem("totalKills", totalKills);
			
			// Changes CSS file
			var css = document.getElementById("css");
			css.setAttribute('href', "css/styles.css");
			/* Changes script */
			// Deletes pony script
			var c = document.getElementsByTagName('script');
			c[6].parentElement.removeChild(c[6]);
			// Adds zombie script
			var fileref=document.createElement('script')
			fileref.setAttribute("src", "scripts/zombie.js");
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
		
		/* --------------------------------------END OF Easter Egg Trigger------------------------------------- */
	};
	/* --------------------------------------END OF Zombie Object------------------------------------- */
	
	/*
		Spawns zombies depending on the wave design
	*/
	function callWave(){
		var chosen =  Math.floor((Math.random() * 5) + 0);
		var innerWave = 0;
		for (i = 0; i < spawnNum; i++) {
			zs[i] = new Zombie(genHealth(), lanePlacement(i % 4), i, yRandom(innerWave), chosen);  
			// onclick handel 
			document.getElementById(i + "zImage").onclick = zs[i].hit;
			if (i % 4 == 3) {
				innerWave++;
			}
		}
	}
	// Calls a new wave on page load
	callWave();
	
	
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
	/**
		lanePlacement ensures multiple zombies will not spawn on top of eachother on the x axis
	*/
	function lanePlacement(laneNum) {
		return Math.floor(laneNum) * 25;  
	}
	/* ----------------------------END OF Random and Generation Functions-------------------------- */
});