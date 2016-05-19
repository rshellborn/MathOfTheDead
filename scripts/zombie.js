/*
zombie as represented with health and a img on screen
starts "walking" upon instantiation.
*/
$(document).ready(function(){
	// disables fade function
	var disable = false;
	mode = 1;
	
	wave = getCurWave();
	score = getCurScore();
	name = getQueryVariable("name");
	id = getQueryVariable("id");
	//mode = getGameMode();
	
	// gets the element for score
	document.getElementById("score").textContent=("Score: " +score);
	// gets the element for wave
	document.getElementById("wave").textContent=("Wave " +wave);

	/*
	 constructs a zombieg
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
		var speed = 0.06;
		var health = health;
		var maxHealth = Math.abs(health);
		// message at construction
		console.log("# " + zomNum + " health: " + health + " xPos: " + xPos);
		console.log('max health: ' + maxHealth);
		
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
		zombieHolder.style.height = "20%";
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
		
		/* ----------------------------------------MOVING ZOMBIE FUNCTIONS------------------------------------------ */
		
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
				
				//send player vars again
				// holds the wave counter and score for end of game
				var send = "wave=" + wave + "&score=" + score + "&name=" + name + "" + "&id=" + id + "";
				document.location.href = 'endOfGame.html?' + send;
			} else {
				// incruments the image downwards
				yPos += speed;
				zombieHolder.style.top = yPos + "%";
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
		
		
		/* ----------------------------------------END OF GAME SCENARIO------------------------------------------ */
		
		/*
		returns true if zombie has caused game over 
		*/
		function atDotted() {
			return yPos >= 100;
		} 
		
		
		
		
		/* ----------------------------------------KILLING/HITTING ZOMBIE FUNCTIONS------------------------------------------ */
		
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
		
	  function checkMaxHealth() {
		  if((Math.abs(health)) > maxHealth) {
			   maxHealth = Math.abs(health);
			   console.log('new max health= ' + maxHealth);
		  }
	  }
		
		/*
		"kills" the zombie 
		*/
		function die() {
			zDie.play(); 
			console.log("Zombe dead");
			killCount++;
			//stops the zombie from calling move/animate functions
			speed = 0;
			// hardcoded health score awarded to player
			score += maxHealth;
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
				changeWave();
			}
		}		
		
		/*
		handler for onclick behavoir, if zombie's health is 0, it dies
		 else, health is changed
		*/
		this.hit = function(){
			shot.play();
			checkGun();
			checkMaxHealth();
			updateRandomBullet();
			zombieHealthText.innerHTML = health;
			if (health == 0){
				console.log("before");
				die();
				console.log("after");
			} else {
				// shakes the zombie 
				$( "#" + zomNum ).effect( "shake", "fast");  
				zStillAlive.play(); 
				console.log("zom #"+ zomNum + " hit w/ gun "+ selectedGun 
						+ " health: " + health);
			}			
		}
		
		
		
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
		
		
		
		/* ----------------------------------------GUNS AND CALCULATIONS FUNCTIONS------------------------------------------ */
		
		/*
		performs a math operation depending on which gun is selected
		*/
		function checkGun() {
		  //checks gun selected
			if(selectedGun == 1) {
				//plus gun
				plusOperation();				
			} else if (selectedGun == 2) {
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
			if(currentBullet == 0)
				maxHealth = 5;
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
		if(currentBullet == 0) {
			if (easterEggThisWave){				
				score += 5;
				triggerEasterEgg();	
				}
			} else {
				health = Math.ceil(health / currentBullet);
				console.log("new health: " + health);
			}
		}
	
		/*
		sets up the easter egg
		*/
		function triggerEasterEgg() {
			//sending player vars
			carryVars();
			//changing css
			killAll();
			var egg = document.getElementById("css");
			egg.setAttribute('href', "css/easterEgg.css");
			//changing script
			//gets rid of zombie script
			var c = document.getElementsByTagName('script');
			c[4].parentElement.removeChild(c[4]);
			//adds pony script
			var fileref=document.createElement('script')
			fileref.setAttribute("src", "scripts/pony.js");
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
		
		/* ----------------------------------------WAVE FUNCTIONS ------------------------------------------ */
		function changeWave() {
			// increments the current wave if it is in wave mode
			if(mode == 0) {
				wave++;
			
				fadeStatus = false;
				// calls fade aimation 
				if(disable == false) {
					fade();
				}
				if(wave == 2) {
					send = "youWin.html?score=" + score;
					fadeEnd(send);
				}
				document.getElementById("wave").textContent=("Wave " + wave);
				// resets kill counter
				killCount = 0;
			}
				if(fadeStatus == true){
					// incruments the number of zombies to construct
					//spawnNum++;
					
					switch(wave) {
						case 2: setWaveDesign(easy.wave2.numOfZombies, easy.healthDiff, easy.queueDiff, easy.maxZero);
								callWave();
						break;
						case 3: setWaveDesign(easy.wave3.numOfZombies, easy.healthDiff, easy.queueDiff, easy.maxZero);
								callWave();
						break;
						case 4: setWaveDesign(medium.wave1.numOfZombies, medium.healthDiff, medium.queueDiff, medium.maxZero);
								callWave();
						break;
						case 5: setWaveDesign(medium.wave2.numOfZombies, medium.healthDiff, medium.queueDiff, medium.maxZero);
								callWave();
						break;
						case 6: setWaveDesign(medium.wave3.numOfZombies, medium.healthDiff, medium.queueDiff, medium.maxZero);
								callWave();
						break; 
						case 7: setWaveDesign(hard.wave1.numOfZombies, hard.healthDiff, hard.queueDiff, hard.maxZero);
								callWave();
						break; 
						case 8: setWaveDesign(hard.wave2.numOfZombies, hard.healthDiff, hard.queueDiff, hard.maxZero);
								callWave();
						break;
						case 9: setWaveDesign(hard.wave3.numOfZombies, hard.healthDiff, hard.queueDiff, hard.maxZero);
								callWave();
						break;
						case 10: setWaveDesign(insane.wave1.numOfZombies, insane.healthDiff, insane.queueDiff, insane.maxZero);
								 callWave();
						break;
						default: setWaveDesign(infinity.wave1.numOfZombies, infinity.healthDiff, infinity.queueDiff, infinity.maxZero);
						break;
					}
				}
		}
	};
	// ___________________________________________________ zombie constr ends 
	
	
	
	/* ----------------------------------------RANDOMIZE FUNCTIONS------------------------------------------ */
	
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
	random num helper for xPos 
	*/ 
	function xRandom() {
		return Math.floor(Math.random() * 4) * 25; 
	}
	/*
	random num helper for yPos 
	 */ 
	function yRandom() {
		return Math.floor(((Math.random() * 150) + 50) * -1); 
	}
	
	/*
	spawns spawnNum zombies
	*/
	function callWave(){
		console.log('in here' + spawnNum);
		for (i = 0; i < spawnNum; i++) {
			zs[i] = new Zombie(genHealth(), xRandom(), i, yRandom() );  
			// onclick handel 
			document.getElementById(i + "zImage").onclick = zs[i].hit;
		}
	}
	
	/*
	Sets wave difficulty by manipulating number of zombies, their health differential, queue differential, and how many zeros are generated.
	*/
	function setWaveDesign(setSpawn, setHealth, setQueue, setZero) {
		spawnNum = setSpawn;
		healthDiff = setHealth;
		queueDiff = setQueue;
		maxZero = setZero;
	}
	
	
	// checks mode
	if(mode == 0) {
		setWaveDesign(easy.wave1.numOfZombies, easy.healthDiff, easy.queueDiff, easy.maxZero);
	} else if (mode == 1) {
		setWaveDesign(infinity.wave1.numOfZombies, infinity.healthDiff, infinity.queueDiff, infinity.maxZero);
	}
	// a new wave is automatically called at load
	callWave();
	
	
	// handles fading animation of next incoming wave
	function fade() {
		$("#NW").fadeIn(3000);
		$("#NW").fadeOut(3000);
		fadeStatus = true;
	}
});