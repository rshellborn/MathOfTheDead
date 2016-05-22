/**
Starts the wave when player is ready during tutorial mode 
*/
function startTutorialWave() {
	$("#initiateWaveModal").modal('show');
	disableModalP = 1;
	disableModalS = 1;
	disableModalM = 1;
	disableModalD = 1;
	disableModalBQ = 1;
	enablePause = 1;
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
	//grabs start practice wave button
	var startWave = document.getElementById("startWave");
	
	startWave.onclick = function() {
		startWave.setAttribute("class", "hidden");
	}
	
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
			 		if (zs[i] != null && enablePause == 1)
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
			$("#addGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
	
	minusGun.onclick = function(){
		changeGun(2);
		if(disableModalS == 0) {
			$("#subGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
	multiGun.onclick = function(){
		changeGun(3);
		if(disableModalM == 0) {
			$("#multiGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
	diviGun.onclick = function(){
		changeGun(4);
		if(disableModalD == 0) {
			$("#diviGunModal").modal({backdrop: 'static', keyboard: false});
		}
	}
	
});