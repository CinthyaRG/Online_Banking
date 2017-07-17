/**
 * Created by CinthyaCarolina on 5/7/2017.
 */

$(document).ready(function () {
    var regexNum =  /[0-9]+/;
    var regexRepeat = /(.)\1{2,}/;
    var regexMay = /[A-Z]+/;
    var regexMin = /[a-z]+/;
    var regexEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/;
    var regexSpecial = /[$@!%.#_*?&]+/;
    var numtarj = '#numtarj';
    var pin = '#pin';
    var ccv = '#ccv';
    var ci = '#ci';
    var email = '#email';
    var cod = '#cod';
    var answer = '#answer';
    var q1 = '#quest1';
    var q2 = '#quest2';
    var a1 = '#answ1';
    var a2 = '#answ2';
    var password = '#password';
    var confirm = '#confirm-pass';
    var first_name = $("#name_customer").text().split(' ');
    var last_name = $("#last-name_customer").text().split(' ');
    var ci_cust = $("#ci_customer").text().split('-');
    var phone_home = $("#phone-home").text().split('-');
    var cellphone = $("#cellphone").text().split('-');
    var phone_office = $("#phone-office").text().split('-');
    var birthday = $("#birthday").text();
    var birthday_split = $("#birthday").text().split('-');
    var msj_num = "Sólo se admiten números";
    var msj_email = "Ingrese un email válido";
    var msj = "Este campo es obligatorio";

    $('#month').on('focus', function () {
        $('#month').removeClass('errors');
    });

    $('#year').on('focus', function () {
        $('#year').removeClass('errors');
    });

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

    $(cod).on('focusout', function () {
        if ( $(cod).val() !== ""){
            if ( $(cod).val().length !== 6) {
                $('#error-cod').text('El código debe contener ' +
                    '6 dígitos');
                $(cod).addClass('errors');
            }
            else{
                $(cod).css({border: '2px solid #d2d6de'});
                $(cod).removeClass('errors');
                $('#error-cod').empty();
            }
        }
        else if ($(cod).val() === ""){
            $('#error-cod').text(msj);
            $(cod).addClass('errors');
        }
    });

    $(cod).on('focus', function () {
        $(cod).removeClass('errors');
        $(cod).css({'border-color': '#8AB7B6'});
        $('#error-cod').empty();
        $("#error_step3").empty();
    });

    $(answer).keyup( function () {
        if ( $(answer).val() !== ""){
            $(answer).css({border: '2px solid #d2d6de'});
            $(answer).removeClass('errors');
            $('#error-answer').empty();
        }
        else {
            $('#error-answer').text(msj);
            $(answer).addClass('errors');
        }
    });

    $(answer).on('focus', function () {
        $(answer).removeClass('errors');
        $(answer).css({'border-color': '#8AB7B6'});
        $('#error-answer').empty();
    });

    $(q1).keyup( function () {
        if ( $(q1).val() !== ""){
            if ( $(q2).val() === $(q1).val()) {
                $('#error-q1').text('La pregunta 1 no puede ' +
                    'ser igual a la pregunta 2.');
                $(q1).addClass('errors');
            }
            else{
                $(q1).css({border: '2px solid #d2d6de'});
                $(q1).removeClass('errors');
                $('#error-q1').empty();
            }
        }
        else {
            $('#error-q1').text(msj);
            $(q1).addClass('errors');
        }
    });

    $(q1).on('focus', function () {
        $(q1).removeClass('errors');
        $(q1).css({'border-color': '#8AB7B6'});
        $('#error-q1').empty();
    });

    $(a1).keyup( function () {
        if ( $(a1).val() !== ""){
            if ( $(a1).val() === $(q1).val()) {
                $('#error-a1').text('La respuesta no puede ' +
                    'ser igual a la pregunta.');
                $(a1).addClass('errors');
            }
            else if ( data_customer($(a1).val()) ) {
                $('#error-a1').text('La respuesta no puede ' +
                    'contener ninguno de sus datos personales.');
                $(a1).addClass('errors');
            }
            else{
                $(a1).css({border: '2px solid #d2d6de'});
                $(a1).removeClass('errors');
                $('#error-a1').empty();
            }
        }
        else {
            $('#error-a1').text(msj);
            $(a1).addClass('errors');
        }
    });

    $(a1).on('focus', function () {
        $(a1).removeClass('errors');
        $(a1).css({'border-color': '#8AB7B6'});
        $('#error-a1').empty();
        if ( $(q1).val() === ""){
            $('#error-q1').text(msj);
            $(q1).addClass('errors');
        }
    });

    $(q2).keyup( function () {
        if ( $(q2).val() !== ""){
            if ( $(q2).val() === $(q1).val()) {
                $('#error-q2').text('La pregunta 2 no puede ' +
                    'ser igual a la pregunta 1.');
                $(q2).addClass('errors');
            }
            else if ( $(q2).val() === $(a1).val()) {
                $('#error-q2').text('La pregunta 2 no puede ' +
                    'ser igual a alguna respuesta.');
                $(q2).addClass('errors');
            }
            else{
                $(q2).css({border: '2px solid #d2d6de'});
                $(q2).removeClass('errors');
                $('#error-q2').empty();
            }
        }
        else {
            $('#error-q2').text(msj);
            $(q2).addClass('errors');
        }
    });

    $(q2).on('focus', function () {
        $(q2).removeClass('errors');
        $(q2).css({'border-color': '#8AB7B6'});
        $('#error-q2').empty();
    });

    $(a2).keyup( function () {
        if ( $(a2).val() !== ""){
            if ( $(a2).val() === $(q2).val() ) {
                $('#error-a2').text('La respuesta no puede ' +
                    'ser igual a la pregunta.');
                $(a2).addClass('errors');
            }
            else if ( data_customer($(a2).val()) ) {
                $('#error-a2').text('La respuesta no puede ' +
                    'contener sus datos personales.');
                $(a2).addClass('errors');
            }
            else if ( $(a2).val() === $(a1).val()) {
                $('#error-a2').text('Las respuestas no pueden ' +
                    'ser iguales.');
                $(a2).addClass('errors');
            }
            else if ( $(q1).val() === $(a2).val()) {
                $('#error-a2').text('La pregunta no puede ' +
                    'ser igual a la pregunta 1.');
                $(a2).addClass('errors');
            }
            else{
                $(a2).css({border: '2px solid #d2d6de'});
                $(a2).removeClass('errors');
                $('#error-a2').empty();
            }
        }
        else {
            $('#error-a2').text(msj);
            $(a2).addClass('errors');
        }
    });

    $(a2).on('focus', function () {
        $(a2).removeClass('errors');
        $(a2).css({'border-color': '#8AB7B6'});
        $('#error-a2').empty();
        if ( $(q2).val() === ""){
            $('#error-q2').text(msj);
            $(q2).addClass('errors');
        }
    });

    $(password).keyup( function () {
        var i = 0;
        if ( $(password).val() !== ""){
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
                i = i+1;
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
                i = i+1;

            }
            if ( $(password).val().match(regexNum) ) {
                $('#num-carac').removeClass('text-danger');
                $('#num-carac').addClass('text-success');
                i = i+1;
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
                i = i+1;
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
                i = i+1;
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
                i = i+1;
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
                i = i+1;
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
            if (i === 7){
                $(password).css({border: '2px solid #d2d6de'});
                $(password).removeClass('errors');
                $('#error-pass').empty();
            }
        }
        else {
            $('#error-pass').text("Este campo tiene errores");
            $(password).addClass('errors');

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
