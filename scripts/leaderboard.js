// start of database talking 
$.ajax( { url: "https://api.mlab.com/api/1/databases/mathofthedead/collections/babysfirstdb?s={\"score\":-1}&apiKey=ArvUzWX9LKcVcKGcpfgPMVS62vXkF_Xu&f=" + JSON.stringify({"_id" : 0}),
type: "GET",
contentType: "application/json; charset=utf-8",
success: function(data, testStatus, jqXHR) {
	
	// payload
	var jsonObj = data;
	
	// top 7 loop
	for(var i = 0; i < 7; i++) {
		//current player
		var obj = jsonObj[i];
		
		//sets elements on page to player data
		document.getElementById("rank" + i).innerHTML = i + 1;
		document.getElementById("name" + i).innerHTML = obj.name;
		document.getElementById("wave" + i).innerHTML = obj.wave;
		document.getElementById("score" + i).innerHTML = obj.score;
	} 
},

error: function(jqXHR, testStatus, errorThrown) {
	alert("ERROR");
}
} );
// end of database talking 