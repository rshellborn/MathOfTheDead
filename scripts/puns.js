var puns = [];

var randomNum = Math.floor((Math.random() * 23) + 0);
		
puns[0] = "Q: Why do they never serve beer at a math party? A: Because you can't drink and derive...";
puns[1] = "Q: Why didn't the quarter roll down the hill with the nickel? A: Because it had more cents. ";
puns[2] = "Q: What happened to the plant in math class? A: It grew square roots. ";
puns[3] = "Q: How do you make seven an even number? A: Take the s out! ";
puns[4] = "Q: What do organic mathematicians throw into their fireplaces? A: Natural Logs.";
puns[5] = "Q: Why wasn't the geometry teacher at school? A: Because she sprained her angle!!";
puns[6] = "MATH stands for Mental Abuse To Humans.";
puns[7] = "Teacher: Why are you doing your multiplication on the floor? Student: You told me not to use tables. ";
puns[8] = "Dear Math, I am not a Therapist... Solve your own problems! ";
puns[9] = "Q: What did one math book say to the other? A: Don't bother me I've got my own problems! ";
puns[10] = "Q: Why dont people put the numbers 2,3, and 0 together? A: Because they are two turdy. ";
puns[11] = "Q: What did 2 say to 4 after 2 beat him in a race? A: 2 Fast 4 U! ";
puns[12] = "Q: What did Al Gore play on his guitar? A: An algorithm! ";
puns[13] = "Q: How does a mathematician induce good behavior in her children? A: `I've told you n times, I've told you n+1 times...' ";
puns[14] = "Q: Why did the two 4's skip lunch? A: They already 8 (ate)! ";
puns[15] = "Q: What do you get if you cross a math teacher with a crab? A: Snappy answers. ";
puns[16] = "Q: Why did the mutually exclusive events break up? A: They had nothing in common. ";
puns[17] = "Q: What did the mathematician say when he finished his christmas dinner? A: root -1/ root 64 (I over 8) ";
puns[18] = "Q: Why is 6 afraid of 7? A: Because 7 8 9 ";
puns[19] = "Q: What do you call a number that can't keep still? A: A roamin' numeral. ";
puns[21] = "Q: Where do math teachers go on vacation? A: To Times Square.";
puns[22] = "Q: Why did I divide sin by tan? A: Just cos. ";
puns[23] = "Q: Why don't you do arithmetic in the jungle? A: Because if you add 4+4 you get ate! ";

$(document).ready(function(){

var randomPun = puns[randomNum];
document.getElementById("pun").innerHTML = randomPun;
});