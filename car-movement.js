var context, inputHandler, loop, car;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 800;
context.canvas.width = 1200;

car = document.getElementById("car");

car.style.top = 75 + 'px'; // location of the car on the canvas
car.style.left = 387 + 'px'; // location of the car on the canvas

inputHandler = {
  // handles the controls of the arrow keys

  left: false,
  right: false,
  up: false,
  down: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:  // left key
        inputHandler.left = key_state;
      break;
      case 38:  // up key
        inputHandler.up = key_state;
      break;
      case 39:  // right key
        inputHandler.right = key_state;
      break;
      case 40: // down key
        inputHandler.down = key_state;

    }

  }

};

  // Car boundaries - IMPLEMENTED BUT NOT WORKING AS INTENDED

  // x-axis -> horizontal, y-axis -> vertical
  //40 -> y top of race track
  //714.9 -> y bottom of race track
  //180  -> x left most section of the track
  //959.9 -> 867 px-> x right most section of the track
  //340 -> y bottom of the upper part of the track
  //460 -> x upper of the bottom part of the track

  // boundaries
  /*if((car1.style.top < (46) + 'px') && (car1.style.left < (177) + 'px'))  {
    car1.style.left = (177) + 'px';
    car1.style.top = (46) + 'px';
  }
  else if(car1.style.left > (961) + 'px' && car1.style.top < (46) + 'px')  {
    car1.style.left = (961) + 'px';
    car1.style.top = (46) + 'px';
  }
  else if(car1.style.left > (961) + 'px' && car1.style.top > (718) + 'px')  {
    car1.style.left = (961) + 'px';
    car1.style.top = (718) + 'px';
  }
  else if(car1.style.left < (177) + 'px' && car1.style.top > (718) + 'px')  {
    car1.style.left = (177) + 'px';
    car1.style.top = (718) + 'px';
    
  if(car1.style.top <= (46) + 'px')  { //working
    car1.style.top = (46) + 'px';
  }
  else if(car1.style.left < (177) + 'px')  {
    car1.style.left = (177) + 'px';
  }
  else if(car1.style.top > (718) + 'px' && car1.style.left)  {
    car1.style.top = (718) + 'px';
  }
  else if(car1.style.left > (961) + 'px')  {
    car1.style.left = (961) + 'px';
  }*/

loop = function() {
  // the function loop requests the browser to update the animation with every movement of the car
  if (inputHandler.up) {
    car.style.top = (car.offsetTop -= 7) + 'px';
    // rotation of car
    direction = document.getElementById("car").style.transform = "rotate(270deg)"
  }

  if (inputHandler.left) {
    car.style.left = (car.offsetLeft -= 7) + 'px';
    // rotation of car
    direction = document.getElementById("car").style.transform = "rotate(180deg)"
  }

  if (inputHandler.right) {
    car.style.left = (car.offsetLeft += 7) + 'px';
    // rotation of car
    direction = document.getElementById("car").style.transform = "rotate(0deg)"

  }

  if (inputHandler.down) {
    car.style.top = (car.offsetTop += 7) + 'px';
    // rotation of car
    direction = document.getElementById("car").style.transform = "rotate(90deg)"
  }
  car.style.left += (car.style.left) + 'px';
  car.style.top += (car.style.top) + 'px';

  var background = new Image();
  background.src = "race-track.png"; 
  background.onload = function(){
      var pattern = context.createPattern(this, "repeat");
      context.fillStyle = pattern;
      context.fill();
  };
  context.fillRect(0, 0, 1200, 800);// x, y, width, height
  context.fillStyle = "black";
  window.requestAnimationFrame(loop);
}
window.addEventListener("keydown", inputHandler.keyListener) //press down and it moves
window.addEventListener("keyup", inputHandler.keyListener);  //lift finger and it stops
window.requestAnimationFrame(loop);
