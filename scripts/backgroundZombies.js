/*
  Zombie as represented with an img on screen
  starts "walking" upon instantiation.
*/
$(document).ready(function(){	
	/* --------------------------------------START OF bgZombie Object------------------------------------- */

	/*
	 Constructs a zombie with an x position and y position, and a number
	 @params 
	 xPos 	x position of the zombie
     zomNum Unique number to identify an individual zombie (used as ID tag for its div)
	 yPos   y position of the zombie 
	*/
	var bgZombie = function(zomNum, xPos, yPos) { 
		var zomNum = zomNum;
		var xPos = xPos;
		var yPos = yPos;
		
		// Speed of the zombie
		var speed = 0.03;
		
		//Message to show the zombie has been spawned.
		console.log("fake# " + zomNum + " xPos: " + xPos + " yPos: " + yPos);
		
		// Holds timer for movement
		var moveTimer = null;
		// Holds timer for animation
		var animateTimer = null;
		// Holds image number
		var imageNumber = 0;
		
		// Creates zombie image element
		var zombieImage = document.createElement("img");
		var zombieHolder = document.createElement("div");
		
		/* ----------------------------------START OF Zombie Styling-------------------------------------- */

		// Set styles for container for zombie
		zombieHolder.style.height = "10%";
		zombieHolder.style.maxHeight = "150px";
		zombieHolder.style.width = "10%";
		zombieHolder.style.position = "absolute";
		zombieHolder.style.top = yPos + "%"; 
		zombieHolder.style.left = xPos + "%";

		// Assign id for holder for zombie
		zombieHolder.id = zomNum;
		
		// Set styles for zombie image 
		zombieImage.id = zomNum + "zImage";
		zombieImage.src = "images/zombies/zombie0.png";
		zombieImage.style.height = "100%";
		zombieImage.style.position = "relative";
		zombieImage.style.display = "block";
		zombieImage.style.top = "-100%";
		zombieImage.style.marginLeft = "auto";
		zombieImage.style.marginRight = "auto";
		
		// Adding zombie image to zombieHolder
		zombieHolder.appendChild(zombieImage);
		
		//adding zombieHolder to screen
		document.getElementsByClassName("row specialrow")[0].appendChild(zombieHolder);
		
		/* ----------------------------------END OF bgZombie Styling-------------------------------------- */
		
		
		
		/* ----------------------------------------START OF Zombie Movement------------------------------------------ */
		
		/*
		Causes the image to move down the screen until it hits the dotted line.
		*/
		this.move = function() { 
			/* Increments y position to move the zombie downwards */
			yPos += speed;
			zombieHolder.style.top = yPos + "%";
			
			if (yPos >= 110) {
				yPos = -10; 
				xPos = xRandom();
				zombieHolder.style.left = xPos + "%";
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
		  animateTimer = setInterval(this.animate, 1000);		
		}
		
		//auto caller for moving 
		moveTimer = setInterval(this.move, 10);
		//auto caller for animating
		animateTimer = setInterval(this.animate, 1000);
		
		/* ----------------------------------------END OF Zombie Movement------------------------------------------ */
		
				
		/* ----------------------------------------START OF Killing Zombies------------------------------------------ */
		
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
		
		/* ----------------------------------------END OF Killing Zombies------------------------------------------ */
	
	};
	/* --------------------------------------END OF Zombie Object------------------------------------- */
	
	/*
	generates BackgroundZombies
	*/
	function makeBGZombies() {
		var bgZombies = new Array();
		for (var i = 0; i < 5; i++) {
			bgZombies[i] = new bgZombie(i, xRandom(), ((i * -25)));
		}
	}
	
	/* ----------------------------START OF Random and Generation Functions-------------------------- */
	
	/*
		Random num helper for xPos 
	*/ 
	function xRandom() {
		return Math.floor(Math.random() * 10) * 10; 
	}

	/*
		lanePlacement ensures multiple zombies will not spawn on top of eachother on the x axis
	*/
	function lanePlacement(laneNum) {
		return Math.floor(laneNum) * 25;  
	}
	/* ----------------------------END OF Random and Generation Functions-------------------------- */
	makeBGZombies();
});