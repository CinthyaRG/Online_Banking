/**
 * Created by Cinthya C. Ramos G. on 13/7/2017.
*/

$(document).ready(function () {
    var regexNum =  /[0-9]+/;
    var regexRepeat = /(.)\1{2,}/;
    var regexMay = /[A-Z]+/;
    var regexMin = /[a-z]+/;
    var regexSpecial = /[$!%.#_*?&]+/;
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;
    var q1 = '#quest1';
    var q2 = '#quest2';
    var a1 = '#answ1';
    var a2 = '#answ2';
    var password = '#password';
    var confirm = '#confirm-pass';
    var email = '#email_user';
    var msj = "Este campo es obligatorio";

    $(email).focusout( function () {
        if ( $(email).val().match(regexEmail)){
            $(email).css({border: '2px solid #d2d6de'});
            $(email).removeClass('errors');
        }
        else {
            if (!($(email).hasClass('errors'))) {
                $(email).addClass('errors');
            }
            notification_error('Introduzca un email correcto.')
        }
    });

    $(email).on('focus', function () {
        $(email).removeClass('errors');
        $(email).css({'border-color': '#8AB7B6'});
    });

    $(q1).change( function () {
        if ( $(q1).val() !== ""){
            if ( $(q2).val() === $(q1).val()) {
                notification_error('La pregunta 1 no puede ' +
                    'ser igual a la pregunta 2.');
                $(q1).addClass('errors');
            }
            else{
                $(q1).css({border: '2px solid #d2d6de'});
                $(q1).removeClass('errors');
            }
        }
        else {
            notification_error('La pregunta 1 no puede estar vacía.');
            $(q1).addClass('errors');
        }
    });

    $(q1).on('focus', function () {
        $(q1).removeClass('errors');
        $(q1).css({'border-color': '#8AB7B6'});
        $('#error-q1').empty();
    });

    $(a1).change( function () {
        if ( $(a1).val() !== ""){
            if ( $(a1).val() === $(q1).val()) {
                notification_error('La respuesta no puede ' +
                    'ser igual a la pregunta.');
                $(a1).addClass('errors');
            }
            else if ( data_customer($(a1).val()) ) {
                notification_error('La respuesta no puede ' +
                    'contener ninguno de sus datos personales.');
                $(a1).addClass('errors');
            }
            else{
                $(a1).css({border: '2px solid #d2d6de'});
                $(a1).removeClass('errors');
            }
        }
        else {
            notification_error('La respuesta 1 no puede estar vacía.');
            $(a1).addClass('errors');
        }
    });

    $(a1).on('focus', function () {
        $(a1).removeClass('errors');
        $(a1).css({'border-color': '#8AB7B6'});
        if ( $(q1).val() === ""){
            notification_error('La pregunta 1 no puede estar vacía.');
            $(q1).addClass('errors');
        }
    });

    $(q2).change( function () {
        if ( $(q2).val() !== ""){
            if ( $(q2).val() === $(q1).val()) {
                notification_error('La pregunta 2 no puede ' +
                    'ser igual a la pregunta 1.');
                $(q2).addClass('errors');
            }
            else if ( $(q2).val() === $(a1).val()) {
                notification_error('La pregunta 2 no puede ' +
                    'ser igual a alguna respuesta.');
                $(q2).addClass('errors');
            }
            else{
                $(q2).css({border: '2px solid #d2d6de'});
                $(q2).removeClass('errors');
            }
        }
        else {
            notification_error('La pregunta 2 no puede estar vacía.');
            $(q2).addClass('errors');
        }
    });

    $(q2).on('focus', function () {
        $(q2).removeClass('errors');
        $(q2).css({'border-color': '#8AB7B6'});
    });

    $(a2).change( function () {
        if ( $(a2).val() !== ""){
            if ( $(a2).val() === $(q2).val() ) {
                notification_error('La respuesta no puede ' +
                    'ser igual a la pregunta.');
                $(a2).addClass('errors');
            }
            else if ( data_customer($(a2).val()) ) {
                notification_error('La respuesta no puede ' +
                    'contener sus datos personales.');
                $(a2).addClass('errors');
            }
            else if ( $(a2).val() === $(a1).val()) {
                notification_error('Las respuestas no pueden ' +
                    'ser iguales.');
                $(a2).addClass('errors');
            }
            else if ( $(q1).val() === $(a2).val()) {
                notification_error('La pregunta no puede ' +
                    'ser igual a la pregunta 1.');
                $(a2).addClass('errors');
            }
            else{
                $(a2).css({border: '2px solid #d2d6de'});
                $(a2).removeClass('errors');
            }
        }
        else {
            notification_error('La respuesta 2 no puede estar vacía.');
            $(a2).addClass('errors');
        }
    });

    $(a2).on('focus', function () {
        $(a2).removeClass('errors');
        $(a2).css({'border-color': '#8AB7B6'});
        if ( $(q2).val() === ""){
            notification_error('La pregunta 2 no puede estar vacía.');
            $(q2).addClass('errors');
        }
    });

    $(password).keyup( function () {
        if ( $(password).val() !== ""){
            var path = window.location.href.split('/');
            var url_api = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/validate_passw/";
            $.ajax({
                url: url_api,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    username: 0,
                    pass: $(password).val()
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.correct) {
                        if (!($('#old').hasClass('text-danger'))) {
                            $('#old').addClass('text-danger');
                        }
                        $('#old').removeClass('text-success');
                        $(password).addClass('errors');
                    }
                    else {
                        $('#old').removeClass('text-danger');
                        $('#old').addClass('text-success');

                    }
                },
                error: function (data) {
                    alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                }
            });

            if ( ($(password).val().match(regexRepeat))) {
                if (!($('#repeat-carac').hasClass('text-danger'))) {
                    $('#repeat-carac').addClass('text-danger');
                }
                $('#repeat-carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            else {
                $('#repeat-carac').removeClass('text-danger');
                $('#repeat-carac').addClass('text-success');

            }
            if ( data_customer($(password).val()) ) {
                if (!($('#pers-carac').hasClass('text-danger'))) {
                    $('#pers-carac').addClass('text-danger');
                }
                $('#pers-carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            else {
                $('#pers-carac').removeClass('text-danger');
                $('#pers-carac').addClass('text-success');

            }
            if ( $(password).val().match(regexNum) ) {
                $('#num-carac').removeClass('text-danger');
                $('#num-carac').addClass('text-success');

            }
            else {
                if (!($('#num-carac').hasClass('text-danger'))) {
                    $('#num-carac').addClass('text-danger');
                }
                $('#num-carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            if ( !($(password).val().match(regexMin)) ) {
                if (!($('#carac').hasClass('text-danger'))) {
                    $('#carac').addClass('text-danger');
                }
                $('#carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            else {
                $('#carac').removeClass('text-danger');
                $('#carac').addClass('text-success');

            }
            if ( !($(password).val().match(regexMay)) ) {
                if (!($('#carac').hasClass('text-danger'))) {
                    $('#carac').addClass('text-danger');
                }
                $('#carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            else {
                $('#carac').removeClass('text-danger');
                $('#carac').addClass('text-success');

            }
            if ( $(password).val().length < 8) {
                if (!($('#min-carac').hasClass('text-danger'))) {
                    $('#min-carac').addClass('text-danger');
                }
                $('#min-carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            else{
                $('#min-carac').removeClass('text-danger');
                $('#min-carac').addClass('text-success');

            }
            if ( !($(password).val().match(regexSpecial)) ) {
                if (!($('#spec-carac').hasClass('text-danger'))) {
                    $('#spec-carac').addClass('text-danger');
                }
                $('#spec-carac').removeClass('text-success');
                $(password).addClass('errors');
            }
            else{
                $('#spec-carac').removeClass('text-danger');
                $('#spec-carac').addClass('text-success');

            }
            if ( $(confirm).val() !== $(password).val()) {
                $('#confirm').removeClass('text-success');
                if ( !($('#confirm').hasClass('text-danger')) ) {
                    $('#confirm').addClass('text-danger');
                }
                $(confirm).addClass('errors');
            }
            else{
                $(confirm).css({border: '2px solid #d2d6de'});
                $(confirm).removeClass('errors');
                $('#confirm').removeClass('text-danger');
                $('#confirm').addClass('text-success');
                $('#error-conf-pass').empty();
            }
            if ( ($('#old').hasClass('text-danger')) || ($('#spec-carac').hasClass('text-danger')) ||
                ($('#min-carac').hasClass('text-danger')) || ($('#carac').hasClass('text-danger')) ||
                ($('#pers-carac').hasClass('text-danger')) || ($('#num-carac').hasClass('text-danger')) ||
                ($('#repeat-carac').hasClass('text-danger')) ) {
                $(password).css({border: '2px solid #d2d6de'});
                $(password).removeClass('errors');
                $('#error-pass').empty();
            }
        }
        else {
            $('#error-pass').text("Este campo tiene errores");
            $(password).addClass('errors');

            if (!($('#old').hasClass('text-danger'))) {
                $('#old').addClass('text-danger');
            }
            $('#old').removeClass('text-success');

            if (!($('#num-carac').hasClass('text-danger'))) {
                $('#num-carac').addClass('text-danger');
            }
            $('#num-carac').removeClass('text-success');

            if (!($('#repeat-carac').hasClass('text-danger'))) {
                $('#repeat-carac').addClass('text-danger');
            }
            $('#repeat-carac').removeClass('text-success');

            if (!($('#min-carac').hasClass('text-danger'))) {
                $('#min-carac').addClass('text-danger');
            }
            $('#min-carac').removeClass('text-success');

            if (!($('#spec-carac').hasClass('text-danger'))) {
                $('#spec-carac').addClass('text-danger');
            }
            $('#spec-carac').removeClass('text-success');

            if (!($('#carac').hasClass('text-danger'))) {
                $('#carac').addClass('text-danger');
            }
            $('#carac').removeClass('text-success');

            if (!($('#pers-carac').hasClass('text-danger'))) {
                $('#pers-carac').addClass('text-danger');
            }
            $('#pers-carac').removeClass('text-success');

            if (!($('#confirm').hasClass('text-danger'))) {
                $('#confirm').addClass('text-danger');
            }
            $('#confirm').removeClass('text-success');
        }
    });

    $(password).on('focus', function () {
        $(password).removeClass('errors');
        $(password).css({'border-color': '#8AB7B6'});
        $('#error-pass').text('');
    });

    $(confirm).keyup( function () {
        if ( $(confirm).val() !== ""){
            if ( $(confirm).val() !== $(password).val()) {
                $('#confirm').removeClass('text-success');
                if ( !($('#confirm').hasClass('text-danger')) ) {
                    $('#confirm').addClass('text-danger');
                }
                $(confirm).addClass('errors');
            }
            else{
                $(confirm).css({border: '2px solid #d2d6de'});
                $(confirm).removeClass('errors');
                $('#confirm').removeClass('text-danger');
                $('#confirm').addClass('text-success');
                $('#error-conf-pass').empty();
            }
        }
        else if ($(confirm).val() === ""){
            $('#error-conf-pass').text(msj);
            $(confirm).addClass('errors');

            if (!($('#confirm').hasClass('text-danger'))) {
                $('#confirm').addClass('text-danger');
            }
            $('#confirm').removeClass('text-success');
        }
    });

    $(confirm).on('focus', function () {
        $(confirm).removeClass('errors');
        $(confirm).css({'border-color': '#8AB7B6'});
        $('#error-conf-pass').empty();
    });

});


function data_customer(valor) {
    var normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç",
            to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc",
            mapping = {};

        for(var i = 0, j = from.length; i < j; i++ )
            mapping[ from.charAt( i ) ] = to.charAt( i );

        return function( str ) {
            var ret = [];
            for( var i = 0, j = str.length; i < j; i++ ) {
                var c = str.charAt( i );
                if( mapping.hasOwnProperty( str.charAt( i ) ) )
                    ret.push( mapping[ c ] );
                else
                    ret.push( c );
            }
            return ret.join( '' );
        }

    })();
    var first_name = normalize($("#name_customer").text().toLowerCase()).split(' ');
    var last_name = normalize($("#last-name_customer").text().toLowerCase()).split(' ');
    var ci_cust = $("#ci_customer").text().split('-');
    var phone_home = $("#phone-home").text().split('-');
    var cellphone = $("#cellphone").text().split('-');
    var phone_office = $("#phone-office").text().split('-');
    var birthday = $("#birthday").text();
    var birthday_split = $("#birthday").text().split('-');


    return !!((first_name[0].includes(normalize(valor.toLowerCase()))) ||
        (normalize(valor.toLowerCase()).includes(first_name[0])) ||
        (first_name[1].includes(normalize(valor.toLowerCase()))) ||
        (normalize(valor.toLowerCase()).includes(first_name[1])) ||
        (last_name[0].includes(normalize(valor.toLowerCase()))) ||
        (normalize(valor.toLowerCase()).includes(last_name[0])) ||
        (last_name[1].includes(normalize(valor.toLowerCase()))) ||
        (normalize(valor.toLowerCase()).includes(last_name[1])) ||
        (ci_cust[1].includes(valor)) ||
        (valor.includes(ci_cust[1])) ||
        (birthday.includes(valor)) ||
        (valor.includes(birthday)) ||
        (valor.includes(birthday_split[0])) ||
        (birthday_split[0].includes(valor)) ||
        (valor.includes(birthday_split[1])) ||
        (birthday_split[1].includes(valor)) ||
        (valor.includes(birthday_split[2])) ||
        (birthday_split[2].includes(valor)) ||
        (valor.includes(cellphone[0])) ||
        (cellphone[0].includes(valor)) ||
        (valor.includes(cellphone[1])) ||
        (cellphone[1].includes(valor)) ||
        (valor.includes(phone_home[0])) ||
        (phone_home[0].includes(valor)) ||
        (valor.includes(phone_home[1])) ||
        (phone_home[1].includes(valor)) ||
        (valor.includes(phone_office[0])) ||
        (phone_office[0].includes(valor)) ||
        (valor.includes(phone_office[1])) ||
        (phone_office[1].includes(valor)));
}
