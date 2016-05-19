$(document).ready(function(){
	$("body").animate({opacity: 1}, 700);
});

function fadeEnd(url) {
	$("body").animate({opacity: 0, backgroundColor: '#000' }, 900, function() {
		document.location.href = url;
	});
}