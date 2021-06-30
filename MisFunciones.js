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

var bandera;
var banderacontinuar=false;
function Dibujarpelota(event){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext ("2d");
    var posX = event.clientX;
    var posY = event.clientY;
    console.log(posX,posY);
    canvas.onmousedown = function () {bandera =true};
    canvas.onmouseup = function () {bandera = false};
    if (bandera && banderacontinuar == false){
        palo.posinicialx=event.clientX;
        palo.posinicialy=event.clientY;
        banderacontinuar=true;
    }
    else if(bandera && banderacontinuar == true){
        palo.posfinalx=event.clientX;
        palo.posfinaly=event.clientY;
    }
    else if (!bandera){
        banderacontinuar=false;
    }
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
        posinicialx:0,
        posinicialy:0,
        posfinalx:20,
        posfinaly:20,
        dibujarpa: function (){
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#63007f";
            ctx.moveTo(this.posinicialx,this.posinicialy);
            ctx.lineTo(this.posfinalx, this.posfinaly);
            ctx.stroke();
            ctx.closePath();
        }

    };

    function deteccolision (){
        if(x>palo.x && x<palo.x+palo.alto && x>palo.y && x<palo.y+palo.alto ) {
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

        palo.dibujarpa();
        pelotas.dibujarpe();
        deteccolision ()



    }

    setInterval(dibujar,10);
}