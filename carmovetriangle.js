/* to be looped for the car to be appear to be moving */

// if the upper key is pressed
  if (controller.up) {
    triangle.y_velocity -= 0.5;
  }

  // if the left key is pressed
  if (controller.left) {
    triangle.x_velocity -= 0.5;
  }
  // if the right key is pressed
  if (controller.right) {
    triangle.x_velocity += 0.5;
  }
  // if the down key is pressed
  if (controller.down) {
    triangle.y_velocity += 0.5;
  }

  triangle.x += triangle.x_velocity;
  triangle.y += triangle.y_velocity;

  // friction: used to decrease the speed gradually
  // so it behaves like a real car 
  triangle.x_velocity *= 0.9;
  triangle.y_velocity *= 0.9;

  // if triangle is going off the left of the screen
  if (triangle.x < -32) {
    triangle.x = 1190;
// if triangle goes past right boundary
  } else if (triangle.x > 1190) {
    triangle.x = -32;
// if triangle goes past lower boundary
  } else if (triangle.y > 790) {
    triangle.y = 0;
// if triangle goes past upper boundary
  } else if (triangle.y < -32) {
    triangle.y = 790;
  }
