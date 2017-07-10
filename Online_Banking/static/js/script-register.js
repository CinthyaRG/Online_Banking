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

function effect_error(id) {
    $(id).css({display:'block'});
    setTimeout(function() {
        $(id).fadeOut(3000);
    },1500);
}

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

function count_circle() {
    $('.clock').TimeCircles({count_past_zero: false});
}

function restore_count_circle() {
    $('.clock').TimeCircles().destroy();
    $('.clock').TimeCircles({count_past_zero: false});
}

function validation(a,b,c,d,e,f,g) {
    var numtarj = $(a).val();
    var pin = $(b).val();
    var ccv = $(c).val();
    var month = $(d).val();
    var year = $(e).val();
    var ci = $(f).val()+$(g).val();
    var msj = "Este campo es obligatorio";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-user/";
    var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/validate_data/";

    $("#error").empty();

    if ( ($(a).hasClass('errors')) || ($(b).hasClass('errors')) || ($(c).hasClass('errors'))
        || ($(g).hasClass('errors')) ){
        $("#error").append('<p class="text-danger margin-error">'+
            'Los campos presentan errores por favor ' +
            'verifíquelos para continuar con el registro.' +'</p>');
        effect_error("#error");

    }

    else if ( (numtarj === "") || (pin === "") || (ccv === "") || ($(g).val() === "")) {
        if (numtarj === ""){
            $(a).css({border: '2px solid rgba(128,10,11,0.81)'});
            $("#error-num-tarj").text(msj);
        }
        if (pin === ""){
            $(b).css({border: '2px solid rgba(128,10,11,0.81)'});
            $("#error-pin").text(msj);
        }
        if (ccv === ""){
            $(c).css({border: '2px solid rgba(128,10,11,0.81)'});
            $("#error-ccv").text(msj);
        }
        if ($(g).val() === "") {
            $(g).css({border: '2px solid rgba(128,10,11,0.81)'});
            $("#error-ci").text(msj);
        }
        $("#error-general").text("Los campos presentan errores por favor " +
            "verifíquelos para continuar con el registro.");
    }
    else {
        $.ajax({
            url: url,
            origin: 'http://127.0.0.1:8000',
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                ci: ci
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                alert("EXITO");
                if (data.user_exists) {
                    $("#error").append('<p class="text-danger margin-error">'+
                        data.error +'</p>');
                    effect_error("#error");
                }
                else {
                    console.log('entro en else');
                    $.ajax({
                        url: url_api,
                        origin: 'localhost:8000',
                        headers: {'X-CSRFToken': getCookie('csrftoken')},
                        data: {
                            numtarj: numtarj,
                            pin: pin,
                            ccv: ccv,
                            month: month,
                            year: year,
                            ci: ci
                        },
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            alert("EXITO ajax api");
                            if (data.correct) {
                                $("#name_customer").text(data.customer_name);
                                $("#last-name_customer").text(data.customer_last);
                                $("#ci_customer").text(data.customer_ident);
                                $("#phone-home").text(data.phone_home);
                                $("#cellphone").text(data.cellphone);
                                $("#phone-office").text(data.phone_office);
                                $("#birthday").text(data.birthday);
                                pagNext(1);
                            }
                            else {
                                $("#error").append('<p class="text-danger margin-error">'+
                                    data.error +'</p>');
                                effect_error("#error");
                            }
                        },
                        error: function (data) {
                            console.log(data.error);
                            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                        }
                    });
                }
            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            }
        });

    }
}

function validate_email() {
    var email = $("#email");
    var first_name = $("#name_customer");
    var last_name = $("#last-name_customer");
    var ci = $("#ci_customer");
    var username = $("#numtarj").val();
    var msj = "Los campos presentan errores por favor " +
        "verifíquelos para continuar con el registro.";
    var msj_error = "Hubo un error en la conexión intente de nuevo. Gracias.";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-email/";

    $("#error_step2").empty();

    if ( (email.hasClass('errors')) || (email.val() === "") ){
        $("#error_step2").append('<p class="text-danger margin-error">'+
            msj +'</p>');
        effect_error("#error_step2");
    }
    else {
        $.ajax({
            url: url,
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                email: email.val(),
                first_name: first_name.text(),
                last_name: last_name.text(),
                ci: ci.text(),
                username: username
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                alert("EXITO");
                if (data.user_exists) {
                    $("#error_step2").append('<p class="text-danger margin-error">'+
                        msj_error +'</p>');
                    effect_error("#error_step2");
                }
                if (data.envio) {
                    pagNext(2);
                }
                else {
                    $("#error_step2").append('<p class="text-danger margin-error">'+
                        msj_error +'</p>');
                    effect_error("#error_step2");
                }

            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            }
        });
    }
}

function validate_cod(elem) {
    var username = $("#numtarj").val();
    var cod = $('#cod');
    var msj_error = "Hubo un error en la conexión intente de nuevo. Gracias.";
    var msj = "Los campos presentan errores por favor " +
        "verifíquelos para continuar con el registro.";
    var path = window.location.href.split('/');
    var url = '';

    $("#error_step3").empty();

    if (elem === 'resend') {
        url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/resend-email/";
        console.log(url);
        $.ajax({
            url: url,
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                username: username
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                alert("EXITO reenvio");
                if (data.user_exists) {
                    if (data.envio) {
                        restore_count_circle();
                        $("#error_step3").append('<p class="text-danger margin-error">'+
                            'Se ha enviado exitosamente un nuevo código a su correo.' +'</p>');
                        effect_error("#error_step3");
                    }
                    else {
                        $("#error_step3").append('<p class="text-danger margin-error">'+
                            msj_error +'</p>');
                        effect_error("#error_step3");
                    }
                }
                else {
                    $("#error_step2").append('<p class="text-danger margin-error">'+
                        data.error +'</p>');
                    pagBack(3);
                    $("#email").val('');
                    effect_error("#error_step2");
                }
            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            }
        });
    }
    else if (elem === 'submit'){
        url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-cod/";
        if ( (cod.hasClass('errors')) || (cod.val() === "") ||
            (cod.val().length !== 6) ){
            $("#error_step3").append('<p class="text-danger margin-error">'+
                msj +'</p>');
            effect_error("#error_step3");
        }
        else {
            $.ajax({
                url: url,
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    username: username,
                    cod: cod.val()
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    alert("EXITO cod");
                    if (data.user_exists) {
                        if (data.correct) {
                            pagNext(3);
                        }
                        else {
                            $("#error_step3").append('<p class="text-danger margin-error">'+
                                data.error +'</p>');
                            effect_error("#error_step3");
                        }
                    }
                    else {
                        $("#error_step2").append('<p class="text-danger margin-error">'+
                            data.error +'</p>');
                        pagBack(3);
                        $("#email").val('');
                        effect_error("#error_step2");
                    }
                },
                error: function (data) {
                    alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                }
            });
        }
    }
}

function validate_questions() {
    var a1 = $("#answ1");
    var a2 = $("#nansw2");
    var q1 = $("#quest1");
    var q2 = $("#quest2");
    var msj = "Los campos presentan errores por favor " +
        "verifíquelos para continuar con el registro.";

    $("#error_step3").empty();

    if ( (a1.hasClass('errors')) || (a1.val() === "") || 
        (a2.hasClass('errors')) || (a2.val() === "") || 
        (q1.hasClass('errors')) || (q1.val() === "") || 
        (q2.hasClass('errors')) || (q2.val() === "") ){
        $("#error_step3").append('<p class="text-danger margin-error">'+
            msj +'</p>');
        effect_error("#error_step3");
    }
    else {
        pagNext(3);
    }
}

function validate_pass() {
    var password = $("#password");
    var confirm = $("#confirm-pass");
    var first_name = $("#name_customer");
    var last_name = $("#last-name_customer");
    var ci = $("#ci_customer");
    var username = $("#numtarj").val();
    var msj = "Este campo es obligatorio";
    var msj_error = "Hubo un error en la conexión intente de nuevo. Gracias.";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-pass/";

    if ( (password.hasClass('errors')) || (password.val() === "")) {
        $('#error-pass').text(msj);
    }
    else if ( (confirm.hasClass('errors')) || (confirm.val() === "")) {
        $('#error-conf-pass').text(msj);
    }
    else {
        $.ajax({
            url: url,
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                email: email.val(),
                first_name: first_name.text(),
                last_name: last_name.text(),
                ci: ci.text(),
                username: username
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                alert("EXITO");
                if (data.user_exists) {
                    $("#error_step2").append('<p class="text-danger margin-error">'+
                        msj_error +'</p>');
                    effect_error("#error_step2");
                }
                if (data.envio) {
                    pagNext(2);
                }
                else {
                    $("#error_step2").append('<p class="text-danger margin-error">'+
                        msj_error +'</p>');
                    effect_error("#error_step2");
                }

            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            }
        });
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
        "Además debe ser distinta a sus últimas cinco contraseñas.";
    var confirm = "La confirmación de la contraseña debe ser igual que la " +
        "contraseña escrita anteriormente.";

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
    espan.css({display: "inline"});
    if (document.addEventListener && !window.requestAnimationFrame) {
        if (remainingCharacters <= -1) {
            remainingCharacters = 0;
        }
    }
    espan.html(remainingCharacters+'/'+maxlengthint);
    if (!!maxlength) {
        var texto = this_doc.val();
        if (texto.length >= maxlength) {
            this_doc.addClass("border-red");
            this_doc.val(text.substring(0, maxlength));
        }
    }
}

function remove_count(id) {
    espan = $(id);
    $(".counter").css({display: "none"});
    espan.css({display: "block"});
}