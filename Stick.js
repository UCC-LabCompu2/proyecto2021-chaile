const STICK_ORIGEN = new Vector2(970, 11);
const STICK_SHOT_ORIGIN = new Vector2(950, 11);
const MAX_POWER = 7500;

/**
 * Constructor de la clase Stick que representa el palo en el juego.
 * @constructor
 * @param {Vector2} position - La posición inicial del palo.
 * @param {Function} onShoot - La función de devolución de llamada para el disparo.
 */
function Stick(position, onShoot) {
    this.position = position;
    this.rotation = 0;
    this.origin = STICK_ORIGEN.copy();
    this.power = 0; //potencia
    this.onShoot = onShoot; //disparo
    this.shot = false;
}

/**
 * Actualiza el estado del palo.
 * @method update
 */
Stick.prototype.update = function (){

    if(this.shot){
        return;
    }
    if(Mouse.left.down){
        this.increasePower();
    }
    else if(this.power > 0){
        this.shoot();
    }

    this.updateRotation();
}

/**
 * Dibuja el palo en el lienzo.
 * @method draw
 */
Stick.prototype.draw = function (){
    Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation)
}

/**
 * Actualiza la rotación del palo en función de la posición del mouse.
 * @method updateRotation
 */
Stick.prototype.updateRotation = function (){
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;

    this.rotation = Math.atan2(opposite, adjacent);
}

/**
 * Incrementa la potencia del disparo.
 * @method increasePower
 */
Stick.prototype.increasePower = function (){

    if (this.power > MAX_POWER){
        return;
    }
    this.power += 120;
    this.origin.x +=5;
}

/**
 * Realiza el disparo del palo.
 * @method shoot
 */
Stick.prototype.shoot = function (){
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = STICK_SHOT_ORIGIN.copy();
    this.shot = true;
}

/**
 * Reposiciona el palo después de un disparo.
 * @method reposition
 */
Stick.prototype.reposition = function (position){

    this.position = position.copy();
    this.origin = STICK_ORIGEN.copy();
    this.shot = false;
}

/**
 * Reinicia el estado del palo.
 * @method reset
 */
Stick.prototype.reset = function() {
    this.rotation = 0;
    this.origin = STICK_ORIGEN.copy();
    this.power = 0;
    this.shot = false;
    this.position = new Vector2(413, 413); // Restablecer la posición del palo
}
