/**
 * Created by Cinthya C. Ramos G. on 8/6/2017.
*/


/** 
    Función parpadear, se encarga de que en la pantalla de inicio
    el icono de alerta parpadee.

    Parámetros:
        no recibe parámetros.

*/
$(document).ready(parpadear);
function parpadear(){
    $('#icon').fadeIn(500).delay(250).fadeOut(500, parpadear)
}
