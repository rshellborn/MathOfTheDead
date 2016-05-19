
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
		gunSelect.play(); 
		changeGun(1);
	}
	minusGun.onclick = function(){
		gunSelect.play();
		changeGun(2);

	}
	multiGun.onclick = function(){
		gunSelect.play();
		changeGun(3);
	}
	diviGun.onclick = function(){
		gunSelect.play();
		changeGun(4);
	}
});