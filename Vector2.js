/**
 * Clase para representar un vector bidimensional en un espacio cartesiano.
 * @constructor
 * @param {number} [x=0] - La coordenada X del vector (opcional, por defecto es 0).
 * @param {number} [y=0] - La coordenada Y del vector (opcional, por defecto es 0).
 */

function Vector2(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.copy = function (){
    return new Vector2(this.x, this.y);
}

//para colisiones

Vector2.prototype.add = function (vector){
    return new Vector2(this.x + vector.x, this.y + vector.y);
}

Vector2.prototype.addTo = function (vector){
    this.x += vector.x;
    this.y += vector.y;
}

Vector2.prototype.subtract = function (vector){

    return new Vector2(this.x - vector.x, this.y - vector.y);
}

Vector2.prototype.mult = function (scalar){

    return new Vector2(this.x * scalar, this.y * scalar);
}

Vector2.prototype.dot = function (vector){
    return this.x * vector.x + this.y * vector.y;
}

//OBTENER LA LONGITUD DE UN VECTOR
Vector2.prototype.length = function (){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}

Vector2.prototype.distFrom = function (vector){
    return this.subtract(vector).length();
}