/**
 * Carga imágenes de forma asíncrona y ejecuta una función de devolución de llamada una vez que todas las imágenes estén cargadas.
 */

let sprites = {};
let assetsStillLoading = 0;

/**
 * Bucle de carga que se ejecuta hasta que todas las imágenes estén cargadas.
 * @method assetsLoadingLoop
 * @param {Function} callback - Función de devolución de llamada una vez que todas las imágenes están cargadas.
 * @return {void}
 */
function assetsLoadingLoop(callback) {
    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        callback();
    }
}

/**
 * Función principal para cargar assets (imágenes) de forma asíncrona.
 * @method loadAssets
 * @param {Function} callback - Función de devolución de llamada una vez que todas las imágenes están cargadas.
 * @return {void}
 */
function loadAssets(callback) {

    /**
     * Carga una imagen sprite de forma asíncrona.
     * @method loadSprite
     * @param {string} fileName - El nombre del archivo de la imagen sprite.
     * @returns {HTMLImageElement} - La imagen sprite cargada.
     */
    function loadSprite(fileName) {
        assetsStillLoading++;
        let spriteImage = new Image();
        spriteImage.src = "/imagenes/" + fileName;
        spriteImage.onload = function () {
            assetsStillLoading--;
        }
        return spriteImage;
    }

    sprites.background = loadSprite('mesa2.png');
    sprites.stick = loadSprite('spr_stick.png');
    sprites.whiteBall = loadSprite('spr_ball2.png');
    sprites.redBall = loadSprite('spr_redBall2.png');
    sprites.blackBall = loadSprite('spr_blackBall2.png');
    sprites.yellowBall = loadSprite('spr_yellowBall2.png');

    assetsLoadingLoop(callback);
}

/**
 * Función auxiliar que devuelve la imagen de bola correspondiente según el color proporcionado.
 * @method getBallSpriteByColor
 * @param {string} color - El color de la bola ('RED', 'YELLOW', 'WHITE').
 * @returns {HTMLImageElement} - La imagen de la bola correspondiente al color.
 */
function getBallSpriteByColor(color) {
    switch (color) {
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.YELLOW:
            return sprites.yellowBall;
        case COLOR.WHITE:
            return sprites.whiteBall;
    }
}
