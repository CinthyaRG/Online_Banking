/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    style_pag();
    drop_years();
    help_tooltip();
    pass_strength();
});

$(document).on('focusout', function (e) {
    $(".counter").css({display: "none"});
    e.preventDefault();
});

function style_pag() {
    $('#step2').css({display: "none"});
    $('#step3').css({display: "none"});
    $('#step4').css({display: "none"});
    $('#step5').css({display: "none"});
}

function drop_years(){
    var today = new Date().toJSON().slice(0,10);
    var year = parseInt(today.slice(2,4));
    var maxYear = year +10;
    $("#year").append('<option value="'+year+'" selected="selected"> '+year+'</option>');
    year = year + 1;
    while (year < maxYear) {
        $("#year").append('<option value="'+year+'"> '+year+'</option>');
        year = year + 1;
    }
    selectMonth();
}

function selectMonth(){
    var year = $('#year').val();
    var today = new Date().toJSON().slice(0,10);
    console.log(today);
    var month;
    if (year === "17") {
        month = parseInt(today.slice(5,7));
    }
    else {
        month = parseInt('01');
    }
    $("#month").empty();
    while (month < 13) {
        if  (month < 10) {
            month = ("0"+month);
        }
        $("#month").append('<option value="'+month+'"> '+month+'</option>');
        month = parseInt(month);
        month = month + 1;
    }
}

function counter_down() {
	var clock = $('.clock').FlipClock(120, {
		countdown: true,
		clockFace: 'MinuteCounter'
	});
}

function count_circle() {
    $('.clock').TimeCircles({count_past_zero: false});
}

function restore_count_circle() {
    $('.clock').TimeCircles().destroy();
    $('.clock').TimeCircles({count_past_zero: false});
}

function calcula(time, time2) {
    var minutos;
    var segundos;
    var id = "clock";

    var diferencia=(time2.getTime()-time.getTime())/1000;
    var dias=Math.floor(diferencia/86400);
    diferencia=diferencia-(86400*dias);
    var horas=Math.floor(diferencia/3600);
    diferencia=diferencia-(3600*horas);
    minutos=Math.floor(diferencia/60);
    diferencia=diferencia-(60*minutos);
    segundos=Math.floor(diferencia);

    document.getElementById(id).innerText = 'Quedan ' + minutos + ' Minutos, ' + segundos + ' Segundos';

    if (minutos > 0 || segundos > 0) {
        var count = new Date();
        console.log("dentro if");
        console.log(count);
        console.log(time);
        setTimeout("calcula(time,count)",1000);
    }
}

function pagNext(numPag) {
    var next = numPag +1;
    var step = '#step';
    var number = '#number';
    $(step+numPag).css({display: "none"});
    $(step+next).css({display: "block"});
    $(number+next).addClass("activate");
    $(number+numPag).removeClass("activate");
    if (next === 3) {
        // var time = new Date();
        // var time2 = new Date(time);
        //  time2.setSeconds(122);
        // calcula(time, time2);
        // counter_down();
        count_circle();
    }
    if (next===4) {
         $(".clock").TimeCircles().destroy();
    }
}

function pagBack(numPag) {
    var back = numPag -1;
    var step = '#step';
    var number = '#number';
    $(step+numPag).css({display: "none"});
    $(step+back).css({display: "block"});
    $(number+back).addClass("activate");
    $(number+numPag).removeClass("activate");
    if (back === 3) {
        // var time = new Date();
        // var time2 = new Date(time);
        //  time.setSeconds(120);
        // calcula(time, time2);
        // counter_down();
        count_circle();
    }
    if (back===2) {
         $(".clock").TimeCircles().destroy();
    }
}

function help_tooltip() {
    var num_tarj = "Las tarjetas de débito constan de 18 dígitos los cuales se encuentran" +
        " en la parte frontal de su tarjeta.";
    var pin = "El código PIN es la clave de cajero que posee su tarjeta de débito." +
        " Esta consta de 4 dígitos";
    var ccv = "El código de validación son los 3 dígitos que se encuentran en la" +
        " parte posterior de su tarjeta de débito.";
    var fven = "La fecha de vencimiento la podrá conseguir en la parte frontal de " +
        "su tarjeta de débito.";
    var ci = "Seleccione su nacionalidad y escriba su cédula de identidad sin puntos.";
    var pass = "La contraseña no puede parecerse a sus datos personales, debe" +
        " contener mínimo 8 caracteres alfanuméricos y un símbolo especial. " +
        "Además debe ser distinta a sus últimas cinco contraseñas."
    var confirm = "La confirmación de la contraseña debe ser igual que la " +
        "contraseña escrita anteriormente."

    $("#help-tarj").attr("title",num_tarj);
    $("#help-pin").attr("title",pin);
    $("#help-ccv").attr("title",ccv);
    $("#help-fven").attr("title",fven);
    $("#help-ci").attr("title",ci);
    $("#help-pass").attr("title",pass);
    $("#help-confirm").attr("title",confirm);
}

function pass_strength() {
    "use strict";
    var options = {
        minChar: 8,
        errorMessages: {
        password_too_short:
        "<font color='red'>La contraseña es muy corta.</font>"
        },
        scores: [17, 26, 40, 50],
        verdicts: ["Débil","Normal","Media","Fuerte","Muy Fuerte"
        ],
        showVerdicts:true,
        showVerdictsInitially:false,
        raisePower: 1.4
    };
    options.ui = {
        container: "#pwd-container",
        showProgressBar: true,
        showVerdictsInsideProgressBar: true,
    };
    $('#password').pwstrength(options);
}

function count_words(id,input){
    var this_doc = $(input);
    maxlength = this_doc.attr('maxlength');
    maxlengthint = parseInt(maxlength);
    textoActual = this_doc.val();
    currentCharacters = this_doc.val().length;
    remainingCharacters = maxlengthint - currentCharacters;
    espan = $(id);
    console.log(espan);
    espan.css({display: "block"});
    if (document.addEventListener && !window.requestAnimationFrame) {
        if (remainingCharacters <= -1) {
            remainingCharacters = 0;
        }
    }
    espan.html(remainingCharacters+'/'+maxlengthint);
    if (!!maxlength) {
        var texto = this_doc.val();
        if (texto.length >= maxlength) {
            this_doc.removeClass().addClass("border-red");
            this_doc.val(text.substring(0, maxlength));
        }
    }
}

function remove_count(id) {
    espan = $(id);
    $(".counter").css({display: "none"});
    espan.css({display: "block"});
}