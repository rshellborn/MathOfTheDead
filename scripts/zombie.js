
$(document).ready(function(){
	var genTimer = null;
	/*
	 a zombie represented with health and a img on screen
	 starts "walking" upon instantiation
	 */
	var Zombie = function(health, xPos, zomNum, yPos) {  // this whole thing is a constr. (no class needed b/c that's how js rolls)
		var moveTimer = null;
		var animateTimer = null;
		var imageNumber = 0;
		var zombieImage = document.createElement("img");
		var zomHealthHolder = document.createElement("div");
		
		this.zomNum = zomNum;
		this.xPos = xPos;
		this.yPos = yPos;
		var health = health;

		//console.log("New zombie with health " + this.health + " in xPos " + xPos);
		zombieImage.setAttribute('src','images/zombies/zombie0.png'); // establish path for image
		document.body.appendChild(zombieImage);  		             // attach image to doc body
		zombieImage.id = zomNum;						// symbolically connects the image to the object
		zombieImage.style.position = "absolute" 	    // need this or no movement
		zombieImage.style.top = yPos + "px";            // img off screen to start
		zombieImage.style.left = xPos + "px";           // xPos from param   
		var zombieImageHeight = "300"; // should be function call to bootstrap

		zombieImage.id = zomNum;						// symbolically connects the image to the object
		zombieImage.style.position = "absolute" 	    // need this or no movement
		zombieImage.style.top = yPos + "px";            // img off screen to start
		zombieImage.style.left = xPos + "px";           // xPos from param   
		var zombieImageHeight = "300"; // should be function call to bootstrap
		
		document.body.appendChild(zomHealthHolder);		// attaches div to body
		zomHealthHolder.style.position = "absolute";		// need this for movement
		zomHealthHolder.style.top = yPos + "px"; 			// text off screen to start
		zomHealthHolder.style.left = xPos + (zombieImageHeight / 2) + "px";	// sets text over zombie
		zomHealthHolder.style.color = "red";					// sets font color
		zomHealthHolder.style.fontSize = "200%";
		zomHealthHolder.innerHTML = health;					// sets number to health

		// taken from the ne  
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
		} // taken from the net ENDS 
		// returns true if image has caused game over 
		function atDotted() {
			var dottedLine = document.getElementById('dottedLine');
			var dotPos = getPosition(dottedLine);
			var zomPos = getPosition(zombieImage);
			if (dotPos.y == zomPos.y + parseInt(zombieImageHeight) ){
				return true;
			} else {
				return false; 
			} 
		}

		// Causes the image to move down the screen until it hits the dotted line 
		this.move = function() {
			if (atDotted()){
				// clears the animation and movement 
				clearInterval(moveTimer);
				moveTimer = null;
				clearInterval(animateTimer);
				animateTimer = null;
				// causes screen to shake 
  				$( "div" ).effect( "bounce", "slow" );
				console.log("--++== Game over, chicada. ==++--");
			} else {
				this.animate;
				zombieImage.style.top = parseInt(zombieImage.style.top) + 1 + "px";
				zomHealthHolder.style.top = parseInt(zombieImage.style.top) + 1 + "px";
			}
			//console.log("In move");
		} 
		
		// animates the image ie. makes it "walk"
		this.animate = function() {
			imageNumber = (imageNumber + 1) % 2;
			var imageName = "images/zombies/zombie" + imageNumber + ".png";
			zombieImage.setAttribute('src', imageName);
		}

		this.ouch = function(){
			zombieImage.style.color = "red";
		}
		
		// handler for onclick havoir 
		// if zombie's health is 0, it dies
		// else, health is changed
		this.hit = function(){
			health -= 1;          // TODO: get health + b-que to talk 
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
		
		
		// sets a zombies health to zero when clicked
		// pushes zombie above screen 
		// a random new health value
		function kill() {
			health = 0;
			if(health == 0) {
				zombieImage.style.top = "-350px";
				health = Math.floor((Math.random() * 10) + 1);
				zomHealthHolder.style.top = "-350px";
				zomHealthHolder.innerHTML = health;
			}
			console.log("Zombie #"+ i + " is (re)dead.");
		}

		//auto callers for moving and animating 
		moveTimer = setInterval(this.move, 20);         
		animateTimer = setInterval(this.animate, 800);
	};
	// random num helper for generate 
	function yRandom() {
		return Math.floor((Math.random() * -250) -350);
	}
	
	// generates zombies 
	var zs = new Array();

	function generate(i) {
		
		//console.log("i = " + i);
		zs[i] = new Zombie(5, i * 200, i, yRandom());    // call to constr 
		document.getElementById(i).onclick = zs[i].hit; // onclick handel 
		
	}

	// spawns 4 new zombies into game screen.
	 var i = 0;
		genTimer = setInterval(generate(i++), 100);
		genTimer = setInterval(generate(i++), 200);
		genTimer = setInterval(generate(i++), 300);
		genTimer = setInterval(generate(i++), 200);
});