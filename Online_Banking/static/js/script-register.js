/**
 * Created by CinthyaCarolina on 12/6/2017.
 */


$(document).ready(function (){
    style_pag();
    drop_years();
    help_tooltip();
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

function pagNext(numPag) {
    var next = numPag +1;
    var step = '#step';
    var number = '#number';
    $(step+numPag).css({display: "none"});
    $(step+next).css({display: "block"});
    $(number+next).addClass("activate");
    $(number+numPag).removeClass("activate");
    if (next === 3) {
        counter_down();
    }
    if (next === 5) {
        console.log("entro 5")
        pass_strength();
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
        counter_down();
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