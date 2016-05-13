/* 
Easter Egg Script 
a my litte pony is represented with health and a img on screen
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
	// holds the kill counter
	killCount = 0;
	/*
	 constructs a pony
	 @params 
	 health Health of the zombie
	 xPos x position of the zombie
	 zomNum Unique number to identify an individual zombie
	 		(used as ID tag for its div)
	 yPos   y position of the zombie 
	 chosen the image of the pony 
	*/
	var Zombie = function(health, xPos, zomNum, yPos, chosen) {  // extra param 'chosen'
		var zomNum = "p" + zomNum;
		var xPos = xPos;
		var yPos = yPos;
		var speed = 0.08;
		var health = health;
		// message at construction
		console.log("Pony # " + zomNum + " health: " + health + " xPos: " + xPos);
		
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
		
		// set styles for container health 
		zombieHealthText.innerHTML = health;
		zombieHealthText.style.textAlign = "center";
		zombieHealthText.style.color = "Black"; // unique to pony
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
		
		// holds pony image name 
		var ponyImage;

		// sets the image depending on the chosen param in constr
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
		/*
		establish path for image
		*/
		var setImage = "images/easterEgg/" + ponyImage + "0.png";
		zombieImage.setAttribute('src', setImage); 
		
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
		this.move = function() {  // __________________________________________
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
				document.location.href = 'endOfGame.html?' + send;
				
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
			killCount++;
			//stops the zombie from calling move/animate functions
			speed = 0;
			
			score += 5;
			document.getElementById("score").textContent=("Score: " + score);
			
			clearInterval(moveTimer);
			moveTimer = null;
			clearInterval(animateTimer);
			animateTimer = null;
			
			//removes the zombie from the array
			zs[zomNum] = null;
			
			//removes the image from the screen
			document.getElementById(zomNum).remove();
			//alert(killCount);
			console.log('kill count ' + killCount);
			console.log('spawn count ' + spawnNum);
			if (killCount == spawnNum) {
				console.log('switching');
				
				easterEggThisWave = 0; // set flag no pony mode again
				backToMainGame();
			}
		}
		
		/*
		animates the image ie. makes it "walk"
		*/
		this.animate = function() {
			imageNumber = (imageNumber + 1) % 2;
			var imageName = "images/easterEgg/" + ponyImage + "" + imageNumber + ".png";
			zombieImage.setAttribute('src', imageName);
		}
		
		/*
		handler for onclick havoir, if zombie's health is 0, it dies
		 else, health is changed
		*/
		this.hit = function(){
			checkGun();
			updateRandomBullet();
			zombieHealthText.innerHTML = health;
			console.log("_______pony #"+ zomNum + " hit w/ gun "+ selectedGun 
						+ " health: " + health);
			if (health == 0){
				//$( "#" + zomNum ).toggle( "bounce", "slow" ); // need two for toggle
				//$( "#" + zomNum ).toggle( "explode", "slow");
				die();	
			} else {
				//$( "#" + [i] ).effect( "shake", "fast");      // conflicts with explode
				
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
				health = 0;
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
				easterEggThisWave = 0; // set flag no pony mode again		
				//increase score
				score += 5;
				backToMainGame();
			}
			health = Math.ceil(health / currentBullet);
			console.log("new health: " + health);	
		}
	
		/*
		returns to main game
		*/
		function backToMainGame() {
			//INITIALIZING EASTER EGG
			//sending player vars
			carryVars();
			//changing css
			killAll();
			console.log("______________________backToMainGame")
			var egg = document.getElementById("css");
			egg.setAttribute('href', "css/styles.css");
			//changing script
			//gets rid of zombie script
			var c = document.getElementsByTagName('script');
			c[6].parentElement.removeChild(c[6]);
			//adds pony script
			var fileref=document.createElement('script')
			fileref.setAttribute("src", "scripts/zombie.js");
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
		
		/*
		stops movement when pause clicked
		*/
		this.stopMove = function() {
		  console.log('freezing pony ' + i);
		  clearInterval(moveTimer);
		  moveTimer = null;
		  clearInterval(animateTimer);
		  animateTimer = null;
		}
		
		/*
		starts movement after pause
		*/
		this.startMove = function() {
			console.log('unfreezing pony ' + i);
		  moveTimer = setInterval(this.move, 10);  
		  animateTimer = setInterval(this.animate, 800);		
		}
	
		//auto caller for move
		moveTimer = setInterval(this.move, 10);
		//auto caller for animate
		animateTimer = setInterval(this.animate, 800);
	};
	
	
	/*
	kills all ponies
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
		//return Math.floor((Math.random() * 100));
		return Math.floor(Math.random() * 4) * 25; 
	}
	
	//number of ponies to spawn
	var spawnNum = 2;
	/*
	spawns ponies
	*/
	for (i = 0; i < spawnNum; i++) {
		var chosen =  Math.floor((Math.random() * 5) + 0);
		zs[i] = new Zombie(healthRandom(), xRandom(), i, -50 - (50 * i), chosen );
		// onclick handel 
		document.getElementById("p" + i + "zImage").onclick = zs[i].hit;
	} 
});