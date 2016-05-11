var selectedGun = 1;
		
function changeGun(gunType) {
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	
	if(gunType == 1) {
	  plusGun.setAttribute("class", "col-xs-3 guns clicked");
	  minusGun.setAttribute("class", "col-xs-3 guns");
	  multiGun.setAttribute("class", "col-xs-3 guns");
	  diviGun.setAttribute("class", "col-xs-3 guns");
	  selectedGun = 1;
	} else if (gunType == 2) {
	  plusGun.setAttribute("class", "col-xs-3 guns");
	  minusGun.setAttribute("class", "col-xs-3 guns clicked");
	  multiGun.setAttribute("class", "col-xs-3 guns");
	  diviGun.setAttribute("class", "col-xs-3 guns");
	  selectedGun = 2;
	}else if (gunType == 3) {
	  plusGun.setAttribute("class", "col-xs-3 guns");
	  minusGun.setAttribute("class", "col-xs-3 guns");
	  multiGun.setAttribute("class", "col-xs-3 guns clicked");
	  diviGun.setAttribute("class", "col-xs-3 guns");
	  selectedGun = 3;
	}else if (gunType == 4) {
	  plusGun.setAttribute("class", "col-xs-3 guns");
	  minusGun.setAttribute("class", "col-xs-3 guns");
	  multiGun.setAttribute("class", "col-xs-3 guns");
	  diviGun.setAttribute("class", "col-xs-3 guns clicked");
	  selectedGun = 4;
	}
	//alert(selectedGun);
	//checkGun();
}
	
	function hotKeys(e) {
		if(e.event){
			theKeyPressed = e.keyCode;
		}else if(e.which){
			theKeyPressed = e.which;
		}
		if(theKeyPressed == 32){
			//alert('Game Paused! Press Ok to continue slaying some zombies.');
		} else if (theKeyPressed == 65) {
			changeGun(1);
		} else if (theKeyPressed == 83) {
			changeGun(2);
		} else if (theKeyPressed == 68) {
			changeGun(3);
		} else if (theKeyPressed == 70) {
			changeGun(4);
		} else if (theKeyPressed == 69) {
			updateRandomBullet();
		} else if (theKeyPressed == 49) {
			document.location.href = 'endOfGame.html';
		}
	}

$(document).ready(function() {
	window.onkeydown=hotKeys;
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	
	var pause = document.getElementById("pause");
	
	var curQueue = document.getElementById("curQueue");
	
	pause.onclick = function() {
		$("#pause").click(function(){
        	$("#myModal").modal();
   		});
	}
	plusGun.onclick = function(){
		changeGun(1);
	}
	minusGun.onclick = function(){
		changeGun(2);

	}
	multiGun.onclick = function(){
		changeGun(3);
	}
	diviGun.onclick = function(){
		changeGun(4);
	}
});