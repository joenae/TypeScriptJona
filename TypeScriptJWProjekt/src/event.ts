// Tastatur
export let upArrowPressed: boolean = false;
export let downArrowPressed: boolean = false;
export let SPressed: boolean = false; 
export let WPressed: boolean = false; 


window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);


// Hier werden die Keys definiert 
export function keyDownHandler(event: KeyboardEvent) {
  switch (event.code) {
    // "up arrow" key
    case 'ArrowUp':
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 'ArrowDown':
      downArrowPressed = true;
      break;
       // "s" key
    case 'KeyS':
    SPressed = true;
       break;
     // "w" key
    case 'KeyW':
    WPressed = true;
       break;
  }
}

export function keyUpHandler(event: KeyboardEvent) {
  switch (event.code) {
    // "up arraow" key
    case 'ArrowUp':
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 'ArrowDown':
      downArrowPressed = false;
      break;
     // s key
     case 'KeyS':
      SPressed = false;
      break;
    // "w" key
    case 'KeyW':
      WPressed = false;
      break;
  }
}