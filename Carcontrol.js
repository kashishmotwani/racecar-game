/* the controls of the car */

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