/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    drop_bank();

    $('li').removeClass("active");
    $("#num-acc").val("");
    $("#ci").attr({maxlength:"8"});

    $("#bank").change(function () {
        $.getJSON('../static/js/bank.json', function (data) {
            $.each( data, function( key, val ) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });

    $("#select-ci").change(function () {
        if ($("#select-ci").val() === "V-" || $("#select-ci").val() === "E-") {
            $("#ci").val("");
            $("#ci").attr({maxlength:"8"});
        }
        else {
            $("#ci").val("");
            $("#ci").attr({maxlength:"9"});
        }
    });

    $('#bank').click(function () {
        $('#bank').removeClass('errors');
    })

});


function drop_bank(){
    $("#bank").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('../static/js/bank.json', function (data) {
        $.each( data, function( key, val ) {
            $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
        });
    })
}

function validate_affiliate(a,b,c,d,e,f,g,h) {
    var errors = false;
    var regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    var regexLetters = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s ]*$/;

    if ($(a).val() === '0') {
        notification_error('Seleccione un banco de la lista.');
        $(a).addClass('errors');
        errors = true;
    }
    if ($(b).val().length < 20) {
        notification_error('El número de cuenta debe contener 20 dígitos.');
        $(b).addClass('errors');
        errors = true;
    }
    if (isNaN($(b).val())) {
        notification_error('Solo se admiten números en el número de cuenta.');
        $(b).addClass('errors');
        errors = true;
    }
    if ($(c).val()  === ' '){
        notification_error('El nombre del afiliado no puede estar vacío.');
        $(c).addClass('errors');
        errors = true;
    }
    if ($(c).val().match(regexLetters)){
        notification_error('El nombre del afiliado solo admite letras.');
        $(c).addClass('errors');
        errors = true;
    }
    if ($(d).val().includes('V') || $(d).val().includes('E')) {
        if ($(e).val().length < 8) {
            notification_error('El documento de identidad debe contener 8 dígitos.');
            $(e).addClass('errors');
            errors = true;
        }
    }
    if ($(d).val().includes('J')) {
        if ($(e).val().length < 9) {
            notification_error('El documento de identidad debe contener 8 dígitos.');
            $(e).addClass('errors');
            errors = true;
        }
    }
    if (isNaN($(e).val())) {
        notification_error('Solo se admiten números en el documento de identidad.');
        $(e).addClass('errors');
        errors = true;
    }
    if ($(f).val()  === ' '){
        notification_error('El alias no puede estar vacío.');
        $(f).addClass('errors');
        errors = true;
    }
    if ($(f).val().match(regexLetters)){
        notification_error('El alias solo admite letras.');
        $(f).addClass('errors');
        errors = true;
    }
    if (!($(g).val().match(regexEmail))) {
        notification_error('Ingrese un email válido.');
        $(a).addClass('errors');
        errors = true;
    }
    if ($(h).val() !== $(g).val()) {
        notification_error('La confirmación debe ser igual al email.');
        $(h).addClass('errors');
        errors = true;
    }

    return errors
}

function add_affiliate(a,b,c,d,e,f,g,h) {
    if (validate_affiliate(a,b,c,d,e,f,g,h)) {
        alert('valido');
    }
}

