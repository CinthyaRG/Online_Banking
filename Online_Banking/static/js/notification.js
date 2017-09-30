/**
 * Created by Cinthya C. Ramos G. on 7/8/2017.
 */

var stack = {
    "dir1": "down",
    "dir2": "left",
    "firstpos2": 10,
    "firstpos1": 80,
    "push": "top"
};


/**
    Función notification_success, se encarga de mostrar un mensaje
    emergente exitoso.

    Parámetros:
        msg: mensaje a ser mostrado en la notificación.

*/
function notification_success(msg) {
    $(function(){
        new PNotify({
            text:msg,
            buttons: {
                closer: false,
                sticker: false
            },
            styling: 'bootstrap3',
            type: 'success',
            stack: stack,
            animate_speed: 'normal',
            delay: 2200
        });
    });
}


/**
    Función notification_error, se encarga de mostrar un mensaje
    emergente de error.

    Parámetros:
        msg: mensaje a ser mostrado en la notificación.

*/
function notification_error(msg) {
    $(function(){
        new PNotify({
            text:msg,
            buttons: {
                closer: false,
                sticker: false
            },
            styling: 'bootstrap3',
            type: 'error',
            stack: stack,
            animate_speed: 'normal',
            delay: 2200
        });
    });
}