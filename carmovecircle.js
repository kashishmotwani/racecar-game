/* to be looped for the car to be appear to be moving */

// if the upper key is pressed
  if (inputHandler.up) {
    circle.y_velocity -= 0.5;
  }

  // if the left key is pressed
  if (inputHandler.left) {
    circle.x_velocity -= 0.5;
  }
  // if the right key is pressed
  if (inputHandler.right) {
    circle.x_velocity += 0.5;
  }
  // if the down key is pressed
  if (inputHandler.down) {
    circle.y_velocity += 0.5;
  }

  circle.x += circle.x_velocity;
  circle.y += circle.y_velocity;

  // friction: used to decrease the speed gradually
  // so it behaves like a real car 
  circle.x_velocity *= 0.9; 
  circle.y_velocity *= 0.9;

  // if circle is going off the left of the screen
  if (circle.x < -32) {
    circle.x = 1190;
// if circle goes past right boundary
  } else if (circle.x > 1190) {
    circle.x = -32;
// if circle goes past lower boundary
  } else if (circle.y > 790) {
    circle.y = 0;
// if circle goes past upper boundary
  } else if (circle.y < -32) {
    circle.y = 790;
  }
