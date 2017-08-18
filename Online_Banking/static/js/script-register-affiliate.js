/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

var errors = true;

$(document).ready(function (){
    var url = document.referrer.split('/');

    if (url[4] === 'transf-mi-banco' ) {
        alert('aqui');
        $("#bank").append('<option value="'+'0180'+'"> '+'BANCO ACTIO CAPITAL, C.A.'+'</option>');
        $("#num-acc").val($("#bank").val());

    }
    else if (url[4] === 'transf-otros-bancos' ) {
        $("#num-acc").val("");
        drop_bank();
    }

    var regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    var regexLetters = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s ]*$/;
    var a = '#bank';
    var b = '#num-acc';
    var c = '#name';
    var d = '#ci';
    var e = '#nickname';
    var f = '#email';
    var g = '#email-confirm';

    $(a).focusout(function () {
        if ($(a).val() === '0') {
            notification_error('Seleccione un banco de la lista.');
            $(a).addClass('errors');
            errors = false;
        }
    });

    $(b).focusout(function () {
        if (isNaN($(b).val())) {
            notification_error('Solo se admiten números en el número de cuenta.');
            $(b).addClass('errors');
            errors = false;
        }
        else {
            if ($(b).val().length < 20) {
                notification_error('El número de cuenta debe contener 20 dígitos.');
                $(b).addClass('errors');
                errors = false;
            }
        }
    });

    $(c).focusout(function () {
        if ($(c).val()  === ''){
            notification_error('El nombre del afiliado no puede estar vacío.');
            $(c).addClass('errors');
            errors = false;
        }
        else if (!($(c).val().match(regexLetters))){
            notification_error('El nombre del afiliado solo admite letras.');
            $(c).addClass('errors');
            errors = false;
        }
    });

    $(d).focusout(function () {
        if (isNaN($(d).val())) {
            notification_error('Solo se admiten números en el documento de identidad.');
            $(d).addClass('errors');
            errors = false;
        }
        else{
            if ($('#select-ci').val().includes('V') || $('#select-ci').val().includes('E')) {
                if ($(d).val().length < 8) {
                    notification_error('El documento de identidad debe contener 8 dígitos.');
                    $(d).addClass('errors');
                    errors = false;
                }
            }
            else {
                if ($(d).val().length < 9) {
                    notification_error('El documento de identidad debe contener 9 dígitos.');
                    $(d).addClass('errors');
                    errors = false;
                }
            }
        }
    });

    $(e).focusout(function () {
        if ($(e).val()  === ''){
            notification_error('El alias no puede estar vacío.');
            $(e).addClass('errors');
            errors = false;
        }
        else if ($(e).val().match(regexLetters)){
            notification_error('El alias solo admite letras.');
            $(e).addClass('errors');
            errors = false;
        }
    });

    $(f).focusout(function () {
        if ($(f).val()  === ''){
            notification_error('El email no puede estar vacío.');
            $(f).addClass('errors');
            errors = false;
        }
        else if (!($(f).val().match(regexEmail))) {
            notification_error('Ingrese un email válido.');
            $(f).addClass('errors');
            errors = false;
        }
    });

    $(g).focusout(function () {
        if ($(f).val() !== $(g).val()) {
            notification_error('La confirmación debe ser igual al email.');
            $(g).addClass('errors');
            errors = false;
        }
    });

    $('li').removeClass("active");

    $(d).attr({maxlength:"8"});

    $(a).change(function () {
        $.getJSON('../static/js/bank.json', function (data) {
            $.each( data, function( key, val ) {
                if ($(a).val() === val.codigo) {
                    $(b).val(val.codigo);
                }
            });
        });
    });

    $("#select-ci").change(function () {
        if ($("#select-ci").val() === "V-" || $("#select-ci").val() === "E-") {
            $(d).val("");
            $(d).attr({maxlength:"8"});
        }
        else {
            $(d).val("");
            $(d).attr({maxlength:"9"});
        }
    });

    $(a).click(function () {
        $(a).removeClass('errors');
        errors = true;
    });

    $(b).click(function () {
        $(b).removeClass('errors');
        errors = true;
    });

    $(c).click(function () {
        $(c).removeClass('errors');
        errors = true;
    });

    $(d).click(function () {
        $(d).removeClass('errors');
        errors = true;
    });

    $(e).click(function () {
        $(e).removeClass('errors');
        errors = true;
    });

    $(f).click(function () {
        $(f).removeClass('errors');
        errors = true;
    });

    $(g).click(function () {
        $(g).removeClass('errors');
        errors = true;
    });

});


function drop_bank(){
    $("#bank").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('../static/js/bank.json', function (data) {
        $.each( data, function( key, val ) {
            $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
        });
    })
}


function add_affiliate(a,b,c,d,e,f,g,h) {
    if (errors || $(a).val() === '0' || $(b).val().length < 20 || $(c).val() === '' || $(e).val() === '' ||
    $(f).val() === '' || $(g).val() === '' ) {
        alert('invalido');
    }
}

