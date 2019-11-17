var context, inputHandler, rectangle, loop, car;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 800;
context.canvas.width = 1200;

car = document.getElementById("car");

car.style.top = 75 + 'px';
car.style.left = 387 + 'px';

rectangle = {
  height:20,
  width:20,
  x:180, // location @ center of the canvas
  x_velocity:0,
  y: 160,
  y_velocity:0,
};

rectangle2 = {
  height:20,
  width:20,
  x:180, // location @ center of the canvas
  x_velocity:0,
  y: 130,
  y_velocity:0,
};

rectangle3 = {
  height:20,
  width:20,
  x:180,        // location @ center of the canvas; x-axis
  x_velocity:0, // speed; x-axis
  y: 100,       // location @ center of the canvas; y-axis
  y_velocity:0, // speed; x-axis
};

inputHandler = {

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

loop = function() {
  
  if (inputHandler.up) {
    rectangle.y_velocity -= 0.5;
  }

  if (inputHandler.left) {
    rectangle.x_velocity -= 0.5;
  }

  if (inputHandler.right) {
    rectangle.x_velocity += 0.5;
  }

  if (inputHandler.down) {
    rectangle.y_velocity += 0.5;
  }
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction
  //console.log("x is " + rectangle.x)
  //console.log("y is " + rectangle.y)

  // Car boundaries
  // x-axis -> horizontal, y-axis -> vertical
  //40 -> y top of race track
  //714.9 -> y bottom of race track
  //180  -> x left most section of the track
  //959.9 -> 867 px-> x right most section of the track
  //340 -> y bottom of the upper part of the track
  //460 -> x upper of the bottom part of the track
  //725/719.5 -> x at the curve in the middle of the track connecting the bottom part with the top part
  //955 -> x end of the 
  // boundaries
  if (rectangle.x <= 170) {
    rectangle.x_velocity = 0
    rectangle.x = 170
  } else if (rectangle.x >= 959.9) {
    rectangle.x_velocity = 0
    rectangle.x = 959.9
  }
  //else if (rectangle.x >= 959.9) {
    //rectangle.x_velocity = -rectangle.x_velocity
   else if (rectangle.y < 40) {
    rectangle.y_velocity = 0
    rectangle.y = 40
  } else if (rectangle.y >= 714.9){
    rectangle.y_velocity = 0
    rectangle.y = 714.9}
    /* you can leave the middle part with rectangle.x_velocity = -rectangle.x_velocity and make it as the hard part
    where the speed of the car decreases and all?
  } else if (rectangle.y >= 340) { //the rest
    rectangle.y_velocity = 0
    rectangle.y = 340
  } else if (rectangle.y >= 460) {
    rectangle.y_velocity = 0
    rectangle.y = 460
  } else if  (rectangle.y >= 340 && rectangle.x >= 180) {
    rectangle.y_velocity = 0
    rectangle.y = rectangle.y
    rectangle.x = rectangle.x 
    //rectangle.x = 180
  }else if (rectangle.y >= 340 && rectangle.y <= 460 && rectangle.x >= 180 && rectangle.x <= 719.5) {
    rectangle.y_velocity = 0
    rectangle.x_velocity = 0
    //rectangle.x = 719.5
  }*/
  //else if (rectangle.y >= 714.9) {
    //rectangle.y_velocity = -rectangle.y_velocity
  



  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {
    rectangle.x = 1190;
// if rectangle goes past right boundary
  } else if (rectangle.x > 1190) {
    rectangle.x = -32;
// if rectangle goes past lower boundary
  } else if (rectangle.y > 790) {
    rectangle.y = 0;
// if rectangle goes past upper boundary
  } else if (rectangle.y < -32) {
    rectangle.y = 790;
  }
  
  //src:https://stackoverflow.com/questions/10791610/javascript-html5-using-image-to-fill-canvas
  //var background = document.getElementById("background");
  var background = new Image();
  background.src = "race-track.png"; 
  background.onload = function(){
      var pattern = context.createPattern(this, "repeat");
      context.fillStyle = pattern;
      context.fill();
  };

  context.fillRect(0, 0, 1200, 800);// x, y, width, height
  context.fillStyle = "white";
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  
  context.beginPath();
  context.rect(rectangle2.x, rectangle2.y, rectangle2.width, rectangle2.height);
  context.fill();
  
  context.beginPath();
  context.rect(rectangle3.x, rectangle3.y, rectangle3.width, rectangle3.height);
  context.fill();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

loop2 = function() {
  if (inputHandler.up) {
    car.style.top = (car.offsetTop -= 7) + 'px';
    direction = document.getElementById("car").style.transform = "rotate(270deg)"
  }

  if (inputHandler.left) {
    car.style.left = (car.offsetLeft -= 7) + 'px';
    direction = document.getElementById("car").style.transform = "rotate(180deg)"
  }

  if (inputHandler.right) {
    car.style.left = (car.offsetLeft += 7) + 'px';
    direction = document.getElementById("car").style.transform = "rotate(0deg)"

  }

  if (inputHandler.down) {
    car.style.top = (car.offsetTop += 7) + 'px';
    direction = document.getElementById("car").style.transform = "rotate(90deg)"
  }
  car.style.left += (car.style.left) + 'px';
  car.style.top += (car.style.top) + 'px';
  console.log("left is " + car.style.left)
  console.log("top is " + car.style.top)
  console.log("x is " + rectangle.x)
  console.log("y is " + rectangle.y)

  var background = new Image();
  background.src = "race-track.png"; 
  background.onload = function(){
      var pattern = context.createPattern(this, "repeat");
      context.fillStyle = pattern;
      context.fill();
  };
  context.fillRect(0, 0, 1200, 800);// x, y, width, height
  context.fillStyle = "black";
  window.requestAnimationFrame(loop2);
}
window.addEventListener("keydown", inputHandler.keyListener) //press down and it moves
window.addEventListener("keyup", inputHandler.keyListener);  //lift finger and it stops
//window.requestAnimationFrame(loop)
window.requestAnimationFrame(loop2);