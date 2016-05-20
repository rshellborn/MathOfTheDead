/* Creates a session variable. */
function createSessionItem(key, value) {
	sessionStorage.setItem(key, value);
}

/* Retrieves a session variable. */
function getSessionItem(key) {
	return sessionStorage.getItem(key);
}

/* Removes a specific session variable. */
function removeSessionItem(key) {
	sessionStorage.removeItem(key);	
}

/* Removes all session variables. */
function clearSessionItems() {
	sessionStorage.clear();	
}