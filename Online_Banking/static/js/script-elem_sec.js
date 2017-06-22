/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){

    $('li').removeClass("active");

});


function move_security() {
    var url = window.location.href;
    alert(url);

    if (url[3] === 'pagos') {
        location.href= "{% url 'registro-servicios' %}";
    }
    else if (url[3] === 'transf-otros-bancos') {
        location.href= "{% url 'consultar-prestamo' %}";
    }
    else if (url[3] === 'transf-mi-banco') {
        location.href= "{% url 'consultar-prestamo' %}";
    }
}