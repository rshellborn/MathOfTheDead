//the currently selected gun - starts on the plus gun.
var selectedGun = 1;
//sets the game to be unpaused at the start
var paused = 0;

var disableModalP = 0;
var disableModalS = 0;
var disableModalM = 0;
var disableModalD = 0;

function startTutorialWave() {
	$("#InitiateWave").modal('show');
	disableModalP = 1;
	disableModalS = 1;
	disableModalM = 1;
	disableModalD = 1;
	disableModalBQ = 1;
}

/**
Toggling gun selection.
*/
function changeGun(gunType) {
	//Sets the guns to be assigned to a div in the html
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	//Checks which gun is selected and sets the selectedGun to a number and sets the attributes on the web page to show the player which one is currently selected.
	if(gunType == 1) {
	  //Plus Gun
	  
	  plusGun.setAttribute("class", "col-xs-3 guns clicked");
	  minusGun.setAttribute("class", "col-xs-3 guns");
	  multiGun.setAttribute("class", "col-xs-3 guns");
	  diviGun.setAttribute("class", "col-xs-3 guns");
	  selectedGun = 1;
	} else if (gunType == 2) {
	  //Minus Gun	
		
	  plusGun.setAttribute("class", "col-xs-3 guns");
	  minusGun.setAttribute("class", "col-xs-3 guns clicked");
	  multiGun.setAttribute("class", "col-xs-3 guns");
	  diviGun.setAttribute("class", "col-xs-3 guns");
	  selectedGun = 2;
	}else if (gunType == 3) {
	  //Multiplication Gun
		
	  plusGun.setAttribute("class", "col-xs-3 guns");
	  minusGun.setAttribute("class", "col-xs-3 guns");
	  multiGun.setAttribute("class", "col-xs-3 guns clicked");
	  diviGun.setAttribute("class", "col-xs-3 guns");
	  selectedGun = 3;
	}else if (gunType == 4) {
	  //Division Gun
		
		
	  plusGun.setAttribute("class", "col-xs-3 guns");
	  minusGun.setAttribute("class", "col-xs-3 guns");
	  multiGun.setAttribute("class", "col-xs-3 guns");
	  diviGun.setAttribute("class", "col-xs-3 guns clicked");
	  selectedGun = 4;
	}
}
/*
Enables the user to use asdf keys for the operator guns and the e key for deleting the current bullet in the bullet queue
*/
function hotKeys(e) {
	if(e.event){
		theKeyPressed = e.keyCode;
	}else if(e.which){
		theKeyPressed = e.which;
	}
	 else if (theKeyPressed == 65) {
		changeGun(1);
	} else if (theKeyPressed == 83) {
		changeGun(2);
	} else if (theKeyPressed == 68) {
		changeGun(3);
	} else if (theKeyPressed == 70) {
		changeGun(4);
	} else if (theKeyPressed == 69) {
		updateRandomBullet();
	}
}

$(document).ready(function() {
	//Enables hot keys
	window.onkeydown = hotKeys;
	//Sets the guns to be assigned to a div in the html
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	
	//Grabs pause button from the div
	var pause = document.getElementById("pause");
	//Grabs resume button from the div which pops up in the modal dialog box
	var resume = document.getElementById("resume");
	
	
	
	/*
	If paused is clicked, it sets paused variable to true(1), stops the movement of the zombies or ponies, and once resume is clicked it starts to movement again.
	*/
	pause.onclick = function() {
		paused = 1;
		console.log('set status' + paused);
		console.log('pause pressed');
			console.log('freezing zombies');
			for(var i = 0; i < zs.length; i++) {
				if (zs[i] != null)
					zs[i].stopMove();
			}
			console.log('exiting for loop');
			resume.onclick = function() {
				console.log('resume clicked');
				paused = 0;
			 	for(var i = 0; i < zs.length; i++) {
			 		if (zs[i] != null)
						zs[i].startMove();
			  }
			}
	}
	
	/*
	These all call the functions inside of changeGun
	*/
	plusGun.onclick = function(){
		changeGun(1);
		if(disableModalP == 0) {
			$("#AddGunModal").modal({backdrop: 'static', keyboard: false});
			disableModalP = 1;
		}
	}
	
	minusGun.onclick = function(){
		changeGun(2);
		if(disableModalS == 0) {
			$("#SubGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
	multiGun.onclick = function(){
		changeGun(3);
		if(disableModalM == 0) {
			$("#MultiGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
	diviGun.onclick = function(){
		changeGun(4);
		if(disableModalD == 0) {
			$("#DiviGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
});