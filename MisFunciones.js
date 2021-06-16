/**
 * Pasaje de parametros
 * @method datos
 * @return
 */

function datos(){
    var nombr, urlcomp;

    nombr= document.getElementById("Nombre").value;

    urlcomp = "Puntajes.html#" + nombr + "#";
    window.open(urlcomp);
}
function resultado(){
    var urlcomp, nom;
    urlcomp = window.location.href.split("/")[4];

    nom = urlcomp.split("#")[1];
    console.log(urlcomp);

    document.getElementById("nombre1").value = nom;
}
//canvas
/**
 * proceso de juego;
 * @method datos
 * @return
 */

function Dibujarpelota(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext ("2d");

    var x=canvas.width;
    var y= canvas.height;
    var dx=2;
    var dy=-2;

    var pelotas = {
         radio: 20,
        dibujarpe: function (){
            ctx.beginPath();
            ctx.arc(x-250, y/2 , this.radio, 0,2*Math.PI);
            ctx.fillStyle = "#000000";
            ctx.fill ();
            ctx.closePath();

        }
    };


    var palo= {
        ancho: 200,
        alto: 10,
        posx: (canvas.width-200),
        margen: 5,
        dibujarpa: function (){
            ctx.beginPath();
            ctx.fillRect(this.posx, 480/2, this.ancho, this.alto);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

    };

    function deteccolision (){
        if(x>palo.x && x<palo.x+palo.alto) {
            //rebortarizquierda y derecha
            if(x+dx<pelotas.radio  || x+dx>canvas.width-pelotas.radio){
                dx=-dx;
            }

            //rebotar arriba y abajo
            if(y+dy<pelotas.radio){
                dy=-dy;
            }
            x+=dx;
            y+=dy;
        }

    }


    var derPresionado= false;
    var izqPresionado= false;
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
        var relativax =e.clientX - canvas.offsetLeft;
        if(relativax>0 && relativax<canvas.width){
            palo.posx =  relativax - palo.ancho/2;

        }
    }
    function dibujar(){
        canvas.width = canvas.width;


        //mover derecha o izquierda
        if(derPresionado && palo.posx<canvas.width-palo.ancho){
            palo.posx+=7;

        }else if(izqPresionado && palo.posx>0){
            palo.posX-=7;
        }

        palo.dibujarpa();
        pelotas.dibujarpe();
        deteccolision ()



    }

    setInterval(dibujar,10);
}