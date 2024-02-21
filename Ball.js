const BALL_ORIGIN = new Vector2(25,25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER/2;

/**
 * Constructor de la clase Ball que representa una bola en el juego.
 * @constructor
 * @param {Vector2} position - La posición inicial de la bola.
 * @param {string} color - El color de la bola.
 */
function Ball(position, color) {
    this.initialPosition = position.copy(); // Almacena la posición inicial
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.color = color;
    this.visible = true;
}

/**
 * Actualiza la posición de la bola en función del tiempo delta.
 * @method update
 */
Ball.prototype.update = function (delta){

    if(!this.visible){
        return;
    }
    this.position.addTo(this.velocity.mult(delta));

    //aplicar friccion
    this.velocity = this.velocity.mult(0.983);

    if(this.velocity.length() < 5){
        this.velocity = new Vector2();
        this.moving = false;
    }
}

/**
 * Dibuja la bola en el lienzo.
 * @method draw
 */
Ball.prototype.draw = function (){
    if(!this.visible){
        return;
    }
    Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);

}

/**
 * Dispara la bola con una potencia y rotación dadas.
 * @method shoot
 */
Ball.prototype.shoot = function (power, rotation){

    this.velocity = new Vector2(power * Math.cos(rotation),power * Math.sin(rotation));
    this.moving = true;
}

//colision

/**
 * Maneja la colisión de la bola con otra bola.
 * @method collideWithBall
 */
Ball.prototype.collideWithBall = function (ball){

    if(!this.visible || !ball.visible){
        return;
    }

    //encontrar el vector normal
    const n = this.position.subtract(ball.position);

    //encontrar la distancia

    const dist = n.length();

    if(dist > BALL_DIAMETER){
        return;
    }

    //encontrar la distancia para no colisionar mas con la otra bola
    const mtd = n.mult((BALL_DIAMETER - dist) / dist);

    //empujar y separar
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.subtract(mtd.mult(1/2));

    //encontrar el vector unitario
    const un = n.mult(1/n.length());

    //encontrar la tangente del vector
    const  ut = new Vector2(-un.y, un.x);

    //velocidades del proyecto en los vectores normales y tangente
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    //buscar las nuevas velocidades
    let v1nTag = v2n;
    let v2nTag = v1n;

    //convertir las velocidades a escalar de la normal y la tangente en dos vectores
    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    //actualizar velocidades
    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;

}

/**
 * Maneja si la bola está en un bolsillo.
 * @method handleBallInPocket
 */
Ball.prototype.handleBallInPocket = function (){

    if(!this.visible){

        return;
    }

    let inPocket = CONSTANTES.pockets.some(pocket => {
        return this.position.distFrom(pocket) < CONSTANTES.pocketRadius;
    });

    if(!inPocket){

        return;
    }
    this.visible = false;
    this.moving = false;
}

/**
 * Maneja la colisión de la bola con los bordes de la mesa.
 * @method collideWithTable
 */
Ball.prototype.collideWithTable = function (table){
    if (!this.moving || !this.visible){
        return;
    }
    let collided = false;
    //colision borde arriba

    if(this.position.y <= table.TopY + BALL_RADIUS){
        this.position.y = table.TopY + BALL_RADIUS;
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    //colision borde derecho
    if(this.position.x >= table.RightX - BALL_RADIUS){
        this.position.x = table.RightX - BALL_RADIUS;
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    //colision borde abajo
    if(this.position.y >= table.BottomY - BALL_RADIUS){
        this.position.y = table.BottomY - BALL_RADIUS;
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    //colision borde izquierodo
    if(this.position.x <= table.LeftX + BALL_RADIUS){
        this.position.x = table.LeftX + BALL_RADIUS;
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    //disminuir la velocidad cuando colisionan

    if(collided){
        this.velocity = this.velocity.mult(0.95);
    }

}
