/**
 * Created by CinthyaCarolina on 5/7/2017.
 */

$(document).ready(function () {
    var regexNum =  /^[0-9]+$/;
    var regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
    var numtarj = '#numtarj';
    var pin = '#pin';
    var ccv = '#ccv';
    var ci = '#ci';
    var email = '#email';
    var msj_num = "Sólo se admiten números";
    var msj_email = "Ingrese un email válido";
    var msj = "Este campo es obligatorio";

    $(numtarj).on('focusout', function () {
        if ( $(numtarj).val() !== ""){
            if ( !($(numtarj).val().match(regexNum))) {
                $('#error-num-tarj').text(msj_num);
                $(numtarj).addClass('errors');
            }
            else if ($(numtarj).val().length < 18){
                $('#error-num-tarj').text("Debe contener 18 dígitos");
                $(numtarj).addClass('errors');
            }
            else{
                $(numtarj).removeClass('errors');
                $(numtarj).css({border: '2px solid #d2d6de'});
                $('#error-num-tarj').empty();
            }
        }
        else if ($(numtarj).val() === ""){
            $('#error-num-tarj').text(msj);
            $(numtarj).addClass('errors');
        }
    });

    $(numtarj).on('focus', function () {
        $(numtarj).removeClass('errors');
        $(numtarj).css({'border-color': '#8AB7B6'});
        $('#error-num-tarj').empty();
        $("#error-general").empty();
        $("#error").empty();
    });

    $(pin).on('focusout', function () {
        if ( $(pin).val() !== ""){
            if ( !($(pin).val().match(regexNum))) {
                $('#error-pin').text(msj_num);
                $(pin).addClass('errors');
            }
            else if ($(pin).val().length < 4){
                $('#error-pin').text("Debe contener 4 dígitos");
                $(pin).addClass('errors');
            }
            else{
                $(pin).css({border: '2px solid #d2d6de'});
                $(pin).removeClass('errors');
                $('#error-pin').empty();
            }
        }
        else if ($(pin).val() === ""){
            $('#error-pin').text(msj);
            $(pin).addClass('errors');
        }
    });

    $(pin).on('focus', function () {
        $(pin).removeClass('errors');
        $(pin).css({'border-color': '#8AB7B6'});
        $('#error-pin').empty();
        $("#error-general").empty();
        $("#error").empty();
    });

    $(ccv).on('focusout', function () {
        if ( $(ccv).val() !== ""){
            if ( !($(ccv).val().match(regexNum))) {
                $('#error-ccv').text(msj_num);
                $(ccv).addClass('errors');
            }
            else if ($(ccv).val().length < 3){
                $('#error-ccv').text("Debe contener 3 dígitos");
                $(ccv).addClass('errors');
            }
            else{
                $(ccv).css({border: '2px solid #d2d6de'});
                $(ccv).removeClass('errors');
                $('#error-ccv').empty();
            }
        }
        else if ($(ccv).val() === ""){
            $('#error-ccv').text(msj);
            $(ccv).addClass('errors');
        }
    });

    $(ccv).on('focus', function () {
        $(ccv).removeClass('errors');
        $(ccv).css({'border-color': '#8AB7B6'});
        $('#error-ccv').empty();
        $("#error-general").empty();
        $("#error").empty();
    });

    $(ci).on('focusout', function () {
        if ( $(ci).val() !== ""){
            if ( !($(ci).val().match(regexNum))) {
                $('#error-ci').text(msj_num);
                $(ci).addClass('errors');
            }
            else if ($(ci).val().length < 6){
                $('#error-ci').text("Debe contener mínimo 6 dígitos");
                $(ci).addClass('errors');
            }
            else{
                $(ci).css({border: '2px solid #d2d6de'});
                $(ci).removeClass('errors');
                $('#error-ci').empty();
            }
        }
        else if ($(ci).val() === ""){
            $('#error-ci').text(msj);
            $(ci).addClass('errors');
        }
    });

    $(ci).on('focus', function () {
        $(ci).removeClass('errors');
        $(ci).css({'border-color': '#8AB7B6'});
        $('#error-ci').empty();
        $("#error-general").empty();
        $("#error").empty();
    });

    $(email).on('focusout', function () {
        if ( $(email).val() !== ""){
            if ( !($(email).val().match(regexEmail))) {
                $('#error-email').text(msj_email);
                $(email).addClass('errors');
            }
            else{
                $(email).css({border: '2px solid #d2d6de'});
                $(email).removeClass('errors');
                $('#error-email').empty();
            }
        }
        else if ($(email).val() === ""){
            $('#error-email').text(msj);
            $(email).addClass('errors');
        }
    });

    $(email).on('focus', function () {
        $(email).removeClass('errors');
        $(email).css({'border-color': '#8AB7B6'});
        $('#error-email').empty();
        $("#error_step2").empty();
    });

});
