var score = 0
var position = document.getElementById('position').value;
   
function scoreboard() 
{
  if (position == 1) {   score += 3  } 
  if (position == 2) {  score += 2  } 
  if (position == 3) {   score += 1  } 
}