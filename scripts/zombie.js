
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
		zombieImage.style.top = yPos + "px";               // img off screen to start
		zombieImage.style.left = xPos + "px";           // xPos from param   

		/*
		Causes the zombie to move down the screen towards the player
		 */
		this.move = function() {
			zombieImage.style.top = parseInt(zombieImage.style.top) + 1 + "px";
			this.animate;
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
		this.moveTimer = setInterval(this.move, 20);    //starts moving
		this.animateTimer = setInterval(this.animate, 800);
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