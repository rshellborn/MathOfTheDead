$(document).ready(function(){
	$("body").animate({opacity: 1}, 400);
});

function fadeEnd(url) {
	$("body").animate({opacity: 0, backgroundColor: '#000' }, 400, function() {
		document.location.href = url;
	});
}