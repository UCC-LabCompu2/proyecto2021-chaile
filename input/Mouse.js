/**
 * Maneja el evento de movimiento del mouse.
 * @param {MouseEvent} evt - El evento de movimiento del mouse.
 * @return {void}
 */
function handleMouseMove(evt) {

    let x = evt.pageX;
    let y = evt.pageY;

    Mouse.position = new Vector2(x,y);
}

/**
 * Maneja el evento de presión del botón del mouse.
 * @param {MouseEvent} evt - El evento de presión del botón del mouse.
 * @return {void}
 */
function handleMouseDown(evt){

    handleMouseMove(evt);

    if (evt.which === 1) {
        if (!Mouse.left.down)
            Mouse.left.pressed = true;
        Mouse.left.down = true;
    } else if (evt.which === 2) {
        if (!Mouse.middle.down)
            Mouse.middle.pressed = true;
        Mouse.middle.down = true;
    } else if (evt.which === 3) {
        if (!Mouse.right.down)
            Mouse.right.pressed = true;
        Mouse.right.down = true;
    }
}

/**
 * Maneja el evento de liberación del botón del mouse.
 * @param {MouseEvent} evt - El evento de liberación del botón del mouse.
 * @return {void}
 */
function handleMouseUp(evt) {
    handleMouseMove(evt);

    if (evt.which === 1)
        Mouse.left.down = false;
    else if (evt.which === 2)
        Mouse.middle.down = false;
    else if (evt.which === 3)
        Mouse.right.down = false;

}

/**
 * Constructor de la clase MouseHandler que maneja los eventos del mouse.
 * @constructor
 */
function MouseHandler() {
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();

    this.position = new Vector2();

    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

/**
 * Reinicia el estado de los botones del mouse.
 * @method reset
 */
MouseHandler.prototype.reset = function (){

    this.left.pressed = false;
    this.middle.pressed = false;
    this.right.pressed = false;
}

/**
 * Instancia de MouseHandler que maneja los eventos del mouse.
 * }
 */
let Mouse = new MouseHandler();
