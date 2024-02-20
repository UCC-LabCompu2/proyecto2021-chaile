<!-- cargar imágenes de forma asíncrona y ejecutar una función de devolución de llamada una vez que todas las imágenes estén cargadas. -->

// Objeto para almacenar las imágenes cargadas
let sprites = {};

// Variable para llevar el seguimiento de cuántas imágenes aún se están cargando
let assetsStillLoading = 0;


// Bucle de carga que se ejecuta hasta que todas las imágenes estén cargadas
function assetsLoadingLoop(callback) {
    // Verifica si todavía hay imágenes cargando
    if (assetsStillLoading) {
        // Si sí, utiliza requestAnimationFrame para llamar a sí misma en el próximo fotograma de animación
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    } else {
        // Cuando todas las imágenes han sido cargadas, llama a la función de devolución de llamada proporcionada
        callback();
    }
}

// Función principal para cargar assets (imágenes) de forma asíncrona
function loadAssets(callback) {

    // Función interna para cargar una imagen específica
    function loadSprite(fileName) {
        // Incrementa el contador de imágenes aún cargando
        assetsStillLoading++;

        // Crea una nueva instancia de la clase Image para la imagen
        let spriteImage = new Image();

        // Establece la ruta de la imagen
        spriteImage.src = "/imagenes/" + fileName;

        // Configura el evento onload para la imagen
        spriteImage.onload = function () {
            // Decrementa el contador de imágenes aún cargando cuando la imagen se carga exitosamente
            assetsStillLoading--;
        }

        // Devuelve la imagen cargada
        return spriteImage;
    }

    sprites.background = loadSprite('mesa2.png');
    sprites.stick = loadSprite('spr_stick.png');
    sprites.whiteBall = loadSprite('spr_ball2.png');
    sprites.redBall = loadSprite('spr_redBall2.png');
    sprites.blackBall = loadSprite('spr_blackBall2.png');
    sprites.yellowBall = loadSprite('spr_yellowBall2.png');

    // Inicia el bucle de carga asincrónica
    assetsLoadingLoop(callback);
}

//FUNCION AXULIAR QUE AYUDARA A DEVOLVER LOS COLORES

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