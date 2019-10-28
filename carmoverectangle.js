/* to be looped for the car to be appear to be moving */

// if the upper key is pressed
  if (controller.up) {
    rectangle.y_velocity -= 0.5;
  }

  // if the left key is pressed
  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }
  // if the right key is pressed
  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }
  // if the down key is pressed
  if (controller.down) {
    rectangle.y_velocity += 0.5;
  }

  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;

  // friction: used to decrease the speed gradually
  // so it behaves like a real car 
  rectangle.x_velocity *= 0.9;
  rectangle.y_velocity *= 0.9;

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
