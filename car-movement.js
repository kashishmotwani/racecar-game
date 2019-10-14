var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 800;
context.canvas.width = 1200;
//document.body.style.backgroundImage = url("race-track.png");
//content.drawImage("red-car.png");
//document.getElementById("red-car").appendChild(elem);
rectangle = {
  height:20,
  width:20,
  //jumping: true,
  x:180, // center of the canvas
  x_velocity:0,
  y: 160,
  y_velocity:0,
  //dx: 0,
  //dx_velocity:0,
  //dy:0,
  //dy_velocity:0,
  //position: relative,

};

controller = {

  left: false,
  right: false,
  up: false,
  down: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
      case 40: //down key
        controller.down = key_state;

    }

  }

};

loop = function() {

  if (controller.up) {
    rectangle.y_velocity -= 0.5;
    //rectangle.x_velocity = 0
    //rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  if (controller.down) {
    rectangle.y_velocity += 0.5;
    //rectangle.jumping = true;
  }

  //rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  //rectangle.dx += rectangle.dx_velocity;
  //rectangle.dy += rectangle.dy_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction
  //rectangle.dx_velocity *= 0.9;// friction
  //rectangle.dy_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  /*if (rectangle.y > 180 - 16 - 32) {
    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32;
    rectangle.y_velocity = 0;

  }*/

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
  var blueprint_background = new Image();
  blueprint_background.src = "race-track.png"; 
  blueprint_background.onload = function(){
      var pattern = context.createPattern(this, "repeat");
      context.fillStyle = pattern;
      context.fill();
  };

  var redCar = new Image();
  redCar.src = "red-car.png"; 
  redCar.onload = function(){
      rectangle.fillStyle();
  }
  //context.fillStyle = "white";
  context.fillRect(0, 0, 1200, 800);// x, y, width, height
  context.fillStyle = "white";// hex for red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  //context.strokeStyle = "#202830";
  //scontext.lineWidth = 4;
  //context.beginPath();
  //context.moveTo(0, 164);
  //context.lineTo(320, 164);
  //context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener) //press down and it moves
window.addEventListener("keyup", controller.keyListener);  //lift finger and it stops
window.requestAnimationFrame(loop);