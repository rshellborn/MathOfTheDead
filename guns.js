var selectedGun = 1;
		
function changeGun(gunType) {
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	
	if(gunType == 1) {
	  plusGun.setAttribute("class", "clicked");
	  minusGun.setAttribute("class", "clickable");
	  multiGun.setAttribute("class", "clickable");
	  diviGun.setAttribute("class", "clickable");
	  selectedGun = 1;
	} else if (gunType == 2) {
	  plusGun.setAttribute("class", "clickable");
	  minusGun.setAttribute("class", "clicked");
	  multiGun.setAttribute("class", "clickable");
	  diviGun.setAttribute("class", "clickable");
	  selectedGun = 2;
	}else if (gunType == 3) {
	  plusGun.setAttribute("class", "clickable");
	  minusGun.setAttribute("class", "clickable");
	  multiGun.setAttribute("class", "clicked");
	  diviGun.setAttribute("class", "clickable");
	  selectedGun = 3;
	}else if (gunType == 4) {
	  plusGun.setAttribute("class", "clickable");
	  minusGun.setAttribute("class", "clickable");
	  multiGun.setAttribute("class", "clickable");
	  diviGun.setAttribute("class", "clicked");
	  selectedGun = 4;
	}
	alert(selectedGun);
}

function showBoundary() {
	alert('clicked');	
}
		
$(document).ready(function() {
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	
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