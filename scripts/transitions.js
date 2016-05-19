$(document).ready(function(){
	console.log('working');
	$("body").animate({opacity: 1}, 1300);
});

function fadeEnd(url) {
	$("body").animate({opacity: 0, backgroundColor: '#000' }, 1300, function() {
		document.location.href = url;
	});
}