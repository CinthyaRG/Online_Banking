/**
 * Created by Cinthya C. Ramos G. on 20/7/2017.
*/

$(document).ready(function (){
    tourStart();
});



/** 
    Función tour, se encarga de cargas los mensajes y los id's correspondientes
    a dichos mensajes que muestran la funcionalidad de la aplicación al iniciar
    sesión por primera vez el ususario.

    Parámetros:
        no recibe parḿetros.
*/
function tour() {
    var tour = {
        id: "hello-hopscotch",
        i18n: {
            nextBtn: "Siguiente",
            prevBtn: "Anterior",
            doneBtn: "Listo",
            skipBtn: "Omitir",
            closeTooltip: "Cerrar"
        },
        steps: [
            {
                title: "Bienvenido",
                content: "Con el siguiente tour le mostraremos \
                las operaciones que puede realizar con Actio Capital.",
                target: document.querySelector(".logo-lg"),
                placement: "right"
            },
            {
                title: "",
                content: "Aquí podrá observar la última vez que inicio sesión \
                en la aplicación. Al ser su primera vez no muestra ninguna.",
                target: document.querySelector(".navbar-custom-menu p"),
                placement: "left"
            },
            {
                title: "Gráfico",
                content: "Este es un gráfico que muestra los balances mensuales \
                de sus activos y pasivos.",
                target: document.querySelector("#graph"),
                placement: "bottom",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Consolidado de Activos",
                content: "En esta tabla puede observar el estado y saldo disponible \
                de cada una de sus cuentas.",
                target: document.querySelector("#assets"),
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Consolidado de Pasivos",
                content: "En esta tabla puede observar el saldo, fecha de pago, y \
                datos de sus préstamos y tarjetas de crédito.",
                target: document.querySelector("#liabilities"),
                placement: "top",
                xOffset: 'center',
                arrowOffset: 'center'
            },
            {
                title: "Consultas",
                content: "Presionando aquí puede consultar sus cuentas, tarjetas de \
                crédito y préstamos.",
                target: document.querySelector("#inquiries"),
                placement: "right"
            },
            {
                title: "Transferencias",
                content: "Presionando aquí puede realizar transferencias entre sus cuentas \
                a sus afiliados del mismo banco u otros bancos.",
                target: document.querySelector("#transfers"),
                placement: "right"
            },
            {
                title: "Pagos",
                content: "Presionando aquí puede realizar pagos a sus tarjetas de crédito, \
                préstamos, y cualquiera se los servicios que tenga afiliado.",
                target: document.querySelector("#payments"),
                placement: "right"
            },
            {
                title: "Solicitudes en Línea",
                content: "Presionando aquí puede realizar solicitudes de citas, referencias \
                bancarias, chequeras y generar su tarjeta de seguridad.",
                target: document.querySelector("#request"),
                placement: "right"
            },
            {
                title: "Gestión de Productos",
                content: "Presionando aquí puede activar o bloquear los productos que posee \
                con el banco.",
                target: document.querySelector("#management"),
                placement: "right"
            },
            {
                title: "Perfil de Seguridad",
                content: "Presionando aquí puede ver sus datos y modificar sus preguntas de \
                seguridad y contraseña para ingresar a la aplicación.",
                target: document.querySelector("#profile"),
                placement: "right"
            },
            {
                title: "Ayuda en Línea",
                content: "Presionando aquí puede consultar las preguntas frecuentes de las \
                operaciones a realizar con la aplicación.",
                target: document.querySelector("#help"),
                placement: "right"
            },
            {
                title: "Cerrar Sesión",
                content: "Presionando aquí puede salir de la aplicación.",
                target: document.querySelector("#logout"),
                placement: "right"
            }
        ],
        showPrevButton: true
    };

    // Start the tour!
    hopscotch.startTour(tour);
}



/** 
    Función tourStart, se encarga de verificar si es la primera vez 
    que el usuario inicia sesión en la aplicación para así poder 
    ejecutar el tour inicio.

    Parámetros:
        no recibe parámetros.

*/
function tourStart() {
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/first-login/";
    var customer = path[4];

    $.ajax({
        url: url,
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        data: {
            customer: customer
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.user_exists) {
                if (data.login) {
                    var url = document.referrer.split('/');
                    if(url[3] === ''){
                        tour();
                    }
                }
            }
            else {
                location.href= path[0]+"/"+path[1]+"/"+path[2]+"/logout";
            }
        },
        error: function (data) {
            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
        }
    });
}