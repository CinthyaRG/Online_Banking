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

    if ($(a).val() === '0') {
        notification_error('Seleccione un banco de la lista.');
        $(a).addClass('errors');
    }
    if ($(b).val().length < 20) {
        notification_error('El número de cuenta debe tener 20 dígitos.');
        $(a).addClass('errors');
    }
    if (isNaN($(b).val())) {
        notification_error('Solo se admiten números en el número de cuenta.');
        $(a).addClass('errors');
    }
    if (!($(g).val().match(regexEmail))) {
        notification_error('Ingrese un email válido.');
        $(a).addClass('errors');
    }
    if ($(h).val() !== $(g).val()) {
        notification_error('Seleccione un banco de la lista.');
        $(a).addClass('errors');
    }

}

function add_affiliate(a,b,c,d,e,f,g,h) {
    if (validate_affiliate(a,b,c,d,e,f,g,h)) {
        alert('valido');
    }
}

