/*
	Makes the page fade in when it is loaded.
*/
$(document).ready(function(){
	$("body").animate({opacity: 1}, 400);
});

/*
	Makes the page fade out and then sent to another page.
*/
function fadeEnd(url) {
	$("body").animate({opacity: 0, backgroundColor: '#000' }, 400, function() {
		document.location.href = url;
	});
}