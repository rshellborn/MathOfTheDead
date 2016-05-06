$(document).ready(function(){
	// a zombie represented with health and a img on screen
	// starts "walking" upon instantiation
	var Zombie = function(health, xPos, zomNum) {  // this whole thing is a constr. (no class needed b/c that's how js rolls)
		var moveTimer = null;
		this.xPos = xPos;
		this.health = health; 
		console.log("New zombie with health " + this.health + " in xPos " + xPos);
		var zombieImage = document.createElement("img");
		zombieImage.setAttribute('src','images/zombies/zombie0.png');  // establish path for image
		
		document.body.appendChild(zombieImage);  		// attach image to body
		
		zombieImage.id = zomNum;						// symbolically connects the image to the object
		zombieImage.style.position = "absolute" 	    // need this or no movement
		zombieImage.style.top = "-250px";               // img off screen to start
		zombieImage.style.left = xPos + "px";           // xPos from param   
		
		// moves the zombie downward
		Zombie.prototype.move = function() {
				zombieImage.style.top = parseInt(zombieImage.style.top) + 1 + "px";
				//console.log("In move");
		}
		
		this.ouch = function() {
			alert(zomNum);
		}
		this.moveTimer = setInterval(this.move, 20);    //starts moving
	}; 
	
	// spawn three zombies
<<<<<<< HEAD
	var zs = new Array();
	
	for (i = 0; i < 4; i++) {
		zs[i] = new Zombie(5, i * 200, i);
		document.getElementById(i).onclick = zs[i].ouch;
	}
=======
	//var z2 = new Zombie(5,0);
	//var z1 = new Zombie(10,150);
	//var z3 = new Zombie(15,300);
>>>>>>> cbc586effc10db28215e43efee5df11670be8a91
});