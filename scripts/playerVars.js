function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
$(document).ready(function(){
var wave = getQueryVariable("wave");
var score = getQueryVariable("score");

document.getElementById("wave").textContent=("Wave " + wave);
document.getElementById("score").textContent=("Score: " + score);
});