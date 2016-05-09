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
		
$(document).ready(function() {
	var plusGun = document.getElementById('plusGun');
	var minusGun = document.getElementById('minusGun');
	var multiGun = document.getElementById('multiGun');
	var diviGun = document.getElementById('diviGun');
	
	var pause = document.getElementById("pause");
	
	var curQueue = document.getElementById("curQueue");
	
	pause.onclick = function() {
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
		document.getElementsByTagName("head")[0].appendChild(fileref)
		
		//alert('Game Paused! Press Ok to continue slaying some zombies.');
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