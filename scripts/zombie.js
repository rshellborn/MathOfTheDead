
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


		this.xPos = xPos;
		this.health = health;
		this.yPos = yPos;

		console.log("New zombie with health " + this.health + " in xPos " + xPos);
		zombieImage.setAttribute('src','images/zombies/zombie0.png');  // establish path for image
		document.body.appendChild(zombieImage);  		// attach image to body

		zombieImage.id = zomNum;						// symbolically connects the image to the object
		zombieImage.style.position = "absolute" 	    // need this or no movement
		zombieImage.style.top = yPos + "px";            // img off screen to start
		zombieImage.style.left = xPos + "px";           // xPos from param   
		var zombieImageHeight = "300"; // should be function call to bootstrap

		// taken from the net 
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
		// check for zombie at dotted line
		function atDotted() {
			var dottedLine = document.getElementById('dottedLine');
			var dotPos = getPosition(dottedLine);
			var zomPos = getPosition(zombieImage);
			//console.log("dotted y: " + typeof(dotPosition.y)); 
			//console.log("zombie foot: " + typeof(zombiePos.y));
			if (dotPos.y == zomPos.y + parseInt(zombieImageHeight) ){
				return true;
			} else {
				return false; 
			} 
		}
		/*
		Causes the zombie to move down the screen towards the player
		 */
		this.move = function() {
			//zombieImage.style.top = parseInt(zombieImage.style.top) + 1 + "px";
			
			// checks if zombie has touched dotted line 
			if (atDotted()){
				clearInterval(moveTimer);
				moveTimer = null;
				clearInterval(animateTimer);
				animateTimer = null;
				alert("Game over, chicada. " + health);

			} else {
				//console.log("In else");
				this.animate;
				zombieImage.style.top = parseInt(zombieImage.style.top) + 1 + "px";
				
			}
			//console.log("In move");
		} /*
		Simulates the zombie movement
		 */
		this.animate = function() {
			imageNumber = (imageNumber + 1) % 2;
			var imageName = "images/zombies/zombie" + imageNumber + ".png";
			zombieImage.setAttribute('src', imageName);
		}
		/*
		sets a zombies health to zero, pushes zombie above screen an assisgns
		a random new health value.
		 */
		this.kill = function () {
			this.health = 0;
			alert(this.health);
			if(this.health == 0) {
				zombieImage.style.top = "-350px";
				this.health = Math.floor((Math.random() * 10) + 1);
			}
		}
		moveTimer = setInterval(this.move, 20);    //starts moving
		animateTimer = setInterval(this.animate, 800);
	};

	function yRandom() {
		return Math.floor((Math.random() * -250) -350);
	}

	function generate(i) {
		var zs = new Array();
		console.log("i = " + i);
		zs[i] = new Zombie(5, i * 200, i, yRandom());
		document.getElementById(i).onclick = zs[i].kill;
	}

	/*
	Spawns 4 new zombies into game screen.
	 */

	 var i = 0;
		genTimer = setInterval(generate(i++), 100);
		genTimer = setInterval(generate(i++), 200);
		genTimer = setInterval(generate(i++), 300);
		genTimer = setInterval(generate(i++), 200);
});