var zombieClicked;

function checkGun(zombie) {
	zombieClicked = zombie;
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
	var health = getHealth();
	health = health + currentBullet;
	setHealth(health);
	alert("new health: " + health);
}

function minusOperation() {
	var health = getHealth();
	health = health - currentBullet;
	setHealth(health);
	alert("new health: " + health);
}

function multiOperation() {
	var health = getHealth();
	health = health * currentBullet;
	setHealth(health);
	alert("new health: " + health);
}

function diviOperation() {
	var health = getHealth();
	health = health / currentBullet;
	setHealth(health);
	alert("new health: " + health);
}