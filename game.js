/**
 * Clase principal del juego.
 * @constructor
 */
function Game (){

}

/**
 * Inicializa el juego creando el mundo del juego.
 */
Game.prototype.init = function (){

    this.gameWorld = new GameWorld();
}

/**
 * Inicia el bucle principal del juego.
 */
Game.prototype.start = function (){

    PoolGame.init();

    PoolGame.mainLoop();
}

/**
 * Bucle principal del juego que maneja la actualización y el renderizado del mundo del juego.
 */
Game.prototype.mainLoop = function (){

    Canvas.clear();
    PoolGame.gameWorld.update();
    PoolGame.gameWorld.draw();
    Mouse.reset();

    requestAnimationFrame(PoolGame.mainLoop);
}

// Instancia del juego
let PoolGame = new Game();
