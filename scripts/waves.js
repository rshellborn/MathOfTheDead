/* DESIGN OF DIFFICULTIES AND WAVES */

/* Easy difficulty which consists of 3 waves. */
var easy = {
	healthDiff: 5,
	queueDiff: 3,
	maxZero: 2,
	
	wave1: {
		numOfZombies: 3
	},
	
	wave2: {
		numOfZombies: 5
	},
	
	wave3: {
		numOfZombies: 7
	}
};

/* Medium difficulty which consists of 3 waves. */
var medium = {
	healthDiff: 10,
	queueDiff: 6,
	maxZero: 3,
	
	wave1: {
		numOfZombies: 10
	},
	
	wave2: {
		numOfZombies: 12
	},
	
	wave3: {
		numOfZombies: 14
	}
};

/* Hard difficulty which consists of 3 waves. */
var hard = {
	healthDiff: 15,
	queueDiff: 9,
	maxZero: 4,
	
	wave1: {
		numOfZombies: 20
	},
	
	wave2: {
		numOfZombies: 22
	},
	
	wave3: {
		numOfZombies: 24
	}
};

/* Insane difficulty which consists of 1 wave. */
var insane = {
	healthDiff: 20,
	queueDiff: 12,
	maxZero: 5,
	
	wave1: {
		numOfZombies: 30
	}
};

/* Infinity Mode difficulty. */
var infinity = {
	healthDiff: 12,
	queueDiff: 10,
	maxZero: 10,
	//maxSpeed,
	
	wave1: {
		numOfZombies: 5
	}
};