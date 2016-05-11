
$(document).ready(function(){
	var genTimer = null;
	var score = 0;
	document.getElementById("score").textContent=("Score: " +score);
	/*
	 a zombie represented with health and a img on screen
	 starts "walking" upon instantiation.
	 this whole thing is a constr. (no class needed b/c that's how js rolls)
	 */
	var Zombie = function(health, xPos, zomNum, yPos) {  
		var moveTimer = null;
		var animateTimer = null;
		var imageNumber = 0;
		var zombieImage = document.createElement("img");
		var zomHealthHolder = document.createElement("div");

		this.zomNum = zomNum;
		var xPos = xPos;
		var yPos = yPos;
		var speed = 0.04;
		var health = health;
		console.log("# " + zomNum + " health: " + health + " xPos: " + xPos);

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
		
		//sets zombie size
		zombieImage.style.height = "40%";
		zombieImage.style.maxHeight = "150px";
		/*
		should be function call to bootstrap
		*/ 
		//var zombieImageHeight = "300"; 
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
		zomHealthHolder.style.left = xPos + "%";	
		/*
		sets font color
		*/
		zomHealthHolder.style.color = "White";		
		/*

		*/			
		zomHealthHolder.style.fontSize = "200%";
		/*
		sets number to health
		*/
		zomHealthHolder.innerHTML = health;	
		/* 
		sets the div id of the health holder
		*/ 
		zomHealthHolder.setAttribute("id",zomNum);				

		/*
		taken from the net  
		*/ 
		/*function getPosition(el) {
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
		}*/
		
		/*
		taken from the net ENDS, returns true if image has caused game over 
		*/
		function atDotted() {
			return yPos >= 100;
		} 
		
		/*
		Causes the image to move down the screen until it hits the dotted line 
		*/
		this.move = function() {
			console.log(yPos);
			if (atDotted()){
				// clears the animation and movement 
				clearInterval(moveTimer);
				moveTimer = null;
				clearInterval(animateTimer);
				animateTimer = null;
				// causes screen to shake 
				//$( "div" ).effect( "bounce", "slow" );
				console.log("||| G A M E O V E R |||");
				//document.location.href = 'endOfGame.html';
			} else {
				this.animate;
				yPos += speed;
				zombieImage.style.top = yPos + "%";
				zomHealthHolder.style.top = yPos + "%";
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
			zomHealthHolder.innerHTML = health;
			if (health == 0){
				$( "#" + zomNum ).toggle( "explode", "fast"); // need two for toggle
				$( "#" + zomNum ).toggle( "explode", "slow");
				kill(zomNum);	
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
		if(currentBullet == 0) {
			triggerEasterEgg();	
		}
		
		health = health / currentBullet;
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
		//auto callers for moving and animating 
		moveTimer = setInterval(this.move, 10);  
		animateTimer = setInterval(this.animate, 800);
	};
	
	
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
		return Math.floor(Math.random() * 4)* 25; 
	}

	/*
	generates zombies 
	*/ 
	var zs = new Array();

	function generate(i) {
		// call to constr 
		// params health, xPos, zomNum, yPos
		zs[i] = new Zombie(healthRandom(), xRandom(), i, -100 );    
		// onclick handel 
		document.getElementById(i).onclick = zs[i].hit;
		// god mode auto kill (for testing)
		document.getElementById(i).ondblclick=function(){kill(i)};

	}
	
	/*
	"kills" a zombie by removing all elements by id
	note: currently two calls are required to kill the zombie 
	and the health number because they share the same id. 
	*/
	function kill(zomNum) {
		score += 5;
		document.getElementById("score").textContent=("Score: " + score);
		document.getElementById(zomNum).remove(); // one call to "zombie"
		document.getElementById(zomNum).remove(); // another call to number container
		zs[zomNum] = null; 						  // remove ref for garbage collection 
	}
	/*
	Zombie gen loop
	*/
	var i = 1;                     
	var spawnNum = 15; 
	function genLoop() {           
		setTimeout(function () {   
			generate(i)  // generate with zombie id as param 		       
			i++;                  
			if (i < spawnNum) {    
				genLoop();        
			}                     
		}, 4000)
	}
	genLoop();                   
});