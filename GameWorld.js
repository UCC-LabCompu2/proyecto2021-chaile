const DELTA = 1 / 135; //porque quiero actualizar mucho (permite detectar la colision)

/**
 * Constructor de la clase GameWorld que representa el mundo del juego.
 * Inicializa las bolas, el palo y los bordes de la mesa.
 * @constructor
 */
function GameWorld() {
    //matriz
    this.balls = CONSTANTES.ballsParam.map(params => new Ball(...params));

    this.whiteBall = this.balls.find(ball => ball.color === COLOR.WHITE);

    this.stick = new Stick(
        new Vector2(413, 413),
        this.whiteBall.shoot.bind(this.whiteBall)
    );

    //bordes x e y de la mesa
    this.table = {
        TopY: 57,
        RightX: 1443,
        BottomY: 768,
        LeftX: 57
    }
}

/**
 * Maneja las colisiones entre las bolas y con los bordes de la mesa.
 */
GameWorld.prototype.handleCollisions = function () {

    //recorro la matriz
    for (let i = 0; i < this.balls.length; i++) {

        this.balls[i].handleBallInPocket();
        this.balls[i].collideWithTable(this.table);

        for (let j = i + 1; j < this.balls.length; j++) {
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];

            firstBall.collideWithBall(secondBall);
        }
    }
}

/**
 * Actualiza el estado del mundo del juego.
 */
GameWorld.prototype.update = function () {

    this.handleCollisions();

    this.stick.update();

    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].update(DELTA);
    }

    if (!this.ballMoving() && this.stick.shot) {
        this.stick.reposition(this.whiteBall.position);
    }

    // Verificar si la bola blanca ha entrado
    if (!this.whiteBall.visible) {
        window.alert("¡Fallaste!"); // Mostrar una alerta si la bola blanca ha entrado
        this.restartGame(); // Reiniciar el juego
    }

    // Verificar si todas las bolas (excepto la blanca) han entrado
    let allBallsInPocket = true;
    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].color !== COLOR.WHITE && this.balls[i].visible) {
            allBallsInPocket = false;
            break;
        }
    }
    if (allBallsInPocket) {
        window.alert("¡Ganaste!"); // Mostrar una alerta si todas las bolas (excepto la blanca) han entrado
        this.restartGame(); // Reiniciar el juego
    }
}

/**
 * Dibuja el mundo del juego en el lienzo.
 */
GameWorld.prototype.draw = function () {

    Canvas.drawImage(sprites.background, {x: 0, y: 0});

    for (let i = 0; i < this.balls.length; i++) {
        this.balls[i].draw();
    }

    this.stick.draw();
}

/**
 * Verifica si alguna bola se está moviendo en el mundo del juego.
 */
GameWorld.prototype.ballMoving = function () {
    let ballMoving = false;

    for (let i = 0; i < this.balls.length; i++) {
        if (this.balls[i].moving) {
            ballMoving = true;
            break;
        }
    }

    return ballMoving;
}

/**
 * Reinicia el juego restableciendo posiciones, visibilidad y estado del palo y las bolas.
 */
GameWorld.prototype.restartGame = function () {

    // Restablecer posiciones y visibilidad de todas las bolas
    for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        ball.position = ball.initialPosition.copy();
        ball.velocity = new Vector2();
        ball.moving = false;
        ball.visible = true;
    }

    // Reiniciar estado del palo
    this.stick.reset();
}
