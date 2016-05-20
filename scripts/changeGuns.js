/*
Toggling gun selection.
*/
function changeGun(gunType) {
	
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
	}
}