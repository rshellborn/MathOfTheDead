var zs = new Array();
$(document).ready(function(){
	//holds the zombies
	//var zs = new Array();
	var genTimer = null;
	var score = 0;
	document.getElementById("score").textContent=("Score: " +score);
	
	killCount = 0;
	/*
	 a zombie represented with health and a img on screen
	 starts "walking" upon instantiation.
	 this whole thing is a constr. (no class needed b/c that's how js rolls)
	 */
	var Zombie = function(health, xPos, zomNum, yPos, chosen) {  // extra param 'chosen'
		
		//assigning arguments to variables
		var zomNum = "p" + zomNum;
		var xPos = xPos;
		var yPos = yPos;
		var speed = 0.1;
		var health = health;
		console.log("Pony # " + zomNum + " health: " + health + " xPos: " + xPos);
		
		//declaring variables for movement/animation
		var moveTimer = null;
		var animateTimer = null;
		var imageNumber = 0;
		
		//initializing variables for zombie visuals
		var zombieImage = document.createElement("img");
		var zombieHolder = document.createElement("div");
		var zombieHealthText = document.createElement("div");
		
		//div to hold health text and zombie image
		zombieHolder.style.height = "40%";
		zombieHolder.style.maxHeight = "188px";
		zombieHolder.style.width = "25%";
		zombieHolder.style.position = "absolute";
		zombieHolder.style.top = yPos + "%"; 
		zombieHolder.style.left = xPos + "%";
		zombieHolder.id = zomNum;
		
		//creating health visualizer
		zombieHealthText.innerHTML = health;
		zombieHealthText.style.textAlign = "center";
		zombieHealthText.style.color = "Black"; // unique to pony
		zombieHealthText.style.fontSize = "150%";
		zombieHealthText.style.position = "relative";
		zombieHealthText.style.height = "20%";
		zombieHealthText.style.top = "-100%";
		
		//zombie image data
		zombieImage.id = zomNum + "zImage";
		zombieImage.src = "images/zombies/zombie0.png";
		zombieImage.style.height = "80%";
		zombieImage.style.position = "relative";
		zombieImage.style.display = "block";
		zombieImage.style.top = "-100%";
		zombieImage.style.marginLeft = "auto";
		zombieImage.style.marginRight = "auto";
		zombieImage.style.zIndex = "1";
		// ______________________________________ unique to pony
		var ponyImage;
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
				// clears the animation and movement 
				clearInterval(moveTimer);
				moveTimer = null;
				clearInterval(animateTimer);
				animateTimer = null;
				
				console.log("||| G A M E O V E R |||" + zomNum);
				
				var send = "wave=" + wave + "&score=" + score + "";
				
				document.location.href = 'endOfGame.html?' + send;
				
			} else {
				yPos += speed;
				zombieHolder.style.top = yPos + "%";
				//console.log("#" + zomNum + " " + zombieHolder.style.top); 
			}
		} 
		
		this.wipe = function() {
			clearInterval(moveTimer);
			moveTimer = null;
			clearInterval(animateTimer);
			animateTimer = null;
			
			//removes the zombie from the array
			zs[zomNum] = null;
			
			//removes the image from the screen
			document.getElementById(zomNum).remove();
		}
		
		//kills the zombie.
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
			if (killCount == spawnNum) {
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
  
		function plusOperation() {
			health = health + currentBullet;
			console.log("new health: " + health);
		}
		
		function minusOperation() {
			health = health - currentBullet;
			console.log("new health: " + health);
		}
		
		function multiOperation() {
			health = health * currentBullet;
			console.log("new health: " + health);
		}
		
		function diviOperation() {
			if(currentBullet == 0) {
				easterEggThisWave = 0; // set flag no pony mode again
				backToMainGame();
			}
			health = Math.ceil(health / currentBullet);
			console.log("new health: " + health);	
		}
	
	
		function backToMainGame() {
			//INITIALIZING EASTER EGG
			//changing css
			killAll();
			console.log("______________________backToMainGame")
			var egg = document.getElementById("css");
			egg.setAttribute('href', "css/styles.css");
			//changing script
			//gets rid of zombie script
			var c = document.getElementsByTagName('script');
			c[5].parentElement.removeChild(c[5]);
			//adds pony script
			var fileref=document.createElement('script')
			fileref.setAttribute("src", "scripts/zombie.js");
			document.getElementsByTagName("head")[0].appendChild(fileref);
		}
		
		this.stopMove = function() {
		  clearInterval(moveTimer);
		  moveTimer = null;
		  clearInterval(animateTimer);
		  animateTimer = null;
		}
	
		this.startMove = function() {
		  moveTimer = setInterval(this.move, 10);  
		  animateTimer = setInterval(this.animate, 800);		
		}
	
		//auto callers for moving and animating 
		moveTimer = setInterval(this.move, 10);  
		animateTimer = setInterval(this.animate, 800);
	};
	// ___________________________________________________out of zombie 
	
	function killAll() {
		for (j = 0; j < zs.length; j++) {
			console.log("length" + zs.length);
			console.log("index" + j);
			zs[j].wipe();
			console.log("doot");
		}
	}
	
	/*
	random num helper for health 
	*/ 
	function healthRandom() {
		out = Math.floor((Math.random() * 10) + 1);
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

	function generate(i) {
		// call to constr 
		// params health, xPos, zomNum, yPos
		zs[i] = new Zombie(healthRandom(), xRandom(), i, -100 );  
		// onclick handel 
		document.getElementById("p" + i + "zImage").onclick = zs[i].hit;
	}
		
	var spawnNum = 2;
	for (i = 0; i < spawnNum; i++) {
		var chosen =  Math.floor((Math.random() * 5) + 0);
		zs[i] = new Zombie(healthRandom(), xRandom(), i, -50 - (50 * i), chosen );
		// onclick handel 
		document.getElementById("p" + i + "zImage").onclick = zs[i].hit;
	}

	/*var fadeStatus;
	function fade() {
		$("#NW").fadeIn(3000);
		$("#NW").fadeOut(3000);
		fadeStatus = true;
	} */       
});