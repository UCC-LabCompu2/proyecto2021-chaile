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

    var pelotas = {
         radio: 20,
        dibujarpe: function (){
            ctx.beginPath();
            ctx.arc(x/4, y/2 , this.radio, 0,2*Math.PI);
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
            ctx.closePath()
        }

    };
    function dibujar(){
        palo.dibujarpa();
        pelotas.dibujarpe();
    }
    setInterval(dibujar,10);
}