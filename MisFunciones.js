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