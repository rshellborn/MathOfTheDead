function createSessionItem(key, value) {
	sessionStorage.setItem(key, value);
}

function getSessionItem(key) {
	return sessionStorage.getItem(key);
}

function removeSessionItem(key) {
	sessionStorage.removeItem(key);	
}

function clearSessionItems() {
	sessionStorage.clear();	
}