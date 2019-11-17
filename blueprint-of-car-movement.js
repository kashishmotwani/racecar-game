var context, inputHandler, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 800;
context.canvas.width = 1200;

rectangle = {
  height:20, 
  width:20,
  x:180, // initial location of one of the players
  x_velocity:0,
  y: 160,
  y_velocity:0,
};


loop = function() {

  
  //src:https://stackoverflow.com/questions/10791610/javascript-html5-using-image-to-fill-canvas
  var blueprint_background = new Image();
  blueprint_background.src = "race-track.png"; 
  blueprint_background.onload = function(){
      var pattern = context.createPattern(this, "repeat");
      context.fillStyle = pattern;
      context.fill();
  };

  //var redCar = new Image();
  //redCar.src = "red-car.png"; 
  //redCar.onload = function(){
  //    rectangle.fillStyle();
  //}
  context.fillRect(0, 0, 1200, 800);// x, y, width, height
  context.fillStyle = "white";
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", inputHandler.keyListener) //press down and it moves
window.addEventListener("keyup", inputHandler.keyListener);  //lift finger and it stops
window.requestAnimationFrame(loop);
