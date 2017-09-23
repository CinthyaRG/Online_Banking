/**
 * Created by Cinthya C. Ramos G. on 12/6/2017.
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
    var year_t = today.slice(2,4);
    var month;
    if (year === year_t) {
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
                if (data.user_exists) {
                    $("#error").append('<p class="text-danger margin-error">'+
                        data.error +'</p>');
                    effect_error("#error");
                }
                else {
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
                                if (!(data.product)){
                                    $(a).addClass('errors');
                                }
                                if (!(data.pin)){
                                    $(b).addClass('errors');
                                }
                                if (!(data.ccv)){
                                    $(c).addClass('errors');
                                }
                                if (!(data.month)){
                                    $(d).addClass('errors');
                                }
                                if (!(data.year)){
                                    $(e).addClass('errors');
                                }
                                if (!(data.ci)){
                                    $(g).addClass('errors');
                                }
                            }
                        },
                        error: function (data) {
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

function validation_forgot(a,b,c,d,e,f) {
    var numtarj = $(a).val();
    var ccv = $(b).val();
    var month = $(c).val();
    var year = $(d).val();
    var ci = $(e).val()+$(f).val();
    var msj = "Este campo es obligatorio";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-user-forget/";
    var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/validate_data_forgot/";

    $("#error").empty();

    if ( ($(a).hasClass('errors')) || ($(b).hasClass('errors')) || ($(f).hasClass('errors')) ){
        $("#error").append('<p class="text-danger margin-error">'+
            'Los campos presentan errores por favor ' +
            'verifíquelos para continuar con el registro.' +'</p>');
        effect_error("#error");
    }

    else if ( (numtarj === "") || (ccv === "") || ($(f).val() === "")) {
        if (numtarj === ""){
            $(a).css({border: '2px solid rgba(128,10,11,0.81)'});
            $("#error-num-tarj").text(msj);
        }
        if (ccv === ""){
            $(b).css({border: '2px solid rgba(128,10,11,0.81)'});
            $("#error-ccv").text(msj);
        }
        if ($(f).val() === "") {
            $(f).css({border: '2px solid rgba(128,10,11,0.81)'});
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
                if (!(data.user_exists)) {
                    $("#error").append('<p class="text-danger margin-error">'+
                        'Usted no se encuentra registrado. Por favor regístrese ' +
                        'para disfrutar de nuestros servicios.' +'</p>');
                    effect_error("#error");
                }
                else {
                    if (data.block) {
                        $("#error").append('<p class="text-danger margin-error">'+
                            data.error +'</p>');
                        effect_error("#error");
                    }
                    else if (!(data.active)) {
                        $("#error").append('<p class="text-danger margin-error">'+
                            data.error +'</p>');
                        effect_error("#error");
                    }
                    else {
                        $('#quest-sec').text(data.quest);
                        $("#data").text(data.p);
                        $.ajax({
                            url: url_api,
                            origin: 'localhost:8000',
                            headers: {'X-CSRFToken': getCookie('csrftoken')},
                            data: {
                                numtarj: numtarj,
                                ccv: ccv,
                                month: month,
                                year: year,
                                ci: ci
                            },
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data.correct) {
                                    $("#name_customer").text(data.customer_name);
                                    $("#last-name_customer").text(data.customer_last);
                                    $("#ci_customer").text(data.customer_ident);
                                    $("#phone-home").text(data.phone_home);
                                    $("#cellphone").text(data.cellphone);
                                    $("#phone-office").text(data.phone_office);
                                    $("#birthday").text(data.birthday);
                                    pagNext(1);
                                    $('#answer').val('');
                                }
                                else {
                                    $("#error").append('<p class="text-danger margin-error">'+
                                        data.error +'</p>');
                                    effect_error("#error");

                                    if (!(data.product)){
                                        $(a).addClass('errors');
                                    }
                                    if (!(data.ccv)){
                                        $(b).addClass('errors');
                                    }
                                    if (!(data.month)){
                                        $(c).addClass('errors');
                                    }
                                    if (!(data.year)){
                                        $(d).addClass('errors');
                                    }
                                    if (!(data.ci)){
                                        $(f).addClass('errors');
                                    }
                                }
                            },
                            error: function (data) {
                                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                            }
                        });
                    }
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
                if (data.user_exists) {
                    $("#error").append('<p class="text-danger margin-error">'+
                        'Lo sentimos, ha ocurrido un error. Ingrese sus datos nuevamente.' +'</p>');
                    effect_error("#error");
                    pagBack(2);
                }
                if (data.envio) {
                    $("#cod").val('');
                    $("#email_cust").text(email.val());
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
        $.ajax({
            url: url,
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                username: username
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.user_exists) {
                    if (data.envio) {
                        restore_count_circle();
                        $("#error_step3").append('<p class="text-success margin-error">'+
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
                    $("#error").append('<p class="text-danger margin-error">'+
                        data.error +'</p>');
                    pagBack(2);
                    effect_error("#error");
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
                    if (data.user_exists) {
                        if (data.correct) {
                            pagNext(3);
                            $("#quest1").val('');
                            $("#answ1").val('');
                            $("#quest2").val('');
                            $("#answ2").val('');
                        }
                        else {
                            $("#error_step3").append('<p class="text-danger margin-error">'+
                                data.error +'</p>');
                            effect_error("#error_step3");
                            $(cod).addClass('errors');
                        }
                    }
                    else {
                        $("#error").append('<p class="text-danger margin-error">'+
                            data.error +'</p>');
                        pagBack(2);
                        effect_error("#error");
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
    var a2 = $("#answ2");
    var q1 = $("#quest1");
    var q2 = $("#quest2");
    var msj = "Los campos presentan errores por favor " +
        "verifíquelos para continuar con el registro.";

    $("#error_step4").empty();

    if ( (a1.hasClass('errors')) || (a1.val() == "") ||
        (a2.hasClass('errors')) || (a2.val() == "") ||
        (q1.hasClass('errors')) || (q1.val() == "") ||
        (q2.hasClass('errors')) || (q2.val() == "") ||
        (a1.val() == a2.val()) ||
        (a1.val() == q2.val()) ||
        (a1.val() == q1.val()) ||
        (a2.val() == q2.val()) ||
        (a2.val() == q1.val()) ||
        (q1.val() == q2.val()) ){
        $("#error_step4").append('<p class="text-danger margin-error">'+
            msj +'</p>');
        effect_error("#error_step4");
    }
    else {
        pagNext(4);
    }
}

function validate_ques() {
    var a1 = $("#answer");
    var quest = $('#quest-sec').text();
    var username = $("#numtarj").val();
    var msj = "Los campos presentan errores por favor " +
        "verifíquelos para continuar con el registro.";
    var msj_error = "La respuesta es incorrecta.";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-questions/";

    $("#error_step2").empty();

    if ( (a1.hasClass('errors')) || (a1.val() === "") ||
        (a1.val() === quest) ) {
        $("#error_step2").append('<p class="text-danger margin-error">'+
            msj +'</p>');
        effect_error("#error_step2");
        $(a1).addClass('errors');
        $('#error-answer').text("Este campo es obligatorio");

    }
    else {
        $.ajax({
            url: url,
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                question: quest,
                answer: a1.val(),
                username: username
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.user_exists) {
                    if (data.correct) {
                        pagNext(2);
                    }
                    else {
                        $("#error_step2").append('<p class="text-danger margin-error">'+
                            msj_error +'</p>');
                        effect_error("#error_step2");
                        a1.addClass('errors');
                    }
                }
                else {
                    $("#error").append('<p class="text-danger margin-error">'+
                        data.error +'</p>');
                    effect_error("#error");
                    pagBack(2)
                }

            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            }
        });
    }
}

function validate_pass() {
    var password = $("#password");
    var confirm = $("#confirm-pass");
    var a1 = $("#answ1").val();
    var a2 = $("#answ2").val();
    var q1 = $("#quest1").val();
    var q2 = $("#quest2").val();
    var username = $("#numtarj").val();
    var ci_cust = $("#ci_customer").text();
    var min = $("#min-carac");
    var carac = $("#carac");
    var repeat = $("#repeat-carac");
    var num = $("#num-carac");
    var spec = $("#spec-carac");
    var pers = $("#pers-carac");
    var msj = "Este campo presenta errores";
    var msj_error = "Hubo un error en la conexión intente de nuevo. Gracias.";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-pass/";
    var url2 = path[0]+"/"+path[1]+"/localhost:8001/ajax/get-product/";
    var products = [];

    $("#error_step5").empty();

    if ( (password.hasClass('errors')) || (password.val() === "")) {
        $('#error-pass').text(msj);
    }
    else if ( (confirm.hasClass('errors')) || (confirm.val() === "")) {
        $('#error-conf-pass').text(msj);
    }
    else if ( (confirm.val() !== password.val())) {
        $('#confirm').addClass('text-danger');
    }
    else if ( (min.hasClass('text-danger')) ||
        (carac.hasClass('text-danger')) || (repeat.hasClass('text-danger')) ||
        (num.hasClass('text-danger')) || (spec.hasClass('text-danger')) ||
        (pers.hasClass('text-danger')) ) {
        $('#error-pass').text(msj);
    }
    else {
        $.ajax({
            url: url2,
            type: 'GET',
            data: {
                num: username
            },
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            dataType: 'json',
            success: function (data) {
                if (data.correct) {
                    products = JSON.stringify(data.product);
                    $.ajax({
                        url: url,
                        headers: {'X-CSRFToken': getCookie('csrftoken')},
                        data: {
                            question1: q1,
                            question2: q2,
                            answer1: a1,
                            answer2: a2,
                            password: password.val(),
                            ci: ci_cust,
                            username: username,
                            p: products
                        },
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (data.user_exists) {
                                if (data.correct) {
                                    location.href= path[0]+"/"+path[1]+"/"+path[2]+"/registro-exitoso";
                                }
                                else {
                                    $("#error_step5").append('<p class="text-danger margin-error">'+
                                        msj_error +'</p>');
                                    effect_error("#error_step5");
                                }
                            }
                            else {
                                $("#error").append('<p class="text-danger margin-error">'+
                                    data.error +'</p>');
                                effect_error("#error");
                                pagBack(2)
                            }

                        },
                        error: function (data) {
                            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                        }
                    });
                }
            }
        });
    }
}

function validate_pass_forgot() {
    var password = $("#password");
    var confirm = $("#confirm-pass");
    var username = $("#numtarj").val();
    var old = $("#old");
    var min = $("#min-carac");
    var carac = $("#carac");
    var repeat = $("#repeat-carac");
    var num = $("#num-carac");
    var spec = $("#spec-carac");
    var pers = $("#pers-carac");
    var msj = "Este campo presenta errores";
    var msj_error = "Hubo un error en la conexión intente de nuevo. Gracias.";
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate-pass-forgot/";

    $("#error_step5").empty();

    if ( (password.hasClass('errors')) || (password.val() === "")) {
        $('#error-pass').text(msj);
    }
    else if ( (confirm.hasClass('errors')) || (confirm.val() === "")) {
        $('#error-conf-pass').text(msj);
    }
    else if ( (confirm.val() !== password.val())) {
        $('#confirm').addClass('text-danger');
    }
    else if ( (old.hasClass('text-danger')) || (min.hasClass('text-danger')) ||
        (carac.hasClass('text-danger')) || (repeat.hasClass('text-danger')) ||
        (num.hasClass('text-danger')) || (spec.hasClass('text-danger')) ||
        (pers.hasClass('text-danger')) ) {
        $('#error-pass').text(msj);
    }
    else {
        $.ajax({
            url: url,
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                password: password.val(),
                username: username
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.user_exists) {
                    if (data.correct) {
                        location.href= path[0]+"/"+path[1]+"/"+path[2]+"/nueva-pass-exitosa";
                    }
                    else {
                        $("#error_step5").append('<p class="text-danger margin-error">'+
                            msj_error +'</p>');
                        effect_error("#error_step5");
                    }
                }
                else {
                    $("#error").append('<p class="text-danger margin-error">'+
                        data.error +'</p>');
                    effect_error("#error");
                    pagBack(2)
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
    var path = window.location.href.split('/');
    $(step+numPag).css({display: "none"});
    $(step+next).css({display: "block"});
    $(number+next).addClass("activate");
    $(number+numPag).removeClass("activate");
    if ( (next === 3) && (path[3] === "registro")) {
        count_circle();
    }
    if (( next===4) && (path[3] === "registro")) {
        $(".clock").TimeCircles().destroy();
    }
}

function pagBack(numPag) {
    var back = numPag -1;
    var step = '#step';
    var number = '#number';
    var path = window.location.href.split('/');
    $(step+numPag).css({display: "none"});
    $(step+back).css({display: "block"});
    $(number+back).addClass("activate");
    $(number+numPag).removeClass("activate");
    if ( (back === 3) && (path[3] === "registro")) {
        count_circle();
    }
    if ( (back===2) && (path[3] === "registro")) {
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