
$(document).ready(function(){
	var genTimer = null;
	/*
	 a zombie represented with health and a img on screen
	 starts "walking" upon instantiation.
	 this whole thing is a constr. (no class needed b/c that's how js rolls)
	 */
	var Zombie = function(health, xPos, zomNum, yPos) {  
		var moveTimer = null;
		var animateTimer = null;
		var imageNumber = 0;
		//var lawn = document.getElementById("lawn");
		var zombieImage = document.createElement("img");
		var zomHealthHolder = document.createElement("div");

		this.zomNum = zomNum;
		this.xPos = xPos;
		this.yPos = yPos;
		var health = health;

		/*
		establish path for image
		*/
		zombieImage.setAttribute('src','images/zombies/zombie0.png'); 
		/*
		attach image to doc body
		*/
		document.getElementById("lawn").appendChild(zombieImage);  	
		/*
		symbolically connects the image to the object
		*/	           
		zombieImage.id = zomNum;	
		/*
		need this or no movement
		*/			
		zombieImage.style.position = "absolute" 	 
		/*
		img off screen to start
		*/  
		zombieImage.style.top = yPos + "%";           
		/*
		xPos from param   
		*/
		zombieImage.style.left = xPos + "%";          
		/*
		should be function call to bootstrap
		*/
		var zombieImageHeight = "300"; 
		/*
		symbolically connects the image to the object
		*/
		zombieImage.id = zomNum;		
		/*
		need this or no movement
		*/				
		zombieImage.style.position = "absolute" 
		/*
		img off screen to start
		*/	    
		zombieImage.style.top = yPos + "%";  
		/*
		xPos from param   
		*/          
		zombieImage.style.left = xPos + "px";          
		/*
		should be function call to bootstrap
		*/ 
		var zombieImageHeight = "300"; 
		/*
		attaches div to body
		*/
		document.getElementById("lawn").appendChild(zomHealthHolder);		
		/*
		need this for movement
		*/
		zomHealthHolder.style.position = "absolute";		
		/*
		text off screen to start
		*/
		zomHealthHolder.style.top = yPos + "%"; 			
		/*
		sets text over zombie
		*/
		zomHealthHolder.style.left = xPos + (zombieImageHeight / 2) + "px";	
		/*
		sets font color
		*/
		zomHealthHolder.style.color = "red";		
		/*

		*/			
		zomHealthHolder.style.fontSize = "200%";
		/*
		sets number to health
		*/
		zomHealthHolder.innerHTML = health;					

		/*
		taken from the net  
		*/ 
		function getPosition(el) {
			var xPos = 0;
			var yPos = 0;

			while (el) {
				if (el.tagName == "BODY") {
					// deal with browser quirks with body/window/document and page scroll
					var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
					var yScroll = el.scrollTop || document.documentElement.scrollTop;

					xPos += (el.offsetLeft - xScroll + el.clientLeft);
					yPos += (el.offsetTop - yScroll + el.clientTop);
				} else {
					// for all other non-BODY elements
					xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
					yPos += (el.offsetTop - el.scrollTop + el.clientTop);
				}

				el = el.offsetParent;
			}
			return {
				x: xPos,
				y: yPos
			};
		} 
		/*
		taken from the net ENDS, returns true if image has caused game over 
		*/
		function atDotted() {
			var dottedLine = document.getElementById('dottedLine');
			var dotPos = getPosition(dottedLine);
			var zomPos = getPosition(zombieImage);
			if (dotPos.y <= zomPos.y + parseInt(zombieImageHeight) ){
				return true;
			} else {
				return false; 
			} 
		} 
		/*
		Causes the image to move down the screen until it hits the dotted line 
		*/
		this.move = function() {
			if (atDotted()){
				// clears the animation and movement 
				clearInterval(moveTimer);
				moveTimer = null;
				clearInterval(animateTimer);
				animateTimer = null;
				// causes screen to shake 
				//$( "div" ).effect( "bounce", "slow" );
				console.log("--++== Game over, chicada. ==++--");
			} else {
				this.animate;
				zombieImage.style.top = parseInt(zombieImage.style.top) + 1 + "%";
				zomHealthHolder.style.top = parseInt(zombieImage.style.top) + 1 + "%";
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
		handler for onclick havoir, if zombie's health is 0, it dies
		 else, health is changed
		*/
		this.hit = function(){
			checkGun();
			updateRandomBullet();
			//health -= 1;          // TODO: get health + b-que to talk 
			zomHealthHolder.innerHTML = health;
			if (health == 0){
				$( "#" + zomNum ).toggle( "explode", "fast"); // need two for toggle
				$( "#" + zomNum ).toggle( "explode", "slow");
				kill();	
			} else {
				// $( "#" + [i] ).effect( "shake", "fast");      // conflicts with explode
				console.log("#"+ i + " hit w/ gun"+ selectedGun 
						+ " health: " + health);
			}			
		}

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
		//trigger easter egg
		if(currentBullet == 0) {
			triggerEasterEgg();	
		}
		
		health = Math.ceil(health / currentBullet);
		console.log("new health: " + health);
	}
	
	function triggerEasterEgg() {
		//INITIALIZING EASTER EGG
		//changing css
		var egg = document.getElementById("css");
		egg.setAttribute('href', "css/easterEgg.css");
		//changing script
		//gets rid of zombie script
		var c = document.getElementsByTagName('script');
		c[3].parentElement.removeChild(c[3]);
		//adds pony script
		var fileref=document.createElement('script')
		fileref.setAttribute("src", "scripts/pony.js");
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
		
		/*
		 sets a zombies health to zero when clicked, pushes zombie above screen 
		 a random new health value
		*/
		function kill() {
			health = 0;
			if(health == 0) {
				zombieImage.style.top = "-350%";
				health = Math.floor((Math.random() * 10) + 1);
				zomHealthHolder.style.top = "-350%";
				zomHealthHolder.innerHTML = health;
			}
			console.log("Zombie #"+ i + " is (re)dead.");
		}

		//auto callers for moving and animating 
		moveTimer = setInterval(this.move, 120);         
		animateTimer = setInterval(this.animate, 800);
	};
	
	
	/*
	random num helper for generate 
	*/ 
	function yRandom() {
		return Math.floor((Math.random() * -50) -150);
	}

	/*
	generates zombies 
	*/ 
	var zs = new Array();

	function generate(i) {
		// call to constr 
		zs[i] = new Zombie(5, i * 200, i, yRandom());    
		// onclick handel 
		document.getElementById(i).onclick = zs[i].hit; 

	}

	/*
	spawns 4 new zombies into game screen.
	*/ 
	var i = 0;
	genTimer = setInterval(generate(i++), 100);
	genTimer = setInterval(generate(i++), 200);
	genTimer = setInterval(generate(i++), 300);
	genTimer = setInterval(generate(i++), 200);
});